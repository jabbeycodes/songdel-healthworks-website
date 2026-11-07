/* Songdel Academy LMS — Songdel's own learning platform.
   Static front end backed by Firebase: Authentication (email/password) for
   identity and Cloud Firestore for all persistence.
   Data model (one doc per user in each collection):
     users/{uid}    { name, email, role, createdAt }
     progress/{uid} { completedUnits: ["SHW-101:3", ...], remediationSeen? }
     records/{uid}  { courseStatus: { CODE: decision }, decisions: [...],
                      ehrApproved: bool, evidence: [...] }
   Firestore rules enforce the trust boundaries: learners write only their
   own progress doc and only the `evidence` field of their records doc;
   sign-offs, EHR approvals and evidence verification are instructor writes
   to records/{uid}.
   Progression rules (from OWN_LMS_BLUEPRINT.md + manifests):
   - 16 courses in strict sequence; a course unlocks only when its prerequisite is Passed.
   - Units unlock sequentially inside a course.
   - Completing all 5 units => "Ready for final assessment" (NOT passed).
   - Final tests await the controlled question bank — none are invented here.
   - An instructor sign-off marks a ready course Passed (unlocks the next course)
     or sends it to Remediation (learner redoes Unit 5 as the retest; the
     unit-5 reset is applied to the learner's own progress doc at their next
     sign-in, because only the learner may write that doc).
   - SHW-203..SHW-210 require instructor sign-off per the curriculum.
   - A critical-error flag forces remediation; two repeated critical failures
     escalate to the Ghana Clinical Operations Lead. */

import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where,
  getDocs, arrayUnion, arrayRemove, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

var COURSES = window.LMS_DATA.courses;
var TOTAL_UNITS = COURSES.reduce(function (n, c) { return n + c.units.length; }, 0);

var fbApp = initializeApp(firebaseConfig);
var auth = getAuth(fbApp);
var db = getFirestore(fbApp);

/* ---------------- session + datasets ----------------
   A "dataset" is the derived, view-ready shape the UI works with:
   { units: {"CODE:n": {done}}, decisions: {CODE: decision},
     history: [decision+code, newest first], ehrAccess, evidence[] }
   Learners see their own dataset; instructors see the selected learner's. */

var session = null;        // { uid, name, email, role }
var myRaw = null;          // own raw docs { profile, progress, records }
var cohort = [];           // instructor: [{ uid, name, email, raw }]
var selectedUid = null;    // instructor: learner currently in view
var booting = true;
var dataError = null;
var authMode = "in";       // 'in' | 'up'
var provisioning = false;  // true while a sign-up is creating its docs
var loadedUid = null;

function emptyDataset() {
  return {
    units: {}, decisions: {}, history: [],
    ehrAccess: { approved: false, by: null, at: null },
    evidence: []
  };
}
var DS = emptyDataset();

function datasetFromRaw(raw) {
  var ds = emptyDataset();
  if (!raw) return ds;
  var progress = raw.progress || {};
  (progress.completedUnits || []).forEach(function (k) { ds.units[k] = { done: true }; });
  var records = raw.records || {};
  var cs = records.courseStatus || {};
  Object.keys(cs).forEach(function (code) { ds.decisions[code] = cs[code]; });
  ds.history = (records.decisions || []).slice().reverse();
  ds.ehrAccess = { approved: !!records.ehrApproved, by: null, at: null };
  ds.evidence = (records.evidence || []).slice().reverse();
  return ds;
}

function userRef(uid) { return doc(db, "users", uid); }
function progressRef(uid) { return doc(db, "progress", uid); }
function recordsRef(uid) { return doc(db, "records", uid); }

function fetchUserDocs(uid) {
  return Promise.all([getDoc(userRef(uid)), getDoc(progressRef(uid)), getDoc(recordsRef(uid))])
    .then(function (snaps) {
      return {
        profile: snaps[0].exists() ? snaps[0].data() : null,
        progress: snaps[1].exists() ? snaps[1].data() : { completedUnits: [] },
        records: snaps[2].exists() ? snaps[2].data()
          : { courseStatus: {}, decisions: [], ehrApproved: false, evidence: [] }
      };
    });
}

function defaultRecords() { return { courseStatus: {}, decisions: [], ehrApproved: false, evidence: [] }; }

function createUserDocs(uid, name, email, role) {
  return setDoc(userRef(uid), { name: name, email: email, role: role, createdAt: serverTimestamp() })
    .then(function () { return setDoc(progressRef(uid), { completedUnits: [] }); })
    .then(function () { return setDoc(recordsRef(uid), defaultRecords()); });
}

/* Remediation sends the learner back to redo Unit 5. Only the learner may
   write their progress doc, so the reset is applied here, at the learner's
   next sign-in, once per remediation decision. */
function syncRemediations() {
  if (!myRaw) return Promise.resolve();
  var progress = myRaw.progress || {};
  var completed = progress.completedUnits || [];
  var seen = progress.remediationSeen || {};
  var jobs = [];
  Object.keys(myRaw.records.courseStatus || {}).forEach(function (code) {
    var dec = myRaw.records.courseStatus[code];
    if (!dec || dec.outcome !== "remediation") return;
    var key = code + ":5";
    if (completed.indexOf(key) === -1) return;
    if (seen[code] === dec.at) return;
    var patch = { completedUnits: arrayRemove(key) };
    patch["remediationSeen." + code] = dec.at;
    jobs.push(updateDoc(progressRef(session.uid), patch).then(function () {
      myRaw.progress.completedUnits = completed.filter(function (k) { return k !== key; });
      if (!myRaw.progress.remediationSeen) myRaw.progress.remediationSeen = {};
      myRaw.progress.remediationSeen[code] = dec.at;
    }));
  });
  return Promise.all(jobs).catch(function () { /* retried next sign-in */ });
}

function loadCohort() {
  var q = query(collection(db, "users"), where("role", "==", "learner"));
  return getDocs(q).then(function (snap) {
    var jobs = [];
    cohort = [];
    snap.forEach(function (d) {
      jobs.push(fetchUserDocs(d.id).then(function (raw) {
        cohort.push({ uid: d.id, name: raw.profile ? raw.profile.name : d.id,
                      email: raw.profile ? raw.profile.email : "", raw: raw });
      }));
    });
    return Promise.all(jobs);
  }).then(function () {
    cohort.sort(function (a, b) { return a.name.localeCompare(b.name); });
    if (!cohort.some(function (l) { return l.uid === selectedUid; })) {
      selectedUid = cohort.length ? cohort[0].uid : null;
    }
  });
}

function selectedLearner() {
  for (var i = 0; i < cohort.length; i++) if (cohort[i].uid === selectedUid) return cohort[i];
  return null;
}

function refreshDS() {
  if (!session) { DS = emptyDataset(); return; }
  if (session.role === "instructor") {
    var l = selectedLearner();
    DS = l ? datasetFromRaw(l.raw) : emptyDataset();
  } else {
    DS = datasetFromRaw(myRaw);
  }
}

function loadSession(user) {
  return fetchUserDocs(user.uid).then(function (raw) {
    if (!raw.profile) {
      // Account exists in Auth but has no docs yet (e.g. created in the
      // Firebase console): provision defaults as a learner.
      var name = user.displayName || (user.email || "Learner").split("@")[0];
      return createUserDocs(user.uid, name, user.email || "", "learner")
        .then(function () { return fetchUserDocs(user.uid); });
    }
    return raw;
  }).then(function (raw) {
    myRaw = raw;
    session = { uid: user.uid, name: raw.profile.name, email: raw.profile.email, role: raw.profile.role };
    loadedUid = user.uid;
    if (session.role === "instructor") return loadCohort();
    return syncRemediations();
  }).then(function () {
    booting = false;
    dataError = null;
    render();
  }).catch(function (err) {
    booting = false;
    dataError = "We could not reach the Academy database. Check your connection, then try again.";
    render();
  });
}

/* ---------------- progression helpers ---------------- */

function courseByCode(code) {
  for (var i = 0; i < COURSES.length; i++) if (COURSES[i].code === code) return COURSES[i];
  return null;
}
function unitKey(code, n) { return code + ":" + n; }
function unitDone(code, n) {
  var u = DS.units[unitKey(code, n)];
  return !!(u && u.done);
}
function unitsDoneCount(code) {
  var c = courseByCode(code), n = 0;
  c.units.forEach(function (u) { if (unitDone(code, u.n)) n++; });
  return n;
}
function courseStatus(code) {
  var dec = DS.decisions[code];
  if (dec && dec.outcome === "passed") return "passed";
  if (!isUnlocked(code)) return "locked";
  var done = unitsDoneCount(code);
  if (dec && dec.outcome === "remediation" && done < 5) return "remediation";
  if (done === 5) return "ready";
  if (done > 0) return "progress";
  return "notstarted";
}
function isUnlocked(code) {
  var c = courseByCode(code);
  if (!c.prerequisite) return true;
  var dec = DS.decisions[c.prerequisite];
  return !!(dec && dec.outcome === "passed");
}
function unitUnlocked(code, n) {
  if (!isUnlocked(code)) return false;
  if (n === 1) return true;
  return unitDone(code, n - 1);
}
function currentCourse() {
  for (var i = 0; i < COURSES.length; i++) {
    var s = courseStatus(COURSES[i].code);
    if (s !== "passed" && s !== "locked") return COURSES[i];
  }
  return null;
}
function nextUnitOf(course) {
  for (var i = 0; i < course.units.length; i++) {
    if (!unitDone(course.code, course.units[i].n)) return course.units[i];
  }
  return null;
}
function totalUnitsDone() {
  var n = 0;
  COURSES.forEach(function (c) { n += unitsDoneCount(c.code); });
  return n;
}
function coursesPassed() {
  return COURSES.filter(function (c) { return courseStatus(c.code) === "passed"; }).length;
}
function criticalCount(code) {
  return DS.history.filter(function (h) { return h.code === code && h.critical; }).length;
}

var STATUS_LABEL = {
  passed: "Passed",
  ready: "Ready for final assessment",
  progress: "In progress",
  remediation: "Remediation required",
  locked: "Locked",
  notstarted: "Not started"
};

/* ---------------- eCW University portal ----------------
   Outbound only: the portal lives at eClinicalWorks (My eCW -> eCW
   University -> My Courses). No eCW credentials or course content are
   stored or invented here. Eligibility rule (from the build workbook):
   passing SHW-102 makes a learner eligible for approved EHR training
   access; both gates must be Passed, then an instructor approves. */

var ECW_URL = "https://my.eclinicalworks.com/";

function ehrEligible() {
  return courseStatus("SHW-101") === "passed" && courseStatus("SHW-102") === "passed";
}
function ehrApproved() {
  return !!(DS.ehrAccess && DS.ehrAccess.approved);
}
function ecwGuide() {
  return '<ol style="margin:10px 0 0;padding-left:20px">' +
    "<li>Complete the <b>SHW-101</b> (HIPAA) and <b>SHW-102</b> (Cybersecurity) gates — both must be Passed.</li>" +
    "<li>Get <b>instructor-approved EHR training access</b>.</li>" +
    "<li>Open the eCW portal and sign in with your issued eCW credentials.</li>" +
    "<li>Complete your assigned <b>eCW University</b> modules (My Courses).</li>" +
    "<li>Return here and <b>submit your completion evidence</b> (certificate / confirmation) for instructor verification.</li></ol>";
}
function ecwOpenButton(active) {
  if (active) {
    return '<a class="btn btn-gold" href="' + ECW_URL + '" target="_blank" rel="noopener">Open eCW University ↗</a>' +
      '<p class="small" style="margin:8px 0 0">Sign in with your issued eCW credentials → <b>eCW University</b> → <b>My Courses</b>.</p>';
  }
  return '<span class="btn btn-gold disabled">Open eCW University 🔒</span>';
}
function ecwCard() {
  var eligible = ehrEligible(), approved = ehrApproved();
  var statusLine, action;
  if (approved) {
    statusLine = '<span class="chip st-passed">EHR training access approved</span>' +
      '<p class="small" style="margin:10px 0 0">Your instructor has approved your EHR training access. The portal is open.</p>';
    action = ecwOpenButton(true);
  } else if (eligible) {
    statusLine = '<span class="chip st-ready">Eligible — awaiting instructor approval</span>' +
      '<p class="small" style="margin:10px 0 0">You have passed both gates (SHW-101 + SHW-102). An instructor must approve your EHR training access before the portal opens.</p>';
    action = ecwOpenButton(false);
  } else {
    statusLine = '<span class="chip st-locked">🔒 Locked</span>' +
      '<p class="small" style="margin:10px 0 0">Pass <b>SHW-101 HIPAA &amp; Patient Privacy</b> and <b>SHW-102 Healthcare Cybersecurity</b> to become eligible for EHR training access.</p>';
    action = ecwOpenButton(false);
  }
  return '<div class="card teal-top mt"><p class="eyebrow">External training portal</p>' +
    '<h2 style="font-size:1.55rem;margin-bottom:6px">eCW University</h2>' +
    '<p style="margin:0">Part of your training happens inside <b>eCW University</b>, eClinicalWorks\u2019 own learning portal, where you learn the live EHR. Songdel links you there — your eCW sign-in and courses stay with eClinicalWorks.</p>' +
    '<div style="margin:14px 0">' + statusLine + "</div>" + action + ecwGuide() + "</div>";
}

function courseNote(code) {
  if (code === "SHW-102") return "Passing SHW-102 unlocks eligibility for approved EHR training access.";
  if (code === "SHW-209") return "SHW-209 must be passed before the SHW-210 live practicum unlocks.";
  if (code === "SHW-210") return "The supervised practicum cannot be completed by quiz alone — instructor sign-off is required.";
  return null;
}

/* ---------------- small utilities ---------------- */

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function fmtDate(iso) {
  if (!iso) return "";
  var d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    ", " + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
function chip(status) {
  return '<span class="chip st-' + status + '">' + esc(STATUS_LABEL[status]) + "</span>";
}
function badges(course) {
  var out = "";
  if (course.criticalGate) out += '<span class="badge badge-gate">★ Critical gate</span>';
  out += '<span class="badge badge-signoff">Pass standard: ' + course.passPercent + "%</span>";
  if (course.signoffRequired) out += '<span class="badge badge-signoff">Instructor sign-off required</span>';
  else out += '<span class="badge badge-signoff">Instructor sign-off</span>';
  return out;
}
function dots(cls) {
  return '<span class="dots ' + (cls || "") + '" aria-hidden="true"><i class="d1"></i><i class="d2"></i><i class="d3"></i></span>';
}
function authErrorMessage(err) {
  var code = err && err.code ? err.code : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect. Check both and try again.";
    case "auth/email-already-in-use":
      return "An account with this email already exists — try signing in instead.";
    case "auth/weak-password":
      return "That password is too weak — use at least 6 characters.";
    case "auth/invalid-email":
      return "That email address doesn\u2019t look valid.";
    case "auth/too-many-requests":
      return "Too many attempts — wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network problem — check your connection and try again.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact the Academy office.";
    default:
      return "Something went wrong (" + (code || "unknown error") + "). Please try again.";
  }
}

var app = document.getElementById("app");
var topbar = document.getElementById("topbar");
var footerNote = document.getElementById("footer-note");

function setNav(active) {
  var links = document.querySelectorAll("#mainnav a");
  links.forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("data-nav") === active);
  });
  document.getElementById("nav-instructor").style.display =
    session && session.role === "instructor" ? "" : "none";
}

function chrome(active) {
  if (!session) {
    topbar.hidden = true;
    footerNote.hidden = true;
    return;
  }
  topbar.hidden = false;
  footerNote.hidden = false;
  document.getElementById("who-name").textContent = session.name;
  document.getElementById("who-role").textContent =
    session.role === "instructor" ? "Instructor" : "Learner";
  setNav(active);
}

/* ---------------- loading / fatal views ---------------- */

function viewLoading() {
  chrome(null);
  topbar.hidden = true;
  footerNote.hidden = true;
  app.innerHTML = '<div class="loading-wrap"><div class="spinner" role="status" aria-label="Loading"></div>' +
    "<p>Loading your Academy…</p></div>";
}

function viewFatal(msg) {
  topbar.hidden = true;
  footerNote.hidden = true;
  app.innerHTML = '<div class="loading-wrap"><div class="empty" style="max-width:520px">' +
    '<h2 style="font-size:1.4rem;margin-bottom:8px">We hit a problem</h2><p>' + esc(msg) + "</p>" +
    '<p style="margin-top:14px"><button class="btn btn-navy" id="btn-retry" type="button">Retry</button></p></div></div>';
  document.getElementById("btn-retry").addEventListener("click", function () { location.reload(); });
}

/* ---------------- auth views ---------------- */

function viewAuth() {
  chrome(null);
  var isUp = authMode === "up";
  var formHtml;
  if (isUp) {
    formHtml =
      '<form id="auth-form">' +
        '<div class="field"><label for="au-name">Full name</label>' +
        '<input type="text" id="au-name" required autocomplete="name" placeholder="e.g. Ama Serwaa"></div>' +
        '<div class="field"><label for="au-email">Email</label>' +
        '<input type="email" id="au-email" required autocomplete="email" placeholder="you@example.com"></div>' +
        '<div class="field"><label for="au-password">Password</label>' +
        '<input type="password" id="au-password" required autocomplete="new-password" placeholder="At least 6 characters"></div>' +
        '<div class="field"><label>I am joining as</label><div class="rolepick">' +
          '<label><input type="radio" name="role" value="learner" checked>Learner<small>Work through the courses</small></label>' +
          '<label><input type="radio" name="role" value="instructor">Instructor<small>Review &amp; sign off courses</small></label>' +
        "</div></div>" +
        '<button class="btn btn-primary" id="auth-submit" type="submit" style="width:100%;justify-content:center">Create account</button>' +
      "</form>" +
      '<div class="preview-note">Instructor accounts are for Songdel Academy staff.</div>';
  } else {
    formHtml =
      '<form id="auth-form">' +
        '<div class="field"><label for="au-email">Email</label>' +
        '<input type="email" id="au-email" required autocomplete="email" placeholder="you@example.com"></div>' +
        '<div class="field"><label for="au-password">Password</label>' +
        '<input type="password" id="au-password" required autocomplete="current-password" placeholder="Your password"></div>' +
        '<button class="btn btn-primary" id="auth-submit" type="submit" style="width:100%;justify-content:center">Sign in</button>' +
      "</form>";
  }

  app.innerHTML =
    '<div class="signin-wrap"><div class="signin-card">' +
      '<p class="eyebrow">' + dots() + ' Songdel Academy</p>' +
      "<h1>" + (isUp ? "Join the Academy" : "Sign in to learn") + "</h1>" +
      '<p class="sub">The gated 16-course pathway for Songdel Academy trainees — HIPAA and cybersecurity first, then PulsePoint clinical operations.</p>' +
      '<div class="auth-switch" role="tablist">' +
        '<button type="button" id="tab-in" class="' + (!isUp ? "active" : "") + '">Sign in</button>' +
        '<button type="button" id="tab-up" class="' + (isUp ? "active" : "") + '">Create account</button>' +
      "</div>" +
      '<div class="auth-error" id="auth-error" role="alert"></div>' +
      formHtml +
    "</div></div>";

  document.getElementById("tab-in").addEventListener("click", function () { authMode = "in"; viewAuth(); });
  document.getElementById("tab-up").addEventListener("click", function () { authMode = "up"; viewAuth(); });

  var errBox = document.getElementById("auth-error");
  function showError(msg) { errBox.textContent = msg; errBox.classList.add("show"); }

  document.getElementById("auth-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("au-email").value.trim();
    var password = document.getElementById("au-password").value;
    var btn = document.getElementById("auth-submit");
    btn.disabled = true;
    btn.textContent = isUp ? "Creating account…" : "Signing in…";
    errBox.classList.remove("show");

    if (isUp) {
      var name = document.getElementById("au-name").value.trim();
      var role = document.querySelector('input[name="role"]:checked').value;
      if (!name) { btn.disabled = false; btn.textContent = "Create account"; showError("Please enter your full name."); return; }
      provisioning = true;
      createUserWithEmailAndPassword(auth, email, password)
        .then(function (cred) {
          return updateProfile(cred.user, { displayName: name })
            .catch(function () { return null; })
            .then(function () { return createUserDocs(cred.user.uid, name, email, role); })
            .then(function () { return cred.user; });
        })
        .then(function (user) {
          provisioning = false;
          return loadSession(user);
        })
        .then(function () { location.hash = session && session.role === "instructor" ? "#/instructor" : "#/"; })
        .catch(function (err) {
          provisioning = false;
          btn.disabled = false;
          btn.textContent = "Create account";
          showError(authErrorMessage(err));
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(function () { /* onAuthStateChanged drives loadSession */ })
        .catch(function (err) {
          btn.disabled = false;
          btn.textContent = "Sign in";
          showError(authErrorMessage(err));
        });
    }
  });
}

/* ---------------- learner views ---------------- */

function instructorContextLine() {
  if (!session || session.role !== "instructor") return "";
  var l = selectedLearner();
  if (!l) return '<div class="notice"><p><strong>Instructor view.</strong> No learner accounts exist yet, so there is no learner progress to show here.</p></div>';
  return '<div class="notice"><p><strong>Instructor view — read-only.</strong> You are looking at <b>' + esc(l.name) + "</b>\u2019s progress. Decisions are recorded from the Instructor page.</p></div>";
}

function remediationAlerts() {
  var out = "";
  COURSES.forEach(function (c) {
    if (courseStatus(c.code) === "remediation") {
      var dec = DS.decisions[c.code];
      out += '<div class="alert-remediation"><div>' +
        "<strong>Remediation required — " + esc(c.code) + " " + esc(c.title) + ".</strong><br>" +
        "<span>" + (dec && dec.critical ? "A critical error was flagged. " : "") +
        (dec && dec.note ? "Instructor note: \u201C" + esc(dec.note) + "\u201D " : "") +
        "Retest: redo Unit 5 to return this course to \u201CReady for final assessment\u201D.</span> " +
        '<a href="#/course/' + c.code + '">Go to course</a></div></div>';
    }
  });
  return out;
}

function viewDashboard() {
  chrome("dashboard");
  var done = totalUnitsDone();
  var pct = Math.round((done / TOTAL_UNITS) * 100);
  var passed = coursesPassed();
  var cur = currentCourse();
  var counts = { passed: 0, ready: 0, progress: 0, remediation: 0, locked: 0, notstarted: 0 };
  COURSES.forEach(function (c) { counts[courseStatus(c.code)]++; });

  var continueCard;
  if (!cur) {
    continueCard =
      '<div class="card gold-top"><p class="eyebrow">Pathway complete</p>' +
      "<h2 style='font-size:1.7rem;margin-bottom:8px'>All 16 courses passed 🎉</h2>" +
      "<p>Every course on the Songdel Academy pathway has been signed off. Certification (Levels I–III) and the 30/60/90-day QA plan are issued by the Academy office from here.</p></div>";
  } else {
    var st = courseStatus(cur.code);
    var nu = nextUnitOf(cur);
    var action;
    if (st === "ready") {
      action = '<a class="btn btn-gold" href="#/course/' + cur.code + '">View final assessment status</a>';
    } else if (nu) {
      action = '<a class="btn btn-gold" href="#/lesson/' + cur.code + "/" + nu.n + '">' +
        (unitsDoneCount(cur.code) === 0 ? "Start Unit " + nu.n : "Continue — Unit " + nu.n) + "</a>";
    } else {
      action = '<a class="btn btn-gold" href="#/course/' + cur.code + '">Open course</a>';
    }
    continueCard =
      '<div class="card gold-top"><p class="eyebrow">' +
        (st === "remediation" ? "Needs your attention" : st === "ready" ? "Awaiting sign-off" : "Continue learning") +
        "</p>" +
        '<h2 style="font-size:1.7rem;margin-bottom:6px">' + esc(cur.code) + " — " + esc(cur.title) + "</h2>" +
        '<p class="small" style="margin:0 0 6px">Course ' + cur.sequence + " of 16 · Pass mark " + cur.passPercent + "% · " +
          unitsDoneCount(cur.code) + " of 5 units complete</p>" +
        '<div class="flexrow" style="margin-bottom:14px">' + chip(st) + badges(cur) + "</div>" +
        action + ' <a class="btn btn-ghost" href="#/course/' + cur.code + '">Course details</a></div>';
  }

  app.innerHTML =
    '<div class="page">' +
      '<div class="page-head"><p class="eyebrow">' + dots() + " Learner dashboard</p>" +
      "<h1>Welcome back, " + esc(session.name.split(" ")[0]) + "</h1>" +
      '<p class="lede">One locked pathway: 16 courses in sequence, from HIPAA and cybersecurity foundations to supervised practicum.</p></div>' +
      instructorContextLine() +
      remediationAlerts() +
      '<div class="grid grid-3 mb">' +
        '<div class="card"><div class="stat-num">' + pct + '%</div><div class="stat-label">Overall progress</div>' +
          '<div class="pbar mt" style="margin-top:12px"><i style="width:' + pct + '%"></i></div>' +
          '<div class="stat-sub">' + done + " of " + TOTAL_UNITS + " units complete</div></div>" +
        '<div class="card"><div class="stat-num">' + passed + ' / 16</div><div class="stat-label">Courses passed</div>' +
          '<div class="stat-sub">' + counts.ready + " ready for assessment · " + counts.remediation + " in remediation</div></div>" +
        '<div class="card"><div class="stat-num">' + (counts.progress + counts.notstarted) + '</div><div class="stat-label">Courses open or upcoming</div>' +
          '<div class="stat-sub">' + counts.locked + " still locked behind prerequisites</div></div>" +
      "</div>" +
      continueCard +
      ecwCard() +
      '<div class="card mt"><div class="flexrow" style="justify-content:space-between">' +
        '<div><h2 style="font-size:1.35rem">Your learning path</h2>' +
        '<p class="small" style="margin:4px 0 0">Courses unlock one at a time — the next course opens only when the previous one is signed off as Passed.</p></div>' +
        '<a class="btn btn-navy" href="#/path">View full path</a></div></div>' +
    "</div>";
}

function viewPath() {
  chrome("path");
  var items = COURSES.map(function (c) {
    var st = courseStatus(c.code);
    var done = unitsDoneCount(c.code);
    var pctU = Math.round((done / 5) * 100);
    var cls = st === "passed" ? "is-passed" : st === "remediation" ? "is-remediation" :
      (currentCourse() && currentCourse().code === c.code) ? "is-current" : "";
    var dotContent = st === "passed" ? "✓" : c.sequence;
    var action = st === "locked"
      ? '<span class="btn btn-ghost btn-sm disabled">🔒 Locked</span>'
      : '<a class="btn ' + (st === "passed" ? "btn-ghost" : "btn-primary") + ' btn-sm" href="#/course/' + c.code + '">' +
          (st === "passed" ? "Review course" : st === "notstarted" ? "Start course" : "Open course") + "</a>";
    var lockNote = st === "locked" && c.prerequisite
      ? '<p class="small" style="margin:8px 0 0">Unlocks when ' + esc(c.prerequisite) + " is signed off as Passed.</p>" : "";
    return '<div class="path-item ' + cls + '"><div class="path-rail"><div class="path-dot">' + dotContent +
      '</div><div class="path-line"></div></div>' +
      '<div class="path-card' + (st === "locked" ? " locked" : "") + '">' +
        '<div class="path-card-head"><h3><span class="code">' + esc(c.code) + "</span>" + esc(c.title) + "</h3>" + chip(st) + "</div>" +
        '<div class="path-meta">' + badges(c) + "</div>" + lockNote +
        '<div class="path-foot"><div class="pbar thin"><i style="width:' + pctU + '%"></i></div>' +
        '<span class="units-done">' + done + " / 5 units</span>" + action + "</div>" +
      "</div></div>";
  }).join("");

  app.innerHTML =
    '<div class="page"><div class="page-head"><p class="eyebrow">' + dots() + " Learning path</p>" +
    "<h1>The Songdel pathway</h1>" +
    '<p class="lede">Sixteen courses, one order. Compliance and security gates come first; PulsePoint operations build on them; the practicum comes last.</p></div>' +
    instructorContextLine() +
    '<div class="path-list">' + items + "</div></div>";
}

function viewCourse(code) {
  var c = courseByCode(code);
  if (!c) { location.hash = "#/path"; return; }
  chrome("path");
  var st = courseStatus(code);
  var locked = st === "locked";
  var isLearner = session.role === "learner";

  var unitRows = c.units.map(function (u) {
    var doneU = unitDone(code, u.n);
    var unl = unitUnlocked(code, u.n);
    var isCurrent = unl && !doneU && (u.n === 1 || unitDone(code, u.n - 1));
    var cls = doneU ? "done" : isCurrent ? "current" : !unl ? "locked" : "";
    var right;
    if (doneU) right = '<span class="chip st-passed">Complete</span> <a class="btn btn-ghost btn-sm" href="#/lesson/' + code + "/" + u.n + '">Review</a>';
    else if (unl) right = '<a class="btn btn-primary btn-sm" href="#/lesson/' + code + "/" + u.n + '">' + (u.n === 1 && unitsDoneCount(code) === 0 ? "Start unit" : "Continue") + "</a>";
    else right = '<span class="chip st-locked">🔒 Locked</span>';
    return '<div class="unit-row ' + cls + '"><div class="unit-num">' + (doneU ? "✓" : u.n) + "</div>" +
      '<div class="unit-info"><b>Unit ' + u.n + ": " + esc(u.title) + "</b>" +
      "<span>" + esc(u.assessment) + (c.signoffRequired ? " · instructor sign-off" : "") + "</span></div>" + right + "</div>";
  }).join("");

  var note = courseNote(code);
  var noteHtml = note ? '<div class="notice teal"><p><strong>Gate rule:</strong> ' + esc(note) + "</p></div>" : "";

  var assess;
  var dec = DS.decisions[code];
  if (st === "passed") {
    assess = '<div class="notice teal"><p><strong>✓ Passed.</strong> Signed off by ' + esc(dec.by) + " on " + fmtDate(dec.at) + "." +
      (dec.note ? "<br>Instructor note: \u201C" + esc(dec.note) + "\u201D" : "") + "</p></div>";
  } else if (st === "remediation") {
    assess = '<div class="notice danger"><p><strong>Remediation required.</strong> ' +
      (dec && dec.critical ? "A critical privacy, security, or patient-safety error was flagged — this overrides any numerical score. " : "") +
      (dec && dec.note ? "Instructor note: \u201C" + esc(dec.note) + "\u201D<br>" : "") +
      "Retest: redo <b>Unit 5</b> above, then this course returns to \u201CReady for final assessment\u201D for a new sign-off decision.</p></div>";
  } else if (st === "ready") {
    assess = '<div class="notice"><p><strong>Ready for final assessment.</strong> All 5 units are complete. ' +
      "The final assessment for this course is a 20-item test drawn from the Academy\u2019s controlled question bank (pass mark " + c.passPercent + "%). " +
      "That question bank has not been loaded into the platform yet, so no test can be taken and no score is recorded here. " +
      (c.signoffRequired
        ? "This course also requires instructor sign-off of the practical competency. An instructor records the sign-off from the Instructor view."
        : "An instructor records the sign-off decision from the Instructor view.") +
      "</p></div>";
  } else if (locked) {
    assess = '<div class="notice"><p><strong>Locked.</strong> This course unlocks when ' + esc(c.prerequisite) + " is signed off as Passed.</p></div>";
  } else {
    assess = '<div class="notice"><p><strong>Final assessment:</strong> a 20-item test from the controlled question bank (pass mark ' + c.passPercent + "%), taken after all 5 units are complete. The question bank is not loaded yet, so completing the units will move this course to \u201CReady for final assessment\u201D rather than Passed.</p></div>";
  }

  var ecwPanel = "";
  if (code === "SHW-203") {
    var approved203 = ehrApproved();
    var myEvidence = DS.evidence.filter(function (e) { return e.course === "SHW-203"; });
    var evList = myEvidence.length === 0
      ? '<p class="small" style="margin:10px 0 0">No evidence submitted yet.</p>'
      : myEvidence.map(function (e) {
          return '<p class="small" style="margin:8px 0 0">' +
            (e.status === "verified"
              ? '<span class="chip st-passed">Verified</span>'
              : '<span class="chip st-ready">Pending verification</span>') +
            " " + esc(e.text) + ' <span style="color:var(--muted)">· submitted ' + fmtDate(e.at) +
            (e.status === "verified" ? " · verified by " + esc(e.verifiedBy) : "") + "</span></p>";
        }).join("");
    var submitRow = isLearner
      ? '<div class="flexrow"><input type="text" id="evidence-text" placeholder="e.g. eCW Basics Certificate — 12 Nov 2026, confirmation #…" ' +
          'style="flex:1;min-width:240px;padding:11px 13px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:.95rem" ' + (approved203 ? "" : "disabled") + ">" +
        '<button class="btn btn-primary" id="btn-evidence" type="button" ' + (approved203 ? "" : "disabled") + ">Submit evidence</button></div>" +
        (approved203 ? "" : '<p class="small" style="margin:8px 0 0">Evidence submission opens once your EHR training access is approved.</p>')
      : '<p class="small" style="margin:0">Instructor view — learners submit evidence from their own accounts.</p>';
    ecwPanel =
      '<div class="card teal-top" style="margin:20px 0"><p class="eyebrow">External training at eCW University</p>' +
      '<h2 style="font-size:1.4rem;margin-bottom:8px">Learn eClinicalWorks at eCW University</h2>' +
      "<p style='margin:0'>SHW-203 pairs Songdel\u2019s lessons with hands-on modules inside <b>eCW University</b> (reached from the eClinicalWorks customer portal: sign in → eCW University → My Courses). Use your issued eCW credentials there — Songdel never stores them.</p>" +
      '<div style="margin:14px 0">' +
        (approved203
          ? '<span class="chip st-passed">EHR training access approved</span>'
          : ehrEligible()
            ? '<span class="chip st-ready">Eligible — awaiting instructor approval</span>'
            : '<span class="chip st-locked">🔒 Locked — pass SHW-101 + SHW-102 first</span>') +
      "</div>" +
      ecwOpenButton(approved203) +
      '<h3 style="font-size:1.05rem;margin:22px 0 6px">Submit completion evidence</h3>' +
      "<p class='small' style='margin:0 0 10px'>Finished assigned eCW University modules? Record the certificate or confirmation here; an instructor verifies it in the Instructor view.</p>" +
      submitRow +
      evList + "</div>";
  }

  app.innerHTML =
    '<div class="page">' +
      '<p class="crumb small" style="margin-bottom:14px"><a href="#/path">← Learning path</a> · Course ' + c.sequence + " of 16</p>" +
      '<div class="page-head"><p class="eyebrow">' + dots() + " " + esc(c.code) + "</p>" +
      "<h1>" + esc(c.title) + "</h1>" +
      '<div class="flexrow" style="margin-top:14px">' + chip(st) + badges(c) + "</div></div>" +
      noteHtml + assess + ecwPanel +
      '<h2 style="font-size:1.4rem;margin:26px 0 14px">Units</h2>' +
      '<div class="unit-list">' + unitRows + "</div>" +
      '<p class="small mt">Units complete in order — the next unit unlocks when the previous one is marked complete in the lesson player.</p>' +
    "</div>";

  var evBtn = document.getElementById("btn-evidence");
  if (evBtn) {
    evBtn.addEventListener("click", function () {
      var text = document.getElementById("evidence-text").value.trim();
      if (!text) { alert("Describe the evidence first — certificate name, date, or confirmation details from eCW University."); return; }
      evBtn.disabled = true;
      evBtn.textContent = "Submitting…";
      var item = {
        id: Date.now(), course: "SHW-203", text: text,
        by: session.name,
        at: new Date().toISOString(), status: "pending",
        verifiedBy: null, verifiedAt: null
      };
      // Rules: a learner may change ONLY the `evidence` field of their own
      // records doc — so this is a targeted update of just that field.
      updateDoc(recordsRef(session.uid), { evidence: arrayUnion(item) })
        .then(function () {
          if (!myRaw.records.evidence) myRaw.records.evidence = [];
          myRaw.records.evidence.push(item);
          viewCourse("SHW-203");
        })
        .catch(function () {
          evBtn.disabled = false;
          evBtn.textContent = "Submit evidence";
          alert("Could not submit your evidence — check your connection and try again.");
        });
    });
  }
}

/* ---------------- lesson player ---------------- */

function viewLesson(code, n) {
  var c = courseByCode(code);
  n = parseInt(n, 10);
  if (!c || !n || n < 1 || n > 5) { location.hash = "#/path"; return; }
  chrome("path");
  var u = c.units[n - 1];
  var doneU = unitDone(code, n);
  var unl = unitUnlocked(code, n);

  if (!unl) {
    app.innerHTML =
      '<div class="page"><p class="small"><a href="#/course/' + code + '">← ' + esc(code) + "</a></p>" +
      '<div class="empty"><h2 style="font-size:1.5rem;margin-bottom:8px">🔒 This unit is locked</h2>' +
      "<p>Units unlock in order. Complete the previous unit first" +
      (isUnlocked(code) ? "" : ", and note this course itself unlocks when " + esc(c.prerequisite) + " is passed") + ".</p>" +
      '<p style="margin-top:14px"><a class="btn btn-navy" href="#/course/' + code + '">Back to course</a></p></div></div>';
    return;
  }

  var prevBtn = n > 1
    ? '<a class="btn btn-ghost" href="#/lesson/' + code + "/" + (n - 1) + '">← Unit ' + (n - 1) + "</a>"
    : '<span class="btn btn-ghost disabled">← Unit 1</span>';
  var nextUnlocked = n < 5 && unitUnlocked(code, n + 1);
  var nextBtn;
  if (n === 5) {
    nextBtn = '<a class="btn btn-ghost" href="#/course/' + code + '">Back to course →</a>';
  } else if (nextUnlocked) {
    nextBtn = '<a class="btn btn-ghost" href="#/lesson/' + code + "/" + (n + 1) + '">Unit ' + (n + 1) + " →</a>";
  } else {
    nextBtn = '<span class="btn btn-ghost disabled" title="Mark this unit complete to unlock the next">Unit ' + (n + 1) + " 🔒</span>";
  }
  var completeBtn;
  if (doneU) {
    completeBtn = '<span class="done-banner">✓ Unit complete</span>';
  } else if (session.role === "learner") {
    completeBtn = '<button class="btn ' + (n === 5 ? "btn-gold" : "btn-primary") + '" id="btn-complete" type="button">Mark unit complete</button>';
  } else {
    completeBtn = '<span class="small">Instructor view — learners record completion from their own accounts.</span>';
  }

  app.innerHTML =
    '<div class="page" style="max-width:1000px">' +
      '<div class="player-bar"><div><p class="crumb" style="margin:0"><a href="#/course/' + code + '">' + esc(code) + " — " + esc(c.title) + "</a> · Unit " + n + " of 5</p>" +
      '<h1 style="font-size:1.65rem;margin-top:4px">' + esc(u.title) + "</h1></div>" +
      '<span class="spacer" style="flex:1"></span>' + chip(doneU ? "passed" : "progress") + "</div>" +
      '<div class="player-frame-wrap"><iframe class="player-frame" src="' + esc(u.file) + '" title="' + esc(code) + " Unit " + n + ": " + esc(u.title) + '"></iframe></div>' +
      '<div class="player-actions">' + prevBtn + nextBtn + '<span class="spacer"></span>' + completeBtn + "</div>" +
      (doneU && n === 5 && courseStatus(code) === "ready"
        ? '<div class="notice"><p><strong>All 5 units complete.</strong> This course is now <b>Ready for final assessment</b>. The final test itself awaits the controlled question bank (not loaded yet); an instructor records the sign-off decision from the Instructor view. <a href="#/course/' + code + '">View course status</a></p></div>'
        : "") +
    "</div>";

  var btn = document.getElementById("btn-complete");
  if (btn) {
    btn.addEventListener("click", function () {
      btn.disabled = true;
      btn.textContent = "Saving…";
      var key = unitKey(code, n);
      updateDoc(progressRef(session.uid), { completedUnits: arrayUnion(key) })
        .then(function () {
          if (!myRaw.progress.completedUnits) myRaw.progress.completedUnits = [];
          if (myRaw.progress.completedUnits.indexOf(key) === -1) myRaw.progress.completedUnits.push(key);
          refreshDS();
          viewLesson(code, n);
          window.scrollTo(0, document.body.scrollHeight);
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = "Mark unit complete";
          alert("Could not save your progress — check your connection and try again.");
        });
    });
  }
}

/* ---------------- instructor view ---------------- */

function viewInstructor() {
  chrome("instructor");
  if (!session || session.role !== "instructor") {
    app.innerHTML =
      '<div class="page"><div class="empty"><h2 style="font-size:1.5rem;margin-bottom:8px">Instructor view</h2>' +
      "<p>Sign in with an <b>Instructor</b> account to review learner progress and record sign-offs.</p></div></div>";
    return;
  }

  var learner = selectedLearner();

  var picker =
    '<div class="card mb learnerpick"><div class="flexrow"><div><h2 style="font-size:1.2rem">Learner</h2>' +
    '<p class="small" style="margin:4px 0 0">All sign-offs, EHR approvals and evidence checks apply to the learner selected here.</p></div>' +
    '<span class="spacer" style="flex:1"></span>' +
    (cohort.length
      ? '<select id="learner-pick" aria-label="Select learner">' +
          cohort.map(function (l) {
            return '<option value="' + esc(l.uid) + '"' + (learner && l.uid === learner.uid ? " selected" : "") + ">" +
              esc(l.name) + " · " + esc(l.email) + "</option>";
          }).join("") + "</select>"
      : '<span class="small">No learner accounts yet</span>') +
    "</div></div>";

  if (!learner) {
    app.innerHTML =
      '<div class="page"><div class="page-head"><p class="eyebrow">' + dots() + " Instructor</p>" +
      "<h1>Cohort progress</h1>" +
      '<p class="lede">No learners have created accounts yet. When a trainee signs up with the Learner role, they will appear here with their full pathway progress.</p></div>' +
      picker + "</div>";
    wireLearnerPick();
    return;
  }

  refreshDS();
  var done = totalUnitsDone();
  var ready = COURSES.filter(function (c) { return courseStatus(c.code) === "ready"; });
  var remediating = COURSES.filter(function (c) { return courseStatus(c.code) === "remediation"; });

  var queue = ready.length === 0
    ? '<div class="empty">No courses are waiting for sign-off. A course appears here when the learner completes all 5 of its units.</div>'
    : ready.map(function (c) {
        return '<div class="queue-item mb"><div class="flexrow" style="justify-content:space-between">' +
          "<div><b style='color:var(--navy)'>" + esc(c.code) + " — " + esc(c.title) + "</b><br>" +
          '<span class="small">All 5 units complete · Pass standard ' + c.passPercent + "% · " +
            (c.signoffRequired ? "Instructor sign-off required by curriculum" : "Instructor sign-off (curriculum: as needed)") + "</span></div>" +
          chip("ready") + "</div>" +
          '<label class="checkline"><input type="checkbox" id="crit-' + c.code + '"><span><b>Critical error</b> — a critical privacy, security, or patient-safety error was observed. This forces remediation regardless of any score.</span></label>' +
          '<div class="queue-actions"><textarea id="note-' + c.code + '" placeholder="Decision note (optional) — rubric: accuracy · closed-loop work · communication · escalation · privacy/security"></textarea></div>' +
          '<div class="queue-actions">' +
            '<button class="btn btn-primary" data-signoff="passed" data-code="' + c.code + '" type="button">✓ Sign off as Passed</button>' +
            '<button class="btn btn-danger" data-signoff="remediation" data-code="' + c.code + '" type="button">Send to remediation</button>' +
          "</div></div>";
      }).join("");

  var remList = remediating.length === 0 ? "" :
    '<h2 style="font-size:1.35rem;margin:30px 0 12px">Awaiting learner retest</h2>' +
    remediating.map(function (c) {
      return '<div class="card mb" style="padding:16px 20px"><b style="color:var(--navy)">' + esc(c.code) + " — " + esc(c.title) + "</b> " + chip("remediation") +
        '<p class="small" style="margin:6px 0 0">The learner must redo Unit 5; the course then returns to the sign-off queue. (The Unit 5 reset is applied to the learner\u2019s progress at their next sign-in.)</p></div>';
    }).join("");

  var eligible = ehrEligible(), approved = ehrApproved();
  var gateLine = function (code) {
    var s = courseStatus(code);
    return esc(code) + " " + (s === "passed" ? "✓ Passed" : "(" + STATUS_LABEL[s] + ")");
  };
  var ehrPanel =
    '<div class="card gold-top mb"><p class="eyebrow">eCW University</p>' +
    '<h2 style="font-size:1.3rem;margin-bottom:8px">EHR training access</h2>' +
    '<p class="small" style="margin:0 0 6px">Gate status for ' + esc(learner.name) + ": " + gateLine("SHW-101") + " · " + gateLine("SHW-102") + "</p>" +
    (approved
      ? '<p style="margin:6px 0 0"><span class="chip st-passed">Access approved</span> <span class="small">The learner\u2019s eCW University portal link is active.</span></p>'
      : eligible
        ? '<p class="small" style="margin:6px 0 10px">Both gates are Passed — this learner is eligible for approved EHR training access to eCW University.</p>' +
          '<button class="btn btn-gold" id="btn-ehr-approve" type="button">Approve EHR training access</button>'
        : '<p class="small" style="margin:6px 0 0">Not yet eligible — approval unlocks when both SHW-101 and SHW-102 are Passed.</p>' +
          '<span class="btn btn-gold disabled">Approve EHR training access 🔒</span>') +
    "</div>";

  var pendingEvidence = DS.evidence.filter(function (e) { return e.status === "pending"; });
  var verifiedEvidence = DS.evidence.filter(function (e) { return e.status === "verified"; });
  var evidenceQueue =
    '<h2 style="font-size:1.35rem;margin:30px 0 12px">eCW University evidence (' + pendingEvidence.length + " pending)</h2>" +
    (pendingEvidence.length === 0
      ? '<div class="empty">No evidence waiting for this learner. Learners submit eCW University completion evidence from the SHW-203 course page.</div>'
      : pendingEvidence.map(function (e) {
          return '<div class="queue-item mb"><b style="color:var(--navy)">' + esc(e.course) + " — completion evidence</b> " +
            '<span class="chip st-ready">Pending verification</span>' +
            "<p style='margin:8px 0 4px'>" + esc(e.text) + "</p>" +
            '<p class="small" style="margin:0">Submitted by ' + esc(e.by) + " · " + fmtDate(e.at) + "</p>" +
            '<div class="queue-actions"><button class="btn btn-primary" data-verify="' + e.id + '" type="button">✓ Mark verified</button></div></div>';
        }).join("")) +
    (verifiedEvidence.length === 0 ? "" :
      verifiedEvidence.map(function (e) {
        return '<p class="small" style="margin:6px 0">✓ <b>' + esc(e.course) + "</b> — " + esc(e.text) +
          ' <span style="color:var(--muted)">· verified by ' + esc(e.verifiedBy) + " on " + fmtDate(e.verifiedAt) + "</span></p>";
      }).join(""));

  var escalations = COURSES.filter(function (c) { return criticalCount(c.code) >= 2; });
  var escHtml = escalations.length === 0 ? "" :
    '<div class="notice danger"><p><strong>Escalation:</strong> ' +
    escalations.map(function (c) { return esc(c.code) + " has " + criticalCount(c.code) + " recorded critical failures"; }).join("; ") +
    ". Per Academy rules, two repeated critical failures escalate to the <b>Ghana Clinical Operations Lead</b> before progression resumes.</p></div>";

  var matrixRows = COURSES.map(function (c) {
    var st = courseStatus(c.code);
    var dotsHtml = c.units.map(function (u) {
      return '<i class="' + (unitDone(c.code, u.n) ? "done" : "") + '" title="Unit ' + u.n + ": " + esc(u.title) + '"></i>';
    }).join("");
    return "<tr><td><b>" + esc(c.code) + "</b></td><td>" + esc(c.title) + '</td><td><span class="unit-dots">' + dotsHtml + "</span></td><td>" +
      unitsDoneCount(c.code) + " / 5</td><td>" + chip(st) + "</td></tr>";
  }).join("");

  var history = DS.history.length === 0
    ? '<div class="empty">No sign-off decisions recorded for this learner yet.</div>'
    : DS.history.slice(0, 12).map(function (h) {
        return '<div class="history-item ' + h.outcome + '"><p><b>' + esc(h.code) + "</b> — " +
          (h.outcome === "passed" ? "✓ Signed off as Passed" : "Sent to remediation") +
          (h.critical ? ' · <b style="color:var(--danger)">critical error flagged</b>' : "") + "</p>" +
          (h.note ? "<p>\u201C" + esc(h.note) + "\u201D</p>" : "") +
          '<p class="when">By ' + esc(h.by) + " · " + fmtDate(h.at) + "</p></div>";
      }).join("");

  app.innerHTML =
    '<div class="page"><div class="page-head"><p class="eyebrow">' + dots() + " Instructor</p>" +
    "<h1>Cohort progress</h1>" +
    '<p class="lede">Reviewing <b>' + esc(learner.name) + "</b> (" + esc(learner.email) + ") · " + done + " of " + TOTAL_UNITS +
    " units complete · " + coursesPassed() + " of 16 courses passed. " + cohort.length + " learner account" + (cohort.length === 1 ? "" : "s") + " in the cohort.</p></div>" +
    picker +
    escHtml + ehrPanel +
    '<h2 style="font-size:1.35rem;margin-bottom:12px">Pending sign-offs (' + ready.length + ")</h2>" + queue +
    remList + evidenceQueue +
    '<h2 style="font-size:1.35rem;margin:30px 0 12px">Progress matrix</h2>' +
    '<div class="card" style="padding:8px 18px;overflow-x:auto"><table class="matrix"><thead><tr><th>Code</th><th>Course</th><th>Units</th><th>Done</th><th>Status</th></tr></thead><tbody>' +
    matrixRows + "</tbody></table></div>" +
    '<h2 style="font-size:1.35rem;margin:30px 0 12px">Decision history</h2>' + history +
    "</div>";

  wireLearnerPick();

  app.querySelectorAll("[data-signoff]").forEach(function (b) {
    b.addEventListener("click", function () {
      var code = b.getAttribute("data-code");
      var outcome = b.getAttribute("data-signoff");
      var critical = document.getElementById("crit-" + code).checked;
      var note = document.getElementById("note-" + code).value.trim();
      if (critical && outcome === "passed") {
        alert("A critical error is flagged for " + code + ". Academy rules: a critical privacy, security, or patient-safety error triggers remediation even when the score passes — this course cannot be signed off as Passed with the flag set.");
        return;
      }
      var target = selectedLearner();
      if (!target) return;
      var entry = { outcome: outcome, by: session.name, at: new Date().toISOString(), note: note, critical: critical };
      var newStatus = {};
      var oldStatus = target.raw.records.courseStatus || {};
      Object.keys(oldStatus).forEach(function (k) { newStatus[k] = oldStatus[k]; });
      newStatus[code] = entry;
      var histEntry = { code: code, outcome: outcome, by: entry.by, at: entry.at, note: note, critical: critical };
      b.disabled = true;
      updateDoc(recordsRef(target.uid), { courseStatus: newStatus, decisions: arrayUnion(histEntry) })
        .then(function () {
          target.raw.records.courseStatus = newStatus;
          if (!target.raw.records.decisions) target.raw.records.decisions = [];
          target.raw.records.decisions.push(histEntry);
          viewInstructor();
          window.scrollTo(0, 0);
        })
        .catch(function () {
          b.disabled = false;
          alert("Could not save the decision — check your connection and try again.");
        });
    });
  });
  var ehrBtn = document.getElementById("btn-ehr-approve");
  if (ehrBtn) {
    ehrBtn.addEventListener("click", function () {
      var target = selectedLearner();
      if (!target) return;
      ehrBtn.disabled = true;
      updateDoc(recordsRef(target.uid), { ehrApproved: true })
        .then(function () {
          target.raw.records.ehrApproved = true;
          viewInstructor();
          window.scrollTo(0, 0);
        })
        .catch(function () {
          ehrBtn.disabled = false;
          alert("Could not save the approval — check your connection and try again.");
        });
    });
  }
  app.querySelectorAll("[data-verify]").forEach(function (b) {
    b.addEventListener("click", function () {
      var target = selectedLearner();
      if (!target) return;
      var id = b.getAttribute("data-verify");
      var newEvidence = (target.raw.records.evidence || []).map(function (e) {
        if (String(e.id) === String(id)) {
          return { id: e.id, course: e.course, text: e.text, by: e.by, at: e.at,
                   status: "verified", verifiedBy: session.name, verifiedAt: new Date().toISOString() };
        }
        return e;
      });
      b.disabled = true;
      updateDoc(recordsRef(target.uid), { evidence: newEvidence })
        .then(function () {
          target.raw.records.evidence = newEvidence;
          viewInstructor();
        })
        .catch(function () {
          b.disabled = false;
          alert("Could not verify the evidence — check your connection and try again.");
        });
    });
  });
}

function wireLearnerPick() {
  var pick = document.getElementById("learner-pick");
  if (pick) {
    pick.addEventListener("change", function () {
      selectedUid = pick.value;
      render();
    });
  }
}

/* ---------------- router + boot ---------------- */

function render() {
  if (booting) { viewLoading(); return; }
  if (dataError) { viewFatal(dataError); return; }
  if (!session) { viewAuth(); return; }
  refreshDS();
  var hash = location.hash || "#/";
  var parts = hash.replace(/^#\//, "").split("/");
  if (parts[0] === "path") viewPath();
  else if (parts[0] === "course" && parts[1]) viewCourse(parts[1]);
  else if (parts[0] === "lesson" && parts[1] && parts[2]) viewLesson(parts[1], parts[2]);
  else if (parts[0] === "instructor") viewInstructor();
  else if (session.role === "instructor" && (hash === "#/" || hash === "#" || hash === "")) viewInstructor();
  else viewDashboard();
}

document.getElementById("btn-signout").addEventListener("click", function () {
  signOut(auth).catch(function () { /* listener still fires */ });
});

window.addEventListener("hashchange", function () {
  render();
  window.scrollTo(0, 0);
});

onAuthStateChanged(auth, function (user) {
  if (provisioning) return; // sign-up flow loads the session itself
  if (!user) {
    session = null;
    myRaw = null;
    cohort = [];
    selectedUid = null;
    loadedUid = null;
    booting = false;
    dataError = null;
    render();
    return;
  }
  if (loadedUid === user.uid && session) { render(); return; }
  booting = true;
  viewLoading();
  loadSession(user);
});

viewLoading();
