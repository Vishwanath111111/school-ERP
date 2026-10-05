# 03. Comprehensive Module Analysis

This document provides a detailed breakdown of all 19 functional modules required for an Enterprise School ERP.

---

## Module Index & Status Matrix

| # | Module Name | Backend Status | Admin Web Status | Mobile App Status | Overall Progress |
| :-: | :--- | :---: | :---: | :---: | :---: |
| 1 | **Authentication & Security** | Partial (50%) | Partial (20%) | Partial (40%) | **36.6%** |
| 2 | **Admin Management** | Basic (40%) | Partial (30%) | N/A | **35.0%** |
| 3 | **Student Management** | Functional CRUD (70%) | Table View (40%) | Profile View (30%) | **46.6%** |
| 4 | **Teacher Management** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 5 | **Parent Management** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 6 | **Attendance Management** | Missing (0%) | Missing (0%) | UI Mock (30%) | **10.0%** |
| 7 | **Fees & Finance** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 8 | **Examinations & Marks** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 9 | **Timetable & Schedule** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 10 | **Homework & Assignments** | Missing (0%) | Missing (0%) | UI Mock (20%) | **6.6%** |
| 11 | **Transport Management** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 12 | **Library Management** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 13 | **Hostel Management** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 14 | **Payroll & HR** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 15 | **Inventory & Assets** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 16 | **Admissions** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 17 | **Communication & Notices** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 18 | **Reports & Analytics** | Missing (0%) | Missing (0%) | Missing (0%) | **0.0%** |
| 19 | **Settings & System Config** | Missing (0%) | Missing (0%) | Empty File (0%) | **0.0%** |

---

## Detailed Analysis Per Module

### 1. Authentication & Security Module
- **Purpose**: Authenticate administrators, teachers, parents, and students; enforce role-based access control (RBAC); issue JWT tokens.
- **Current Status**: Partially Implemented.
- **Completed**: 36.6% | **Missing**: 63.4%
- **Files**:
  - Backend: `AuthController.java`, `AuthService.java`, `UserRepository.java`, `User.java`, `LoginRequest.java`, `LoginResponse.java`, `LoginUserResponse.java`, `SecurityConfig.java`, `PasswordConfig.java`
  - Mobile: `auth_service.dart`, `login_request.dart`, `login_response.dart`, `login_user.dart`, `login_screen.dart`, `splash_screen.dart`
- **Dependencies**: Spring Security, BCrypt, SharedPreferences.
- **Problems**:
  1. No JWT filter or JWT token generation implemented.
  2. Endpoint `/api/auth/users` returns all user entities including hashed passwords.
  3. Endpoint `/api/auth/encrypt-passwords` re-encrypts already-hashed passwords.
- **Recommendations**: Integrate `io.jsonwebtoken` (JJWT 0.12.x), implement `JwtTokenProvider` and `JwtAuthenticationFilter`, and remove dangerous administrative endpoints.

### 2. Admin Management Module
- **Purpose**: Manage school administrators, system settings, and administrative credentials.
- **Current Status**: Minimal Backend Endpoint & Admin Dashboard Shell.
- **Completed**: 35.0% | **Missing**: 65.0%
- **Files**:
  - Backend: `AdminController.java`, `AdminService.java`, `AdminRepository.java`, `Admin.java`, `AdminLoginRequest.java`, `AdminLoginResponse.java`
  - Admin Web: `app/dashboard/page.tsx`, `components/layout/Sidebar.tsx`
- **Problems**:
  1. `AdminService.java` compares admin passwords in **plaintext** (`!admin.get().getPassword().equals(...)`).
  2. File `LoginUserResponse.java` in package `modules.admin.dto.response` is 0 bytes (empty file).

### 3. Student Management Module
- **Purpose**: Manage student admissions, profiles, academic records, class assignments, and active status.
- **Current Status**: Core Backend CRUD + Admin Table + Mobile Profile View.
- **Completed**: 46.6% | **Missing**: 53.4%
- **Files**:
  - Backend: `StudentController.java`, `StudentService.java`, `StudentRepository.java`, `Student.java`, `StudentRequest.java`, `StudentResponse.java`
  - Admin Web: `app/dashboard/students/page.tsx`
  - Mobile: `profile_screen.dart`
- **Problems**:
  1. Backend lacks update (PUT/PATCH) and delete (DELETE) endpoints.
  2. Backend lacks pagination / sorting on `getAllStudents()`.
  3. Lombok `@Builder` warnings on initializing expressions.
  4. Admin web uses hardcoded mock array for table rendering instead of fetching from `/api/students`.

### 4. Attendance Management Module
- **Purpose**: Track daily student/teacher attendance, generate monthly reports, and send absent notifications to parents.
- **Current Status**: Mobile Frontend Mock Only (No Backend, No DB Entity).
- **Completed**: 10.0% | **Missing**: 90.0%
- **Files**:
  - Mobile: `attendance_screen.dart`
- **Problems**: No entity, repository, service, or API endpoint exists in backend.

### 5-19. Unbuilt Modules Overview (0% Completed)
- **Teacher Management**: Missing entities, controllers, services, admin UI.
- **Parent Management**: Missing entities, controllers, services, mobile link.
- **Fees & Finance**: Missing fee structure, invoice generation, payment gateway integration.
- **Examinations**: Missing exam schedules, gradebooks, report cards.
- **Timetable**: Missing schedule builder, room allocation, teacher assignment.
- **Homework**: Mobile UI stub exists (`homework_screen.dart`), missing backend.
- **Transport, Library, Hostel, Payroll, Inventory, Admissions, Notices, Reports, Settings**: Completely unbuilt across backend, admin web, and mobile app.
