# 11. Feature Gap Report

## Feature Gap Matrix (Industry Standard ERP vs Current System)

| Feature Category | Required Enterprise Capability | Currently Implemented | Gap Status | Priority Level |
| :--- | :--- | :--- | :---: | :---: |
| **Authentication** | Multi-Factor Auth, JWT Access/Refresh tokens, Password Reset | Basic credentials matching, no JWT | **Critical Gap** | **HIGH** |
| **RBAC Permissions** | Role & Permission matrix (Admin, Principal, Teacher, Parent, Student) | Hardcoded `ROLE` string without permission checks | **Major Gap** | **HIGH** |
| **Student Lifecycle** | Admission -> Section Allocation -> Promotion -> Alumni Transfer | Basic creation & single record view | **Partial Gap** | **MEDIUM** |
| **Teacher Portal** | Profile, Subject Assignment, Class Ownership, Leave Request | Completely missing | **Total Gap** | **HIGH** |
| **Parent Portal** | Multi-child switching, fee receipt download, live attendance | Static dashboard UI shell | **Major Gap** | **HIGH** |
| **Attendance Engine** | Daily RFID / Manual marking, SMS/Email alerts to absentees | Static mobile calendar UI | **Major Gap** | **HIGH** |
| **Fees & Finance** | Custom Fee Heads, Online Payment Gateway, Invoice & Receipt PDF | Completely missing | **Total Gap** | **HIGH** |
| **Exams & Grading** | Exam Schedule, Marks Entry, CCEA / GPA Grade Calculation | Completely missing | **Total Gap** | **HIGH** |
| **Timetable Builder** | Conflict-free room and teacher auto-scheduling | Completely missing | **Total Gap** | **MEDIUM** |
| **Homework Engine** | Subject-wise assignment upload, online submission, evaluation | Static list UI shell | **Major Gap** | **MEDIUM** |
| **Noticeboard & SMS** | Circular broadcasting, Push Notifications via Firebase (FCM) | Completely missing | **Total Gap** | **MEDIUM** |
| **Transport & Fleet** | Route mapping, Vehicle tracking, Driver assignment | Completely missing | **Total Gap** | **LOW** |
| **Library Management** | Book cataloging, Issue/Return tracking, Fine calculation | Completely missing | **Total Gap** | **LOW** |
| **Hostel & Mess** | Room allocation, Hostel fee tracking, Mess attendance | Completely missing | **Total Gap** | **LOW** |
| **Payroll & HR** | Salary slips, Deduction rules, Leave management for staff | Completely missing | **Total Gap** | **MEDIUM** |
| **Reports & Analytics** | Graphical Dashboards, Export to Excel/PDF for all modules | Static admin cards | **Major Gap** | **HIGH** |
