# 01. Project Overview

## 1. Project Identification
- **Project Name**: Greenwood School ERP (Enterprise Resource Planning System)
- **Root Repository Path**: `w:\ERP`
- **Current Version**: `v0.0.1-SNAPSHOT` (Pre-Alpha / Foundation Setup Phase)
- **Audit Date**: August 7, 2026
- **Auditor Role**: Principal Software Architect & Lead Enterprise Auditor

---

## 2. Business Objectives & Purpose
The Greenwood School ERP is designed as a centralized, multi-tenant capable educational management platform. Its goal is to replace fragmented manual workflows with automated, real-time digital processes across school operations:
- **Administrative Operations**: Centralized student lifecycle management, fee collection, staff payroll, and institutional configuration.
- **Academic Management**: Attendance tracking, examination grading, homework assignment, timetable scheduling, and report card generation.
- **Communication & Portal Visibility**: Dedicated web portal for administrators/staff and cross-platform mobile application (Android/iOS/Web) for parents and students.

---

## 3. Target Users & Access Roles
| Role | Platform Access | Primary Scope & Functionality |
| :--- | :--- | :--- |
| **Super Admin / Principal** | Web Admin | Full system governance, staff management, financial reports, system configuration. |
| **School Administrator** | Web Admin | Student admissions, fee management, timetable setup, staff attendance. |
| **Teacher / Educator** | Web Admin & Mobile | Daily attendance marking, homework creation, exam mark entry, class notices. |
| **Parent** | Mobile App | Child fee payment, attendance tracking, homework review, noticeboard alerts. |
| **Student** | Mobile App | View class schedules, submit homework, view exam results, access library. |

---

## 4. Problem Statement & Current Challenges
1. **Disconnected Ecosystem**: Previous operations relied on fragmented manual registers or disparate software tools.
2. **Lack of Real-time Parent Transparency**: Parents had no instant digital visibility into child attendance or fee dues.
3. **Incomplete Early-Stage Codebase**: The project is currently in early foundation stage (~18.5% completion) with core security, database relationships, and frontend integration incomplete.

---

## 5. Comprehensive Technology Stack

### A. Backend Tier (`school-erp`)
- **Language**: Java 17 (OpenJDK)
- **Framework**: Spring Boot 4.1.0 (Spring Starter WebMVC, Spring Data JPA, Spring Security, Spring Starter Validation, Spring Starter Actuator)
- **Build Tool**: Apache Maven (`mvnw` wrapper included)
- **Database Engine**: PostgreSQL (Target database: `school_erp`)
- **ORM / Persistence**: Hibernate / JPA
- **Boilerplate Reduction**: Project Lombok
- **Security Protocols**: BCrypt Password Hashing (JWT Security Filter pending implementation)

### B. Web Admin Frontend (`school-erp-admin`)
- **Framework**: Next.js 15.0 (App Router Architecture)
- **Language**: TypeScript 5.x
- **UI Library & Components**: React 19, Tailwind CSS 3.4, PostCSS
- **Iconography**: Lucide React Icons (`lucide-react`)
- **State & Data Fetching**: Standard React State / Native `fetch` (State Management library pending)

### C. Mobile Application (`school_erp_mobile`)
- **Framework**: Flutter SDK (Cross-platform Android / iOS / Web / Desktop)
- **Language**: Dart 3.x
- **UI Design System**: Material 3 Design
- **Local Storage**: `shared_preferences` (Session & token persistence)
- **HTTP Client**: Dart `http` package
- **Theme**: Custom AppTheme with primary teal/indigo styling

---

## 6. Project Size & Metrics Summary

| Metric | Backend (`school-erp`) | Web Admin (`school-erp-admin`) | Mobile App (`school_erp_mobile`) | Total Ecosystem |
| :--- | :---: | :---: | :---: | :---: |
| **Total Files** | 62 | 25 | 193 | **280 Files** |
| **Source Code Files** | 26 (.java) | 9 (.tsx/.ts) | 23 (.dart) | **58 Source Files** |
| **Total Lines of Code (LOC)** | 9,219 | 7,512 | 16,442 | **33,173 LOC** |
| **Core Source LOC** | ~1,100 Java LOC | ~450 TSX LOC | ~1,700 Dart LOC | **~3,250 Core LOC** |
| **API Endpoints Implemented** | 7 Endpoints | - | 1 Service Call | **7 APIs** |
| **Database Entities** | 3 Entities | - | - | **3 Entities** |
| **UI Screens / Pages** | - | 3 Pages | 7 Active Screens | **10 Views** |

---

## 7. Current Project Status & Health Indicator
- **Overall Completion**: **18.5%**
- **Status Summary**: Foundation setup completed. Security layer, JWT validation, database migrations, and 16 out of 19 core ERP modules remain unbuilt or mock-only.
- **Build Status**: 
  - Backend (`.\mvnw.cmd test-compile`): **PASSING** (With 5 Lombok Builder warnings)
  - Admin Web (`npx tsc --noEmit`): **PASSING** (0 Type errors)
  - Mobile App (`dart analyze`): **24 Issues** (2 Warnings, 22 Lint Info notices)
