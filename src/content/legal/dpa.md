---
title: Data Processing Agreement
description: The NSpark, Inc. Data Processing Agreement for the NForce platform, including the EU Standard Contractual Clauses (Module Two) and Annexes I to III.
effective: July 16th, 2026
---

This Data Processing Agreement (this "DPA") forms part of the agreement between NSpark, Inc. ("NSpark", the "Processor") and the customer identified in the applicable services agreement or subscription (the "Customer", the "Controller"), governing NSpark's provision of the NForce platform (the "Services"). It is incorporated into our [Terms of Service](/terms-of-service) and applies where NSpark processes personal data on the Customer's behalf.

## 1. Definitions

- "Data Protection Law" means all applicable laws relating to the processing of personal data, including Regulation (EU) 2016/679 (the "GDPR") and, where applicable, the UK GDPR, the Swiss FADP, the Brazilian LGPD, and applicable US state privacy laws.
- "Personal Data", "Controller", "Processor", "Data Subject", "Processing" and "Personal Data Breach" have the meanings given in the GDPR.
- "Sub-processor" means any third party engaged by NSpark to process Personal Data on behalf of the Customer.
- "SCCs" means the Standard Contractual Clauses annexed to European Commission Implementing Decision (EU) 2021/914.

## 2. Roles and Scope

The Customer is the Controller and NSpark is the Processor in respect of Personal Data processed in connection with the Services. The subject matter, nature, purpose and duration of the processing, and the categories of Data Subjects and Personal Data, are set out in Annex I.

## 3. Processing Instructions

- NSpark shall process Personal Data only on the Customer's documented instructions, including with regard to transfers, unless required to do otherwise by law (in which case NSpark shall, where legally permitted, inform the Customer before processing).
- The services agreement, together with this DPA and the Customer's use of the Services, constitute the Customer's documented instructions.
- NSpark shall inform the Customer if, in its opinion, an instruction infringes Data Protection Law.
- NSpark does not use Customer Personal Data to train, develop or improve any generalised artificial-intelligence or machine-learning model.

## 4. Confidentiality

NSpark ensures that persons authorised to process Personal Data are bound by an appropriate obligation of confidentiality.

## 5. Security

NSpark implements appropriate technical and organisational measures to ensure a level of security appropriate to the risk, as described in Annex II, taking into account Article 32 GDPR.

## 6. Sub-processors

- The Customer grants NSpark general authorisation to engage Sub-processors. The current Sub-processors are listed at [nforce.ai/subprocessors](/subprocessors) and in Annex III below.
- NSpark will inform the Customer of any intended addition or replacement of a Sub-processor, giving the Customer not less than thirty (30) days to object on reasonable data-protection grounds. If the parties cannot resolve an objection, the Customer may terminate the affected Services.
- NSpark imposes on each Sub-processor data-protection obligations no less protective than those in this DPA, and remains fully liable to the Customer for each Sub-processor's performance.

## 7. Data Subject Rights

Taking into account the nature of the processing, NSpark assists the Customer by appropriate technical and organisational measures, insofar as possible, in fulfilling the Customer's obligation to respond to requests to exercise Data Subject rights under Chapter III GDPR.

## 8. Assistance

NSpark assists the Customer in ensuring compliance with its obligations under Articles 32 to 36 GDPR (security, breach notification, data-protection impact assessments and prior consultation), taking into account the nature of the processing and the information available to NSpark.

## 9. Personal Data Breach

NSpark shall notify the Customer without undue delay, and in any event within seventy-two (72) hours, after becoming aware of a Personal Data Breach affecting the Customer's Personal Data, and shall provide information reasonably available to it to enable the Customer to meet its own notification obligations.

## 10. Deletion and Return

On termination or expiry of the Services, NSpark shall, at the Customer's election, delete or return all Personal Data and delete existing copies, unless storage is required by law. The Customer may export its data for thirty (30) days following termination.

## 11. Audit

NSpark makes available to the Customer all information reasonably necessary to demonstrate compliance with Article 28 GDPR and allows for and contributes to audits, including inspections, conducted by the Customer or an auditor mandated by the Customer, on reasonable prior notice and no more than once per year (save where required by a supervisory authority or following a Personal Data Breach).

## 12. International Transfers

NSpark processes and hosts Personal Data in the United States (Amazon Web Services, region us-east-1) and engages Sub-processors located in the United States and elsewhere.

Where a transfer of Personal Data from the European Economic Area, the United Kingdom or Switzerland constitutes a restricted transfer, the SCCs (Module Two: Controller to Processor) are incorporated into this DPA by reference and form an integral part of it, completed as follows:

- **Clause 7 (docking clause):** applies.
- **Clause 9 (sub-processors):** Option 2 (general written authorisation), with the notice period in section 6 above.
- **Clause 11 (redress):** the optional independent dispute-resolution provision does not apply.
- **Clause 17 (governing law):** the law of Ireland.
- **Clause 18 (forum):** the courts of Ireland.
- **Annexes I, II and III to the SCCs:** the information set out in the Annexes below.

For transfers from the United Kingdom, the SCCs are supplemented by the UK International Data Transfer Addendum (issued under s.119A DPA 2018). For transfers from Switzerland, references to the GDPR are read as references to the Swiss FADP, and the Swiss Federal Data Protection and Information Commissioner is the competent supervisory authority.

NSpark implements supplementary measures (including encryption in transit and at rest and access controls, as described in Annex II) to protect transferred Personal Data.

## 13. General

In the event of a conflict between this DPA and the services agreement, this DPA prevails in respect of the processing of Personal Data. Where the SCCs conflict with this DPA, the SCCs prevail. This DPA takes effect on the effective date of the services agreement and continues for as long as NSpark processes Personal Data on the Customer's behalf.

## Annex I — Description of the Processing

- **Controller:** the Customer, as identified in the services agreement.
- **Processor:** NSpark, Inc., 8 The Green #19869, Dover, DE 19901, United States.
- **Subject matter:** provision of the NForce AI operations platform.
- **Duration:** the term of the services agreement, plus the deletion/return period in section 10.
- **Nature and purpose:** hosting, storage, processing and analysis of Customer data to provide AI agents and workflow automation for sales, pre-sales and customer-support use cases; including conversational AI (chat, email, voice), CRM enrichment and document processing.
- **Categories of Data Subjects:** the Customer's customers, prospects, leads, contacts, end users and personnel.
- **Categories of Personal Data:** identification and contact data (name, email address, telephone number, company, job title); communications content (chat, email and call transcripts and recordings); CRM records and associated metadata; usage and technical data (IP address, device/browser data, log data).
- **Special categories of data:** none. The Services are not intended for, and the Customer shall not submit, special categories of Personal Data (Article 9 GDPR) or criminal-offence data.
- **Frequency of transfer:** continuous, for the duration of the Services.
- **Retention:** for the term, and thereafter in accordance with section 10.

## Annex II — Technical and Organisational Measures

- **Hosting:** Amazon Web Services (us-east-1). Application servers run on Amazon EC2; data is stored in Amazon RDS (Aurora PostgreSQL) and Amazon S3.
- **Encryption in transit:** TLS for all application endpoints.
- **Encryption at rest:** RDS storage encryption enabled; Amazon S3 default AES-256 encryption; application-level AES-256 encryption of stored tenant credentials.
- **Access control:** token/JWT-based authentication and authorisation; passwords hashed using scrypt; access limited to authorised personnel; credentials held in a dedicated password manager.
- **Backups:** automated database backups with 7-day retention.
- **Application security:** prompt-injection protection on AI interactions; optional PII-masking in document ingestion.
- **Organisational:** personnel and contractors bound by written confidentiality and intellectual-property agreements; private source-code repositories.
- Multi-factor authentication enabled on the cloud administrative account.

## Annex III — Sub-processors

The current list of Sub-processors is maintained at [nforce.ai/subprocessors](/subprocessors).

## Contact

Questions about this DPA, or to request a counter-signed copy, contact us at:

- Email: [contact@nforce.ai](mailto:contact@nforce.ai)
- Address: NSpark, Inc., 8 The Green #19869, Dover, DE 19901, United States
