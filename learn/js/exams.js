/* Songdel Academy question bank — Corrected Exams v1.1 (160 questions, 10 per course).
   Converted from the instructor-key CSVs; trainee CSVs cross-checked identical.
   NOTE: draft starter bank per the package README — flagged for clinical-lead review
   before certification use. Pass marks live in data.js (course.passPercent). */
var EXAMS = {
 "SHW-101": [
  {
   "id": "SHW-101-Q01",
   "q": "What is PHI?",
   "opts": [
    "Using the approved identity-verification procedure",
    "Access only information needed for the assigned purpose",
    "Individually identifiable health information",
    "Promptly report through the designated privacy incident process"
   ],
   "answer": 2,
   "why": "Individually identifiable health information"
  },
  {
   "id": "SHW-101-Q02",
   "q": "What does minimum necessary mean for routine operations?",
   "opts": [
    "Access only information needed for the assigned purpose",
    "No, verify authorization and applicable policy",
    "No, every user must use their own account",
    "No, access must be tied to an authorized task"
   ],
   "answer": 0,
   "why": "Access only information needed for the assigned purpose"
  },
  {
   "id": "SHW-101-Q03",
   "q": "Does EHR login access authorize browsing any chart?",
   "opts": [
    "No, access must be tied to an authorized task",
    "Not without appropriate authorization and safeguards; prefer synthetic data",
    "The designated privacy/legal response process",
    "Promptly report through the designated privacy incident process"
   ],
   "answer": 0,
   "why": "No, access must be tied to an authorized task"
  },
  {
   "id": "SHW-101-Q04",
   "q": "What is the first step after sending PHI to a wrong recipient?",
   "opts": [
    "No, every user must use their own account",
    "Promptly report through the designated privacy incident process",
    "A person or entity performing covered functions involving PHI for a covered entity",
    "Using the approved identity-verification procedure"
   ],
   "answer": 1,
   "why": "Promptly report through the designated privacy incident process"
  },
  {
   "id": "SHW-101-Q05",
   "q": "May staff share individual EHR credentials?",
   "opts": [
    "No, every user must use their own account",
    "No, verify authorization and applicable policy",
    "The designated privacy/legal response process",
    "Individually identifiable health information"
   ],
   "answer": 0,
   "why": "No, every user must use their own account"
  },
  {
   "id": "SHW-101-Q06",
   "q": "Who decides whether an incident is a reportable HIPAA breach?",
   "opts": [
    "Not without appropriate authorization and safeguards; prefer synthetic data",
    "Using the approved identity-verification procedure",
    "Access only information needed for the assigned purpose",
    "The designated privacy/legal response process"
   ],
   "answer": 3,
   "why": "The designated privacy/legal response process"
  },
  {
   "id": "SHW-101-Q07",
   "q": "How should a patient identity be verified before disclosure?",
   "opts": [
    "A person or entity performing covered functions involving PHI for a covered entity",
    "Using the approved identity-verification procedure",
    "No, access must be tied to an authorized task",
    "No, verify authorization and applicable policy"
   ],
   "answer": 1,
   "why": "Using the approved identity-verification procedure"
  },
  {
   "id": "SHW-101-Q08",
   "q": "May a patient relative automatically obtain test results?",
   "opts": [
    "Promptly report through the designated privacy incident process",
    "Not without appropriate authorization and safeguards; prefer synthetic data",
    "Individually identifiable health information",
    "No, verify authorization and applicable policy"
   ],
   "answer": 3,
   "why": "No, verify authorization and applicable policy"
  },
  {
   "id": "SHW-101-Q09",
   "q": "Can a training screenshot contain real patient identifiers?",
   "opts": [
    "A person or entity performing covered functions involving PHI for a covered entity",
    "Not without appropriate authorization and safeguards; prefer synthetic data",
    "Access only information needed for the assigned purpose",
    "No, every user must use their own account"
   ],
   "answer": 1,
   "why": "Not without appropriate authorization and safeguards; prefer synthetic data"
  },
  {
   "id": "SHW-101-Q10",
   "q": "What is a business associate in HIPAA context?",
   "opts": [
    "A person or entity performing covered functions involving PHI for a covered entity",
    "Individually identifiable health information",
    "No, access must be tied to an authorized task",
    "The designated privacy/legal response process"
   ],
   "answer": 0,
   "why": "A person or entity performing covered functions involving PHI for a covered entity"
  }
 ],
 "SHW-102": [
  {
   "id": "SHW-102-Q01",
   "q": "What should you do with an unexpected MFA approval request?",
   "opts": [
    "Report promptly under the incident response process",
    "A deceptive attempt to obtain information or access",
    "Deny and report it through approved security channels",
    "Do not open it; report according to security policy"
   ],
   "answer": 2,
   "why": "Deny and report it through approved security channels"
  },
  {
   "id": "SHW-102-Q02",
   "q": "What is phishing?",
   "opts": [
    "Refuse and verify through an independently known support channel",
    "To prevent unauthorized viewing or use",
    "A deceptive attempt to obtain information or access",
    "Not unless expressly approved by policy and safeguards"
   ],
   "answer": 2,
   "why": "A deceptive attempt to obtain information or access"
  },
  {
   "id": "SHW-102-Q03",
   "q": "How should an IT caller requesting your one-time code be handled?",
   "opts": [
    "Refuse and verify through an independently known support channel",
    "Only in specifically approved systems",
    "Do not open it; report according to security policy",
    "Malware that encrypts or blocks access and demands payment"
   ],
   "answer": 0,
   "why": "Refuse and verify through an independently known support channel"
  },
  {
   "id": "SHW-102-Q04",
   "q": "What is the safest response to a suspicious attachment?",
   "opts": [
    "Report promptly under the incident response process",
    "To prevent unauthorized viewing or use",
    "Grant only the permissions needed for assigned duties",
    "Do not open it; report according to security policy"
   ],
   "answer": 3,
   "why": "Do not open it; report according to security policy"
  },
  {
   "id": "SHW-102-Q05",
   "q": "Why lock the screen when stepping away?",
   "opts": [
    "Not unless expressly approved by policy and safeguards",
    "Only in specifically approved systems",
    "To prevent unauthorized viewing or use",
    "Deny and report it through approved security channels"
   ],
   "answer": 2,
   "why": "To prevent unauthorized viewing or use"
  },
  {
   "id": "SHW-102-Q06",
   "q": "Where should patient data be stored for Songdel work?",
   "opts": [
    "Malware that encrypts or blocks access and demands payment",
    "A deceptive attempt to obtain information or access",
    "Only in specifically approved systems",
    "Report promptly under the incident response process"
   ],
   "answer": 2,
   "why": "Only in specifically approved systems"
  },
  {
   "id": "SHW-102-Q07",
   "q": "What should happen after a company laptop is lost?",
   "opts": [
    "Grant only the permissions needed for assigned duties",
    "Not unless expressly approved by policy and safeguards",
    "Refuse and verify through an independently known support channel",
    "Report promptly under the incident response process"
   ],
   "answer": 3,
   "why": "Report promptly under the incident response process"
  },
  {
   "id": "SHW-102-Q08",
   "q": "Can a personal USB drive be used to move PHI?",
   "opts": [
    "Malware that encrypts or blocks access and demands payment",
    "Deny and report it through approved security channels",
    "Not unless expressly approved by policy and safeguards",
    "Do not open it; report according to security policy"
   ],
   "answer": 2,
   "why": "Not unless expressly approved by policy and safeguards"
  },
  {
   "id": "SHW-102-Q09",
   "q": "What is ransomware?",
   "opts": [
    "Malware that encrypts or blocks access and demands payment",
    "To prevent unauthorized viewing or use",
    "Grant only the permissions needed for assigned duties",
    "A deceptive attempt to obtain information or access"
   ],
   "answer": 0,
   "why": "Malware that encrypts or blocks access and demands payment"
  },
  {
   "id": "SHW-102-Q10",
   "q": "What does least privilege mean?",
   "opts": [
    "Grant only the permissions needed for assigned duties",
    "Refuse and verify through an independently known support channel",
    "Only in specifically approved systems",
    "Deny and report it through approved security channels"
   ],
   "answer": 0,
   "why": "Grant only the permissions needed for assigned duties"
  }
 ],
 "SHW-103": [
  {
   "id": "SHW-103-Q01",
   "q": "What is a primary care provider commonly responsible for?",
   "opts": [
    "Appropriately licensed treating clinicians",
    "A request for evaluation or care by a specialist",
    "Longitudinal general medical care and coordination",
    "Referral receipt, outreach, scheduling and closure"
   ],
   "answer": 2,
   "why": "Longitudinal general medical care and coordination"
  },
  {
   "id": "SHW-103-Q02",
   "q": "What does a specialist referral generally initiate?",
   "opts": [
    "Transfer of care or information between settings or clinicians",
    "It identifies the receiving owner and prevents lost tasks",
    "A request for evaluation or care by a specialist",
    "Acute emergency assessment and stabilization"
   ],
   "answer": 2,
   "why": "A request for evaluation or care by a specialist"
  },
  {
   "id": "SHW-103-Q03",
   "q": "What is an emergency department designed to handle?",
   "opts": [
    "To provide relevant history and avoid missing information",
    "Care without admission as an inpatient",
    "Appropriately licensed treating clinicians",
    "Acute emergency assessment and stabilization"
   ],
   "answer": 3,
   "why": "Acute emergency assessment and stabilization"
  },
  {
   "id": "SHW-103-Q04",
   "q": "Who is responsible for clinical diagnosis?",
   "opts": [
    "Transfer of care or information between settings or clinicians",
    "Appropriately licensed treating clinicians",
    "Escalate to authorized clinical personnel",
    "Referral receipt, outreach, scheduling and closure"
   ],
   "answer": 1,
   "why": "Appropriately licensed treating clinicians"
  },
  {
   "id": "SHW-103-Q05",
   "q": "What is a care transition?",
   "opts": [
    "It identifies the receiving owner and prevents lost tasks",
    "Transfer of care or information between settings or clinicians",
    "Longitudinal general medical care and coordination",
    "To provide relevant history and avoid missing information"
   ],
   "answer": 1,
   "why": "Transfer of care or information between settings or clinicians"
  },
  {
   "id": "SHW-103-Q06",
   "q": "Why request outside medical records before a consult?",
   "opts": [
    "To provide relevant history and avoid missing information",
    "A request for evaluation or care by a specialist",
    "Referral receipt, outreach, scheduling and closure",
    "Care without admission as an inpatient"
   ],
   "answer": 0,
   "why": "To provide relevant history and avoid missing information"
  },
  {
   "id": "SHW-103-Q07",
   "q": "What does a referral coordinator track?",
   "opts": [
    "Escalate to authorized clinical personnel",
    "Acute emergency assessment and stabilization",
    "Referral receipt, outreach, scheduling and closure",
    "It identifies the receiving owner and prevents lost tasks"
   ],
   "answer": 2,
   "why": "Referral receipt, outreach, scheduling and closure"
  },
  {
   "id": "SHW-103-Q08",
   "q": "Why is a documented handoff important?",
   "opts": [
    "Appropriately licensed treating clinicians",
    "Care without admission as an inpatient",
    "Longitudinal general medical care and coordination",
    "It identifies the receiving owner and prevents lost tasks"
   ],
   "answer": 3,
   "why": "It identifies the receiving owner and prevents lost tasks"
  },
  {
   "id": "SHW-103-Q09",
   "q": "What is an outpatient visit?",
   "opts": [
    "A request for evaluation or care by a specialist",
    "Care without admission as an inpatient",
    "Transfer of care or information between settings or clinicians",
    "Escalate to authorized clinical personnel"
   ],
   "answer": 1,
   "why": "Care without admission as an inpatient"
  },
  {
   "id": "SHW-103-Q10",
   "q": "What is the appropriate VA response to a clinical question beyond protocol?",
   "opts": [
    "Escalate to authorized clinical personnel",
    "Longitudinal general medical care and coordination",
    "To provide relevant history and avoid missing information",
    "Acute emergency assessment and stabilization"
   ],
   "answer": 0,
   "why": "Escalate to authorized clinical personnel"
  }
 ],
 "SHW-104": [
  {
   "id": "SHW-104-Q01",
   "q": "What is an insurance deductible?",
   "opts": [
    "Physician and many outpatient services",
    "No, coverage and payment depend on additional rules",
    "A defined patient payment for a covered service",
    "Amount patient may owe before certain plan benefits apply"
   ],
   "answer": 3,
   "why": "Amount patient may owe before certain plan benefits apply"
  },
  {
   "id": "SHW-104-Q02",
   "q": "What is a copayment?",
   "opts": [
    "A percentage share of allowed covered costs",
    "A group of contracted participating providers",
    "A defined patient payment for a covered service",
    "Payer approval process required for certain services"
   ],
   "answer": 2,
   "why": "A defined patient payment for a covered service"
  },
  {
   "id": "SHW-104-Q03",
   "q": "What is coinsurance?",
   "opts": [
    "Medicare benefits delivered through an approved private plan",
    "The designated eligibility or billing team using payer verification",
    "A percentage share of allowed covered costs",
    "No, coverage and payment depend on additional rules"
   ],
   "answer": 2,
   "why": "A percentage share of allowed covered costs"
  },
  {
   "id": "SHW-104-Q04",
   "q": "Does active eligibility guarantee a claim will be paid?",
   "opts": [
    "Physician and many outpatient services",
    "No, coverage and payment depend on additional rules",
    "A group of contracted participating providers",
    "No, use approved financial language and verification"
   ],
   "answer": 1,
   "why": "No, coverage and payment depend on additional rules"
  },
  {
   "id": "SHW-104-Q05",
   "q": "What is a payer network?",
   "opts": [
    "Medicare benefits delivered through an approved private plan",
    "A group of contracted participating providers",
    "Payer approval process required for certain services",
    "Amount patient may owe before certain plan benefits apply"
   ],
   "answer": 1,
   "why": "A group of contracted participating providers"
  },
  {
   "id": "SHW-104-Q06",
   "q": "What is Medicare Advantage?",
   "opts": [
    "A defined patient payment for a covered service",
    "The designated eligibility or billing team using payer verification",
    "Physician and many outpatient services",
    "Medicare benefits delivered through an approved private plan"
   ],
   "answer": 3,
   "why": "Medicare benefits delivered through an approved private plan"
  },
  {
   "id": "SHW-104-Q07",
   "q": "What does Medicare Part B generally cover?",
   "opts": [
    "A percentage share of allowed covered costs",
    "No, use approved financial language and verification",
    "Payer approval process required for certain services",
    "Physician and many outpatient services"
   ],
   "answer": 3,
   "why": "Physician and many outpatient services"
  },
  {
   "id": "SHW-104-Q08",
   "q": "What is prior authorization?",
   "opts": [
    "Amount patient may owe before certain plan benefits apply",
    "No, coverage and payment depend on additional rules",
    "The designated eligibility or billing team using payer verification",
    "Payer approval process required for certain services"
   ],
   "answer": 3,
   "why": "Payer approval process required for certain services"
  },
  {
   "id": "SHW-104-Q09",
   "q": "Who should resolve uncertain payer benefit details?",
   "opts": [
    "No, use approved financial language and verification",
    "A defined patient payment for a covered service",
    "The designated eligibility or billing team using payer verification",
    "A group of contracted participating providers"
   ],
   "answer": 2,
   "why": "The designated eligibility or billing team using payer verification"
  },
  {
   "id": "SHW-104-Q10",
   "q": "Can a VA guarantee a patient will have zero balance?",
   "opts": [
    "Medicare benefits delivered through an approved private plan",
    "A percentage share of allowed covered costs",
    "No, use approved financial language and verification",
    "Amount patient may owe before certain plan benefits apply"
   ],
   "answer": 2,
   "why": "No, use approved financial language and verification"
  }
 ],
 "SHW-105": [
  {
   "id": "SHW-105-Q01",
   "q": "What is ICD-10-CM primarily used for?",
   "opts": [
    "A payer explanation of claim processing and patient responsibility",
    "Reporting medical procedures and services",
    "A claim adjudicated without payment for some or all services",
    "Classification of diagnoses and health conditions"
   ],
   "answer": 3,
   "why": "Classification of diagnoses and health conditions"
  },
  {
   "id": "SHW-105-Q02",
   "q": "What is CPT primarily used for?",
   "opts": [
    "Errors can cause eligibility and claim problems",
    "A request for reimbursement submitted to a payer",
    "Reporting medical procedures and services",
    "Electronic remittance advice communicating adjudication"
   ],
   "answer": 2,
   "why": "Reporting medical procedures and services"
  },
  {
   "id": "SHW-105-Q03",
   "q": "What is a claim?",
   "opts": [
    "A request for reimbursement submitted to a payer",
    "A payer explanation of claim processing and patient responsibility",
    "A claim not accepted for adjudication due to submission errors",
    "Payer deadline for claim submission"
   ],
   "answer": 0,
   "why": "A request for reimbursement submitted to a payer"
  },
  {
   "id": "SHW-105-Q04",
   "q": "What is an EOB?",
   "opts": [
    "A payer explanation of claim processing and patient responsibility",
    "A claim adjudicated without payment for some or all services",
    "Electronic remittance advice communicating adjudication",
    "No, clinical facts and coding must be accurate"
   ],
   "answer": 0,
   "why": "A payer explanation of claim processing and patient responsibility"
  },
  {
   "id": "SHW-105-Q05",
   "q": "What is an ERA?",
   "opts": [
    "Classification of diagnoses and health conditions",
    "A claim not accepted for adjudication due to submission errors",
    "Electronic remittance advice communicating adjudication",
    "Errors can cause eligibility and claim problems"
   ],
   "answer": 2,
   "why": "Electronic remittance advice communicating adjudication"
  },
  {
   "id": "SHW-105-Q06",
   "q": "What is a front-end claim rejection?",
   "opts": [
    "A claim not accepted for adjudication due to submission errors",
    "Payer deadline for claim submission",
    "Reporting medical procedures and services",
    "A claim adjudicated without payment for some or all services"
   ],
   "answer": 0,
   "why": "A claim not accepted for adjudication due to submission errors"
  },
  {
   "id": "SHW-105-Q07",
   "q": "What is a denial?",
   "opts": [
    "Errors can cause eligibility and claim problems",
    "A claim adjudicated without payment for some or all services",
    "No, clinical facts and coding must be accurate",
    "A request for reimbursement submitted to a payer"
   ],
   "answer": 1,
   "why": "A claim adjudicated without payment for some or all services"
  },
  {
   "id": "SHW-105-Q08",
   "q": "Why does accurate registration matter to RCM?",
   "opts": [
    "Errors can cause eligibility and claim problems",
    "Payer deadline for claim submission",
    "Classification of diagnoses and health conditions",
    "A payer explanation of claim processing and patient responsibility"
   ],
   "answer": 0,
   "why": "Errors can cause eligibility and claim problems"
  },
  {
   "id": "SHW-105-Q09",
   "q": "What does timely filing mean?",
   "opts": [
    "Payer deadline for claim submission",
    "No, clinical facts and coding must be accurate",
    "Electronic remittance advice communicating adjudication",
    "Reporting medical procedures and services"
   ],
   "answer": 0,
   "why": "Payer deadline for claim submission"
  },
  {
   "id": "SHW-105-Q10",
   "q": "May a VA add an unsupported diagnosis to improve payment?",
   "opts": [
    "No, clinical facts and coding must be accurate",
    "A claim not accepted for adjudication due to submission errors",
    "A request for reimbursement submitted to a payer",
    "Classification of diagnoses and health conditions"
   ],
   "answer": 0,
   "why": "No, clinical facts and coding must be accurate"
  }
 ],
 "SHW-106": [
  {
   "id": "SHW-106-Q01",
   "q": "How should a patient call be opened?",
   "opts": [
    "Use the approved professional greeting and identify the practice",
    "Explain that they will verify and route the question",
    "No, provide only approved expectations",
    "Complete the approved identity-verification process"
   ],
   "answer": 0,
   "why": "Use the approved professional greeting and identify the practice"
  },
  {
   "id": "SHW-106-Q02",
   "q": "What should a VA do when unsure of an answer?",
   "opts": [
    "Explain that they will verify and route the question",
    "Remain respectful, listen and follow escalation policy",
    "Do not interpret; route to authorized clinical staff",
    "Objectively with facts, actions and next steps"
   ],
   "answer": 0,
   "why": "Explain that they will verify and route the question"
  },
  {
   "id": "SHW-106-Q03",
   "q": "How should a complaint be documented?",
   "opts": [
    "To confirm accuracy and reduce misunderstanding",
    "Objectively with facts, actions and next steps",
    "Complete the approved identity-verification process",
    "Confirmation of ownership, action and follow-up"
   ],
   "answer": 1,
   "why": "Objectively with facts, actions and next steps"
  },
  {
   "id": "SHW-106-Q04",
   "q": "What must happen before discussing protected details by phone?",
   "opts": [
    "Follow the practice safety and escalation protocol",
    "No, provide only approved expectations",
    "Complete the approved identity-verification process",
    "Remain respectful, listen and follow escalation policy"
   ],
   "answer": 2,
   "why": "Complete the approved identity-verification process"
  },
  {
   "id": "SHW-106-Q05",
   "q": "What should a VA do if a caller becomes upset?",
   "opts": [
    "Do not interpret; route to authorized clinical staff",
    "Remain respectful, listen and follow escalation policy",
    "Use the approved professional greeting and identify the practice",
    "Confirmation of ownership, action and follow-up"
   ],
   "answer": 1,
   "why": "Remain respectful, listen and follow escalation policy"
  },
  {
   "id": "SHW-106-Q06",
   "q": "What is closed-loop communication?",
   "opts": [
    "Confirmation of ownership, action and follow-up",
    "No, provide only approved expectations",
    "Explain that they will verify and route the question",
    "To confirm accuracy and reduce misunderstanding"
   ],
   "answer": 0,
   "why": "Confirmation of ownership, action and follow-up"
  },
  {
   "id": "SHW-106-Q07",
   "q": "May a VA promise a callback time not supported by policy?",
   "opts": [
    "Objectively with facts, actions and next steps",
    "No, provide only approved expectations",
    "Do not interpret; route to authorized clinical staff",
    "Follow the practice safety and escalation protocol"
   ],
   "answer": 1,
   "why": "No, provide only approved expectations"
  },
  {
   "id": "SHW-106-Q08",
   "q": "How should clinical test results be explained by an administrative VA?",
   "opts": [
    "Complete the approved identity-verification process",
    "Do not interpret; route to authorized clinical staff",
    "Use the approved professional greeting and identify the practice",
    "To confirm accuracy and reduce misunderstanding"
   ],
   "answer": 1,
   "why": "Do not interpret; route to authorized clinical staff"
  },
  {
   "id": "SHW-106-Q09",
   "q": "Why read back critical appointment details?",
   "opts": [
    "Remain respectful, listen and follow escalation policy",
    "Follow the practice safety and escalation protocol",
    "To confirm accuracy and reduce misunderstanding",
    "Explain that they will verify and route the question"
   ],
   "answer": 2,
   "why": "To confirm accuracy and reduce misunderstanding"
  },
  {
   "id": "SHW-106-Q10",
   "q": "What is an appropriate response to an abusive caller?",
   "opts": [
    "Objectively with facts, actions and next steps",
    "Use the approved professional greeting and identify the practice",
    "Confirmation of ownership, action and follow-up",
    "Follow the practice safety and escalation protocol"
   ],
   "answer": 3,
   "why": "Follow the practice safety and escalation protocol"
  }
 ],
 "SHW-201": [
  {
   "id": "SHW-201-Q01",
   "q": "What is PulsePoint core cardiology intended to provide?",
   "opts": [
    "Check the current controlled client playbook",
    "Direct patients to appropriate approved services",
    "Identify the patient and begin the approved intake workflow",
    "Traditional cardiology consultation and follow-up"
   ],
   "answer": 3,
   "why": "Traditional cardiology consultation and follow-up"
  },
  {
   "id": "SHW-201-Q02",
   "q": "What is the purpose of a clinic service-line directory?",
   "opts": [
    "Contracting and network status can change",
    "Direct patients to appropriate approved services",
    "Using current approved program descriptions and pricing",
    "Use only the approved leadership-provided statement"
   ],
   "answer": 1,
   "why": "Direct patients to appropriate approved services"
  },
  {
   "id": "SHW-201-Q03",
   "q": "Why must payer credentialing scripts be updated?",
   "opts": [
    "Authorized practice leadership",
    "Identify the patient and begin the approved intake workflow",
    "Contracting and network status can change",
    "Use the approved self-pay workflow when insurance arrangements require it"
   ],
   "answer": 2,
   "why": "Contracting and network status can change"
  },
  {
   "id": "SHW-201-Q04",
   "q": "What is the first step after receiving a new referral?",
   "opts": [
    "When the current SOP does not resolve it",
    "Identify the patient and begin the approved intake workflow",
    "Check the current controlled client playbook",
    "Use only the approved leadership-provided statement"
   ],
   "answer": 1,
   "why": "Identify the patient and begin the approved intake workflow"
  },
  {
   "id": "SHW-201-Q05",
   "q": "What should a VA say about a legal dispute involving the clinic?",
   "opts": [
    "Authorized practice leadership",
    "Use only the approved leadership-provided statement",
    "Traditional cardiology consultation and follow-up",
    "Using current approved program descriptions and pricing"
   ],
   "answer": 1,
   "why": "Use only the approved leadership-provided statement"
  },
  {
   "id": "SHW-201-Q06",
   "q": "Who can change PulsePoint scheduling rules?",
   "opts": [
    "Check the current controlled client playbook",
    "Direct patients to appropriate approved services",
    "Use the approved self-pay workflow when insurance arrangements require it",
    "Authorized practice leadership"
   ],
   "answer": 3,
   "why": "Authorized practice leadership"
  },
  {
   "id": "SHW-201-Q07",
   "q": "What should a VA do when clinic hours are uncertain?",
   "opts": [
    "Check the current controlled client playbook",
    "Using current approved program descriptions and pricing",
    "Contracting and network status can change",
    "When the current SOP does not resolve it"
   ],
   "answer": 0,
   "why": "Check the current controlled client playbook"
  },
  {
   "id": "SHW-201-Q08",
   "q": "How should Premium and Cardiometabolic programs be described?",
   "opts": [
    "Identify the patient and begin the approved intake workflow",
    "Use the approved self-pay workflow when insurance arrangements require it",
    "Using current approved program descriptions and pricing",
    "Traditional cardiology consultation and follow-up"
   ],
   "answer": 2,
   "why": "Using current approved program descriptions and pricing"
  },
  {
   "id": "SHW-201-Q09",
   "q": "What does transitional self-pay mean operationally?",
   "opts": [
    "Use the approved self-pay workflow when insurance arrangements require it",
    "When the current SOP does not resolve it",
    "Direct patients to appropriate approved services",
    "Use only the approved leadership-provided statement"
   ],
   "answer": 0,
   "why": "Use the approved self-pay workflow when insurance arrangements require it"
  },
  {
   "id": "SHW-201-Q10",
   "q": "When should a PulsePoint policy question be escalated?",
   "opts": [
    "Authorized practice leadership",
    "Contracting and network status can change",
    "When the current SOP does not resolve it",
    "Traditional cardiology consultation and follow-up"
   ],
   "answer": 2,
   "why": "When the current SOP does not resolve it"
  }
 ],
 "SHW-202": [
  {
   "id": "SHW-202-Q01",
   "q": "What does ECG record?",
   "opts": [
    "Cardiac structure and function using ultrasound",
    "Heart rhythm data over time",
    "A direct oral anticoagulant",
    "Electrical activity of the heart"
   ],
   "answer": 3,
   "why": "Electrical activity of the heart"
  },
  {
   "id": "SHW-202-Q02",
   "q": "What does an echocardiogram assess?",
   "opts": [
    "Disease involving the arteries supplying the heart",
    "A common irregular atrial rhythm",
    "Percutaneous coronary intervention",
    "Cardiac structure and function using ultrasound"
   ],
   "answer": 3,
   "why": "Cardiac structure and function using ultrasound"
  },
  {
   "id": "SHW-202-Q03",
   "q": "What is atrial fibrillation?",
   "opts": [
    "No, refer interpretation to the clinician",
    "A common irregular atrial rhythm",
    "Heart rhythm data over time",
    "Lowering LDL cholesterol and cardiovascular risk"
   ],
   "answer": 1,
   "why": "A common irregular atrial rhythm"
  },
  {
   "id": "SHW-202-Q04",
   "q": "What does an ambulatory ECG monitor collect?",
   "opts": [
    "Heart rhythm data over time",
    "Follow the current approved emergency escalation protocol immediately",
    "Disease involving the arteries supplying the heart",
    "A direct oral anticoagulant"
   ],
   "answer": 0,
   "why": "Heart rhythm data over time"
  },
  {
   "id": "SHW-202-Q05",
   "q": "What is coronary artery disease?",
   "opts": [
    "Electrical activity of the heart",
    "Disease involving the arteries supplying the heart",
    "Lowering LDL cholesterol and cardiovascular risk",
    "Percutaneous coronary intervention"
   ],
   "answer": 1,
   "why": "Disease involving the arteries supplying the heart"
  },
  {
   "id": "SHW-202-Q06",
   "q": "What is a common role of statins?",
   "opts": [
    "Lowering LDL cholesterol and cardiovascular risk",
    "Cardiac structure and function using ultrasound",
    "A direct oral anticoagulant",
    "No, refer interpretation to the clinician"
   ],
   "answer": 0,
   "why": "Lowering LDL cholesterol and cardiovascular risk"
  },
  {
   "id": "SHW-202-Q07",
   "q": "What is a DOAC?",
   "opts": [
    "Percutaneous coronary intervention",
    "A common irregular atrial rhythm",
    "A direct oral anticoagulant",
    "Follow the current approved emergency escalation protocol immediately"
   ],
   "answer": 2,
   "why": "A direct oral anticoagulant"
  },
  {
   "id": "SHW-202-Q08",
   "q": "What does PCI commonly refer to?",
   "opts": [
    "Heart rhythm data over time",
    "Electrical activity of the heart",
    "No, refer interpretation to the clinician",
    "Percutaneous coronary intervention"
   ],
   "answer": 3,
   "why": "Percutaneous coronary intervention"
  },
  {
   "id": "SHW-202-Q09",
   "q": "May a VA independently interpret an abnormal echo?",
   "opts": [
    "Follow the current approved emergency escalation protocol immediately",
    "Disease involving the arteries supplying the heart",
    "Cardiac structure and function using ultrasound",
    "No, refer interpretation to the clinician"
   ],
   "answer": 3,
   "why": "No, refer interpretation to the clinician"
  },
  {
   "id": "SHW-202-Q10",
   "q": "What should a VA do about potentially emergent chest pain?",
   "opts": [
    "A common irregular atrial rhythm",
    "Follow the current approved emergency escalation protocol immediately",
    "Electrical activity of the heart",
    "Lowering LDL cholesterol and cardiovascular risk"
   ],
   "answer": 1,
   "why": "Follow the current approved emergency escalation protocol immediately"
  }
 ],
 "SHW-203": [
  {
   "id": "SHW-203-Q01",
   "q": "What is the first safeguard before editing a patient chart?",
   "opts": [
    "Documenting and routing patient communications",
    "No, each action must be attributable to the individual user",
    "Verify the correct patient with multiple identifiers",
    "Use additional identifiers before any chart action"
   ],
   "answer": 2,
   "why": "Verify the correct patient with multiple identifiers"
  },
  {
   "id": "SHW-203-Q02",
   "q": "What should be done when two patients have similar names?",
   "opts": [
    "Provider, location, visit type, patient and date/time",
    "Role-based access and approved job duties",
    "Use additional identifiers before any chart action",
    "Consult the current SOP or superuser; do not improvise"
   ],
   "answer": 2,
   "why": "Use additional identifiers before any chart action"
  },
  {
   "id": "SHW-203-Q03",
   "q": "What controls determine what eCW features a VA may use?",
   "opts": [
    "When documented and properly routed or closed per SOP",
    "Stop and follow approved correction and incident workflows",
    "Documenting and routing patient communications",
    "Role-based access and approved job duties"
   ],
   "answer": 3,
   "why": "Role-based access and approved job duties"
  },
  {
   "id": "SHW-203-Q04",
   "q": "What is a telephone encounter used for?",
   "opts": [
    "Documenting and routing patient communications",
    "Provider, location, visit type, patient and date/time",
    "Synthetic or authorized test patient data",
    "No, each action must be attributable to the individual user"
   ],
   "answer": 0,
   "why": "Documenting and routing patient communications"
  },
  {
   "id": "SHW-203-Q05",
   "q": "What must be verified when scheduling an appointment?",
   "opts": [
    "Consult the current SOP or superuser; do not improvise",
    "Stop and follow approved correction and incident workflows",
    "Verify the correct patient with multiple identifiers",
    "Provider, location, visit type, patient and date/time"
   ],
   "answer": 3,
   "why": "Provider, location, visit type, patient and date/time"
  },
  {
   "id": "SHW-203-Q06",
   "q": "How should an incorrectly indexed document be handled?",
   "opts": [
    "Stop and follow approved correction and incident workflows",
    "When documented and properly routed or closed per SOP",
    "Use additional identifiers before any chart action",
    "No, each action must be attributable to the individual user"
   ],
   "answer": 0,
   "why": "Stop and follow approved correction and incident workflows"
  },
  {
   "id": "SHW-203-Q07",
   "q": "Can a VA use another user’s eCW account?",
   "opts": [
    "No, each action must be attributable to the individual user",
    "Synthetic or authorized test patient data",
    "Consult the current SOP or superuser; do not improvise",
    "Role-based access and approved job duties"
   ],
   "answer": 0,
   "why": "No, each action must be attributable to the individual user"
  },
  {
   "id": "SHW-203-Q08",
   "q": "What is the correct response when an eCW screen differs from training?",
   "opts": [
    "When documented and properly routed or closed per SOP",
    "Documenting and routing patient communications",
    "Verify the correct patient with multiple identifiers",
    "Consult the current SOP or superuser; do not improvise"
   ],
   "answer": 3,
   "why": "Consult the current SOP or superuser; do not improvise"
  },
  {
   "id": "SHW-203-Q09",
   "q": "When is an eCW task complete?",
   "opts": [
    "When documented and properly routed or closed per SOP",
    "Use additional identifiers before any chart action",
    "Synthetic or authorized test patient data",
    "Provider, location, visit type, patient and date/time"
   ],
   "answer": 0,
   "why": "When documented and properly routed or closed per SOP"
  },
  {
   "id": "SHW-203-Q10",
   "q": "What data should be used in an eCW practice environment?",
   "opts": [
    "Stop and follow approved correction and incident workflows",
    "Role-based access and approved job duties",
    "Synthetic or authorized test patient data",
    "Verify the correct patient with multiple identifiers"
   ],
   "answer": 2,
   "why": "Synthetic or authorized test patient data"
  }
 ],
 "SHW-204": [
  {
   "id": "SHW-204-Q01",
   "q": "What information identifies a new patient appointment?",
   "opts": [
    "With status, reason when appropriate and next action",
    "Correct patient, provider, location, visit type and reason",
    "Document attempt and follow the callback cadence",
    "Use the approved urgent or emergency escalation protocol"
   ],
   "answer": 1,
   "why": "Correct patient, provider, location, visit type and reason"
  },
  {
   "id": "SHW-204-Q02",
   "q": "How should an urgent-symptom call be handled?",
   "opts": [
    "Tracking patients who may accept earlier openings",
    "To support referral tracking and communication",
    "Use the approved urgent or emergency escalation protocol",
    "Current scheduling rules, provider and resource availability"
   ],
   "answer": 2,
   "why": "Use the approved urgent or emergency escalation protocol"
  },
  {
   "id": "SHW-204-Q03",
   "q": "What is a waitlist used for?",
   "opts": [
    "Tracking patients who may accept earlier openings",
    "Fragmented information and patient-safety errors",
    "Document attempt and follow the callback cadence",
    "Use current approved pricing and financial workflow"
   ],
   "answer": 0,
   "why": "Tracking patients who may accept earlier openings"
  },
  {
   "id": "SHW-204-Q04",
   "q": "What should happen after an unanswered outreach call?",
   "opts": [
    "Only with a documented disposition under the SOP",
    "Document attempt and follow the callback cadence",
    "With status, reason when appropriate and next action",
    "To support referral tracking and communication"
   ],
   "answer": 1,
   "why": "Document attempt and follow the callback cadence"
  },
  {
   "id": "SHW-204-Q05",
   "q": "Why capture the referring provider?",
   "opts": [
    "To support referral tracking and communication",
    "Current scheduling rules, provider and resource availability",
    "Correct patient, provider, location, visit type and reason",
    "Fragmented information and patient-safety errors"
   ],
   "answer": 0,
   "why": "To support referral tracking and communication"
  },
  {
   "id": "SHW-204-Q06",
   "q": "What is the risk of creating a duplicate patient chart?",
   "opts": [
    "Fragmented information and patient-safety errors",
    "Use current approved pricing and financial workflow",
    "Use the approved urgent or emergency escalation protocol",
    "With status, reason when appropriate and next action"
   ],
   "answer": 0,
   "why": "Fragmented information and patient-safety errors"
  },
  {
   "id": "SHW-204-Q07",
   "q": "How should a cancellation be documented?",
   "opts": [
    "Current scheduling rules, provider and resource availability",
    "Tracking patients who may accept earlier openings",
    "With status, reason when appropriate and next action",
    "Only with a documented disposition under the SOP"
   ],
   "answer": 2,
   "why": "With status, reason when appropriate and next action"
  },
  {
   "id": "SHW-204-Q08",
   "q": "What should be verified before promising a test slot?",
   "opts": [
    "Use current approved pricing and financial workflow",
    "Current scheduling rules, provider and resource availability",
    "Correct patient, provider, location, visit type and reason",
    "Document attempt and follow the callback cadence"
   ],
   "answer": 1,
   "why": "Current scheduling rules, provider and resource availability"
  },
  {
   "id": "SHW-204-Q09",
   "q": "How should self-pay questions be handled?",
   "opts": [
    "Use current approved pricing and financial workflow",
    "To support referral tracking and communication",
    "Use the approved urgent or emergency escalation protocol",
    "Only with a documented disposition under the SOP"
   ],
   "answer": 0,
   "why": "Use current approved pricing and financial workflow"
  },
  {
   "id": "SHW-204-Q10",
   "q": "When can a referral be closed?",
   "opts": [
    "Only with a documented disposition under the SOP",
    "Correct patient, provider, location, visit type and reason",
    "Tracking patients who may accept earlier openings",
    "Fragmented information and patient-safety errors"
   ],
   "answer": 0,
   "why": "Only with a documented disposition under the SOP"
  }
 ],
 "SHW-205": [
  {
   "id": "SHW-205-Q01",
   "q": "What is the key safeguard before attaching a fax?",
   "opts": [
    "Tracking request source, date, status and follow-up",
    "A referral that fails to reach intended evaluation or completion",
    "Match the correct patient using multiple identifiers",
    "Track missing elements and request them through approved workflow"
   ],
   "answer": 2,
   "why": "Match the correct patient using multiple identifiers"
  },
  {
   "id": "SHW-205-Q02",
   "q": "What should happen to an incomplete referral?",
   "opts": [
    "Hold and escalate rather than guessing",
    "Reconcile them according to SOP without creating duplicate work",
    "Track missing elements and request them through approved workflow",
    "Associating records with the correct patient and document category"
   ],
   "answer": 2,
   "why": "Track missing elements and request them through approved workflow"
  },
  {
   "id": "SHW-205-Q03",
   "q": "What does document indexing mean?",
   "opts": [
    "Route promptly using the approved escalation pathway",
    "They may contain relevant procedural history",
    "Tracking request source, date, status and follow-up",
    "Associating records with the correct patient and document category"
   ],
   "answer": 3,
   "why": "Associating records with the correct patient and document category"
  },
  {
   "id": "SHW-205-Q04",
   "q": "What is a records-request log used for?",
   "opts": [
    "A referral that fails to reach intended evaluation or completion",
    "Tracking request source, date, status and follow-up",
    "Owner, status, next action and follow-up date",
    "Hold and escalate rather than guessing"
   ],
   "answer": 1,
   "why": "Tracking request source, date, status and follow-up"
  },
  {
   "id": "SHW-205-Q05",
   "q": "What should a VA do if a fax cannot be matched to a patient?",
   "opts": [
    "Match the correct patient using multiple identifiers",
    "Reconcile them according to SOP without creating duplicate work",
    "They may contain relevant procedural history",
    "Hold and escalate rather than guessing"
   ],
   "answer": 3,
   "why": "Hold and escalate rather than guessing"
  },
  {
   "id": "SHW-205-Q06",
   "q": "Why request prior cath reports for some cardiology visits?",
   "opts": [
    "Track missing elements and request them through approved workflow",
    "They may contain relevant procedural history",
    "A referral that fails to reach intended evaluation or completion",
    "Route promptly using the approved escalation pathway"
   ],
   "answer": 1,
   "why": "They may contain relevant procedural history"
  },
  {
   "id": "SHW-205-Q07",
   "q": "What is referral leakage?",
   "opts": [
    "Associating records with the correct patient and document category",
    "Owner, status, next action and follow-up date",
    "Reconcile them according to SOP without creating duplicate work",
    "A referral that fails to reach intended evaluation or completion"
   ],
   "answer": 3,
   "why": "A referral that fails to reach intended evaluation or completion"
  },
  {
   "id": "SHW-205-Q08",
   "q": "How should duplicate referrals be managed?",
   "opts": [
    "Reconcile them according to SOP without creating duplicate work",
    "Tracking request source, date, status and follow-up",
    "Match the correct patient using multiple identifiers",
    "Route promptly using the approved escalation pathway"
   ],
   "answer": 0,
   "why": "Reconcile them according to SOP without creating duplicate work"
  },
  {
   "id": "SHW-205-Q09",
   "q": "What should be done with time-sensitive clinical documents?",
   "opts": [
    "Track missing elements and request them through approved workflow",
    "Owner, status, next action and follow-up date",
    "Hold and escalate rather than guessing",
    "Route promptly using the approved escalation pathway"
   ],
   "answer": 3,
   "why": "Route promptly using the approved escalation pathway"
  },
  {
   "id": "SHW-205-Q10",
   "q": "What must every unresolved records request have?",
   "opts": [
    "Match the correct patient using multiple identifiers",
    "They may contain relevant procedural history",
    "Associating records with the correct patient and document category",
    "Owner, status, next action and follow-up date"
   ],
   "answer": 3,
   "why": "Owner, status, next action and follow-up date"
  }
 ],
 "SHW-206": [
  {
   "id": "SHW-206-Q01",
   "q": "Is prior authorization the same as eligibility?",
   "opts": [
    "No, they are separate payer processes",
    "Ordered service, payer and accurate supporting records",
    "Reference number, status and follow-up date",
    "No, other coverage and claim requirements may apply"
   ],
   "answer": 0,
   "why": "No, they are separate payer processes"
  },
  {
   "id": "SHW-206-Q02",
   "q": "What information typically initiates an authorization request?",
   "opts": [
    "No, never misrepresent clinical documentation",
    "Escalation to an appropriate authorized clinician",
    "Document reason and route appeal or clinical review as assigned",
    "Ordered service, payer and accurate supporting records"
   ],
   "answer": 3,
   "why": "Ordered service, payer and accurate supporting records"
  },
  {
   "id": "SHW-206-Q03",
   "q": "Can a VA change diagnoses to obtain authorization?",
   "opts": [
    "Escalate promptly according to timing protocol",
    "Seek clarification from the authorized PA lead",
    "Reference number, status and follow-up date",
    "No, never misrepresent clinical documentation"
   ],
   "answer": 3,
   "why": "No, never misrepresent clinical documentation"
  },
  {
   "id": "SHW-206-Q04",
   "q": "What should be recorded after an authorization submission?",
   "opts": [
    "When outcome and downstream scheduling/notification steps are documented",
    "Escalation to an appropriate authorized clinician",
    "No, other coverage and claim requirements may apply",
    "Reference number, status and follow-up date"
   ],
   "answer": 3,
   "why": "Reference number, status and follow-up date"
  },
  {
   "id": "SHW-206-Q05",
   "q": "What does peer-to-peer review require?",
   "opts": [
    "Escalation to an appropriate authorized clinician",
    "Escalate promptly according to timing protocol",
    "Document reason and route appeal or clinical review as assigned",
    "No, they are separate payer processes"
   ],
   "answer": 0,
   "why": "Escalation to an appropriate authorized clinician"
  },
  {
   "id": "SHW-206-Q06",
   "q": "How should a pending PA near a scheduled test be handled?",
   "opts": [
    "Seek clarification from the authorized PA lead",
    "Ordered service, payer and accurate supporting records",
    "No, other coverage and claim requirements may apply",
    "Escalate promptly according to timing protocol"
   ],
   "answer": 3,
   "why": "Escalate promptly according to timing protocol"
  },
  {
   "id": "SHW-206-Q07",
   "q": "Does authorization always guarantee reimbursement?",
   "opts": [
    "Document reason and route appeal or clinical review as assigned",
    "No, never misrepresent clinical documentation",
    "When outcome and downstream scheduling/notification steps are documented",
    "No, other coverage and claim requirements may apply"
   ],
   "answer": 3,
   "why": "No, other coverage and claim requirements may apply"
  },
  {
   "id": "SHW-206-Q08",
   "q": "What should happen after a payer denial?",
   "opts": [
    "Reference number, status and follow-up date",
    "Document reason and route appeal or clinical review as assigned",
    "No, they are separate payer processes",
    "Seek clarification from the authorized PA lead"
   ],
   "answer": 1,
   "why": "Document reason and route appeal or clinical review as assigned"
  },
  {
   "id": "SHW-206-Q09",
   "q": "What should a VA do when payer requirements conflict with SOP?",
   "opts": [
    "When outcome and downstream scheduling/notification steps are documented",
    "Escalation to an appropriate authorized clinician",
    "Ordered service, payer and accurate supporting records",
    "Seek clarification from the authorized PA lead"
   ],
   "answer": 3,
   "why": "Seek clarification from the authorized PA lead"
  },
  {
   "id": "SHW-206-Q10",
   "q": "When can a PA task be marked complete?",
   "opts": [
    "Escalate promptly according to timing protocol",
    "No, never misrepresent clinical documentation",
    "When outcome and downstream scheduling/notification steps are documented",
    "No, they are separate payer processes"
   ],
   "answer": 2,
   "why": "When outcome and downstream scheduling/notification steps are documented"
  }
 ],
 "SHW-207": [
  {
   "id": "SHW-207-Q01",
   "q": "What is the VA role in a refill request?",
   "opts": [
    "Collect accurate details and route for authorized review",
    "Follow the current escalation protocol without routine delay",
    "No, unless separately authorized under applicable rules and role; do not assume permission",
    "No, that requires authorized clinical action"
   ],
   "answer": 0,
   "why": "Collect accurate details and route for authorized review"
  },
  {
   "id": "SHW-207-Q02",
   "q": "Can a VA independently change medication dose?",
   "opts": [
    "Document the question and route to clinical staff",
    "No, that requires authorized clinical action",
    "To route work to the correct owner and urgency level",
    "Clarify or escalate instead of assuming intent"
   ],
   "answer": 1,
   "why": "No, that requires authorized clinical action"
  },
  {
   "id": "SHW-207-Q03",
   "q": "How should an abnormal-result question be handled?",
   "opts": [
    "Follow the current escalation protocol without routine delay",
    "An assigned team queue for clinical review and action",
    "Document the question and route to clinical staff",
    "Document and clarify through the approved workflow"
   ],
   "answer": 2,
   "why": "Document the question and route to clinical staff"
  },
  {
   "id": "SHW-207-Q04",
   "q": "What should happen when an inbox item indicates urgent symptoms?",
   "opts": [
    "Follow the current escalation protocol without routine delay",
    "When required clinical action or confirmed handoff is outstanding",
    "No, unless separately authorized under applicable rules and role; do not assume permission",
    "To route work to the correct owner and urgency level"
   ],
   "answer": 0,
   "why": "Follow the current escalation protocol without routine delay"
  },
  {
   "id": "SHW-207-Q05",
   "q": "What is the purpose of inbox categorization?",
   "opts": [
    "To route work to the correct owner and urgency level",
    "Clarify or escalate instead of assuming intent",
    "Collect accurate details and route for authorized review",
    "Document and clarify through the approved workflow"
   ],
   "answer": 0,
   "why": "To route work to the correct owner and urgency level"
  },
  {
   "id": "SHW-207-Q06",
   "q": "How should a pharmacy discrepancy be handled?",
   "opts": [
    "Document and clarify through the approved workflow",
    "No, unless separately authorized under applicable rules and role; do not assume permission",
    "An assigned team queue for clinical review and action",
    "No, that requires authorized clinical action"
   ],
   "answer": 0,
   "why": "Document and clarify through the approved workflow"
  },
  {
   "id": "SHW-207-Q07",
   "q": "May a VA sign a clinician’s medication order?",
   "opts": [
    "No, unless separately authorized under applicable rules and role; do not assume permission",
    "When required clinical action or confirmed handoff is outstanding",
    "Clarify or escalate instead of assuming intent",
    "Document the question and route to clinical staff"
   ],
   "answer": 0,
   "why": "No, unless separately authorized under applicable rules and role; do not assume permission"
  },
  {
   "id": "SHW-207-Q08",
   "q": "What should be done with an ambiguous patient message?",
   "opts": [
    "An assigned team queue for clinical review and action",
    "Follow the current escalation protocol without routine delay",
    "Clarify or escalate instead of assuming intent",
    "Collect accurate details and route for authorized review"
   ],
   "answer": 2,
   "why": "Clarify or escalate instead of assuming intent"
  },
  {
   "id": "SHW-207-Q09",
   "q": "What is a clinical pool?",
   "opts": [
    "No, that requires authorized clinical action",
    "To route work to the correct owner and urgency level",
    "An assigned team queue for clinical review and action",
    "When required clinical action or confirmed handoff is outstanding"
   ],
   "answer": 2,
   "why": "An assigned team queue for clinical review and action"
  },
  {
   "id": "SHW-207-Q10",
   "q": "When should an inbox task remain open?",
   "opts": [
    "Document and clarify through the approved workflow",
    "When required clinical action or confirmed handoff is outstanding",
    "Document the question and route to clinical staff",
    "Collect accurate details and route for authorized review"
   ],
   "answer": 1,
   "why": "When required clinical action or confirmed handoff is outstanding"
  }
 ],
 "SHW-208": [
  {
   "id": "SHW-208-Q01",
   "q": "What is pre-charting?",
   "opts": [
    "Flag it and initiate approved records retrieval",
    "Organizing existing records for clinician review",
    "Reason for visit and relevant prior cardiovascular history",
    "No, do not independently diagnose"
   ],
   "answer": 1,
   "why": "Organizing existing records for clinician review"
  },
  {
   "id": "SHW-208-Q02",
   "q": "May a VA create a new diagnosis during pre-charting?",
   "opts": [
    "Flag discrepancies for clinician reconciliation",
    "Identifying where a summarized fact came from",
    "No, do not independently diagnose",
    "To provide chronology and source context"
   ],
   "answer": 2,
   "why": "No, do not independently diagnose"
  },
  {
   "id": "SHW-208-Q03",
   "q": "Why record dates of prior echocardiograms?",
   "opts": [
    "To alert the clinician to incomplete or upcoming work",
    "To provide chronology and source context",
    "Flag it and initiate approved records retrieval",
    "No, only report documented measurements"
   ],
   "answer": 1,
   "why": "To provide chronology and source context"
  },
  {
   "id": "SHW-208-Q04",
   "q": "What should be done when a prior PCI report is missing?",
   "opts": [
    "Flag it and initiate approved records retrieval",
    "When it is accurate, sourced and missing items are flagged",
    "Reason for visit and relevant prior cardiovascular history",
    "Identifying where a summarized fact came from"
   ],
   "answer": 0,
   "why": "Flag it and initiate approved records retrieval"
  },
  {
   "id": "SHW-208-Q05",
   "q": "What is source attribution in a pre-chart?",
   "opts": [
    "Identifying where a summarized fact came from",
    "No, only report documented measurements",
    "Flag discrepancies for clinician reconciliation",
    "Organizing existing records for clinician review"
   ],
   "answer": 0,
   "why": "Identifying where a summarized fact came from"
  },
  {
   "id": "SHW-208-Q06",
   "q": "Should a VA infer ejection fraction from symptoms?",
   "opts": [
    "Reason for visit and relevant prior cardiovascular history",
    "No, only report documented measurements",
    "No, do not independently diagnose",
    "To alert the clinician to incomplete or upcoming work"
   ],
   "answer": 1,
   "why": "No, only report documented measurements"
  },
  {
   "id": "SHW-208-Q07",
   "q": "What is a useful structured pre-chart element?",
   "opts": [
    "Flag discrepancies for clinician reconciliation",
    "Reason for visit and relevant prior cardiovascular history",
    "When it is accurate, sourced and missing items are flagged",
    "To provide chronology and source context"
   ],
   "answer": 1,
   "why": "Reason for visit and relevant prior cardiovascular history"
  },
  {
   "id": "SHW-208-Q08",
   "q": "How should conflicting medication lists be handled?",
   "opts": [
    "Organizing existing records for clinician review",
    "Flag it and initiate approved records retrieval",
    "To alert the clinician to incomplete or upcoming work",
    "Flag discrepancies for clinician reconciliation"
   ],
   "answer": 3,
   "why": "Flag discrepancies for clinician reconciliation"
  },
  {
   "id": "SHW-208-Q09",
   "q": "Why check pending diagnostic studies?",
   "opts": [
    "When it is accurate, sourced and missing items are flagged",
    "Identifying where a summarized fact came from",
    "To alert the clinician to incomplete or upcoming work",
    "No, do not independently diagnose"
   ],
   "answer": 2,
   "why": "To alert the clinician to incomplete or upcoming work"
  },
  {
   "id": "SHW-208-Q10",
   "q": "When is a pre-chart ready for review?",
   "opts": [
    "No, only report documented measurements",
    "Organizing existing records for clinician review",
    "To provide chronology and source context",
    "When it is accurate, sourced and missing items are flagged"
   ],
   "answer": 3,
   "why": "When it is accurate, sourced and missing items are flagged"
  }
 ],
 "SHW-209": [
  {
   "id": "SHW-209-Q01",
   "q": "What should happen to an unresolved task at end of day?",
   "opts": [
    "Follow the current urgent escalation protocol",
    "Notify supervisor and prioritize by approved protocol",
    "Assign owner, status, next action and due date",
    "Stop, correct safely and report according to protocol"
   ],
   "answer": 2,
   "why": "Assign owner, status, next action and due date"
  },
  {
   "id": "SHW-209-Q02",
   "q": "How should a wrong-patient near miss be handled in simulation?",
   "opts": [
    "To detect errors and validate quality",
    "Stop, correct safely and report according to protocol",
    "When the receiving owner and required next steps are confirmed",
    "Test prioritization and accuracy across simultaneous workflows"
   ],
   "answer": 1,
   "why": "Stop, correct safely and report according to protocol"
  },
  {
   "id": "SHW-209-Q03",
   "q": "What is the purpose of a mixed-queue simulation?",
   "opts": [
    "A serious privacy, security, patient-safety or integrity violation",
    "Test prioritization and accuracy across simultaneous workflows",
    "Refuse to fabricate and escalate",
    "Follow the current urgent escalation protocol"
   ],
   "answer": 1,
   "why": "Test prioritization and accuracy across simultaneous workflows"
  },
  {
   "id": "SHW-209-Q04",
   "q": "What should happen if an urgent message appears during scheduling?",
   "opts": [
    "Demonstrate safe, accurate and closed-loop performance",
    "To detect errors and validate quality",
    "Notify supervisor and prioritize by approved protocol",
    "Follow the current urgent escalation protocol"
   ],
   "answer": 3,
   "why": "Follow the current urgent escalation protocol"
  },
  {
   "id": "SHW-209-Q05",
   "q": "Why audit a sample of completed tasks?",
   "opts": [
    "Assign owner, status, next action and due date",
    "When the receiving owner and required next steps are confirmed",
    "A serious privacy, security, patient-safety or integrity violation",
    "To detect errors and validate quality"
   ],
   "answer": 3,
   "why": "To detect errors and validate quality"
  },
  {
   "id": "SHW-209-Q06",
   "q": "What is a critical failure in simulation?",
   "opts": [
    "Stop, correct safely and report according to protocol",
    "Notify supervisor and prioritize by approved protocol",
    "A serious privacy, security, patient-safety or integrity violation",
    "Refuse to fabricate and escalate"
   ],
   "answer": 2,
   "why": "A serious privacy, security, patient-safety or integrity violation"
  },
  {
   "id": "SHW-209-Q07",
   "q": "What is the right response when workload exceeds safe capacity?",
   "opts": [
    "Test prioritization and accuracy across simultaneous workflows",
    "Demonstrate safe, accurate and closed-loop performance",
    "Notify supervisor and prioritize by approved protocol",
    "When the receiving owner and required next steps are confirmed"
   ],
   "answer": 2,
   "why": "Notify supervisor and prioritize by approved protocol"
  },
  {
   "id": "SHW-209-Q08",
   "q": "When can a forwarded task be considered closed?",
   "opts": [
    "Refuse to fabricate and escalate",
    "When the receiving owner and required next steps are confirmed",
    "Follow the current urgent escalation protocol",
    "Assign owner, status, next action and due date"
   ],
   "answer": 1,
   "why": "When the receiving owner and required next steps are confirmed"
  },
  {
   "id": "SHW-209-Q09",
   "q": "What should a trainee do when a simulated payer asks for invented facts?",
   "opts": [
    "Refuse to fabricate and escalate",
    "To detect errors and validate quality",
    "Stop, correct safely and report according to protocol",
    "Demonstrate safe, accurate and closed-loop performance"
   ],
   "answer": 0,
   "why": "Refuse to fabricate and escalate"
  },
  {
   "id": "SHW-209-Q10",
   "q": "What is the goal of final workflow simulation?",
   "opts": [
    "Assign owner, status, next action and due date",
    "Test prioritization and accuracy across simultaneous workflows",
    "Demonstrate safe, accurate and closed-loop performance",
    "A serious privacy, security, patient-safety or integrity violation"
   ],
   "answer": 2,
   "why": "Demonstrate safe, accurate and closed-loop performance"
  }
 ],
 "SHW-210": [
  {
   "id": "SHW-210-Q01",
   "q": "What authorizes a trainee to begin supervised live work?",
   "opts": [
    "No, observed practical competency and sign-off are required",
    "No, certification is internal and not professional licensure",
    "Monitor quality after initial certification",
    "Completed prerequisite gates and explicit role-based approval"
   ],
   "answer": 3,
   "why": "Completed prerequisite gates and explicit role-based approval"
  },
  {
   "id": "SHW-210-Q02",
   "q": "Does a passing quiz alone certify production readiness?",
   "opts": [
    "To verify safe performance before greater autonomy",
    "Accuracy, identity verification, routing and escalation",
    "No, observed practical competency and sign-off are required",
    "When performance falls below standard or a critical error occurs"
   ],
   "answer": 2,
   "why": "No, observed practical competency and sign-off are required"
  },
  {
   "id": "SHW-210-Q03",
   "q": "What should the supervisor review during initial live work?",
   "opts": [
    "Monitor quality after initial certification",
    "Authorized client and Songdel supervisors under access policy",
    "Accuracy, identity verification, routing and escalation",
    "Role, observed skills, scores, supervisor and date"
   ],
   "answer": 2,
   "why": "Accuracy, identity verification, routing and escalation"
  },
  {
   "id": "SHW-210-Q04",
   "q": "What is the purpose of a 30-day QA plan?",
   "opts": [
    "Stop and escalate to authorized staff",
    "Monitor quality after initial certification",
    "No, certification is internal and not professional licensure",
    "When performance falls below standard or a critical error occurs"
   ],
   "answer": 1,
   "why": "Monitor quality after initial certification"
  },
  {
   "id": "SHW-210-Q05",
   "q": "When should a trainee be returned to remediation?",
   "opts": [
    "Role, observed skills, scores, supervisor and date",
    "To verify safe performance before greater autonomy",
    "Completed prerequisite gates and explicit role-based approval",
    "When performance falls below standard or a critical error occurs"
   ],
   "answer": 3,
   "why": "When performance falls below standard or a critical error occurs"
  },
  {
   "id": "SHW-210-Q06",
   "q": "What should be documented in competency sign-off?",
   "opts": [
    "No, observed practical competency and sign-off are required",
    "Authorized client and Songdel supervisors under access policy",
    "No, certification is internal and not professional licensure",
    "Role, observed skills, scores, supervisor and date"
   ],
   "answer": 3,
   "why": "Role, observed skills, scores, supervisor and date"
  },
  {
   "id": "SHW-210-Q07",
   "q": "Can a certified VA independently practice medicine?",
   "opts": [
    "To verify safe performance before greater autonomy",
    "Accuracy, identity verification, routing and escalation",
    "Stop and escalate to authorized staff",
    "No, certification is internal and not professional licensure"
   ],
   "answer": 3,
   "why": "No, certification is internal and not professional licensure"
  },
  {
   "id": "SHW-210-Q08",
   "q": "Why progressively increase live workload?",
   "opts": [
    "Monitor quality after initial certification",
    "To verify safe performance before greater autonomy",
    "Authorized client and Songdel supervisors under access policy",
    "Completed prerequisite gates and explicit role-based approval"
   ],
   "answer": 1,
   "why": "To verify safe performance before greater autonomy"
  },
  {
   "id": "SHW-210-Q09",
   "q": "Who approves access to additional EHR functions?",
   "opts": [
    "When performance falls below standard or a critical error occurs",
    "Authorized client and Songdel supervisors under access policy",
    "Stop and escalate to authorized staff",
    "No, observed practical competency and sign-off are required"
   ],
   "answer": 1,
   "why": "Authorized client and Songdel supervisors under access policy"
  },
  {
   "id": "SHW-210-Q10",
   "q": "What should happen when a live task exceeds trainee scope?",
   "opts": [
    "Completed prerequisite gates and explicit role-based approval",
    "Stop and escalate to authorized staff",
    "Role, observed skills, scores, supervisor and date",
    "Accuracy, identity verification, routing and escalation"
   ],
   "answer": 1,
   "why": "Stop and escalate to authorized staff"
  }
 ]
};
