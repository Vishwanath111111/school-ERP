# 05. API Documentation Audit

## Existing Backend APIs Summary
Total Implemented Endpoints: **7**

| # | HTTP Method | Endpoint Route | Controller Class | DTO Request / Response | Validation | Auth Required | Working Status |
| :-: | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| 1 | `POST` | `/api/auth/login` | `AuthController` | `LoginRequest` / `LoginResponse` | Missing | `permitAll()` | **Incomplete** (No JWT) |
| 2 | `GET` | `/api/auth/users` | `AuthController` | None / `List<User>` | None | Authenticated | **Security Flaw** (Exposes Passwords) |
| 3 | `GET` | `/api/auth/encrypt-passwords` | `AuthController` | None / `String` | None | Authenticated | **Broken** (Double Hashes) |
| 4 | `POST` | `/api/admin/login` | `AdminController` | `AdminLoginRequest` / `AdminLoginResponse` | Missing | `permitAll()` | **Incomplete** (Plaintext Password) |
| 5 | `POST` | `/api/students` | `StudentController` | `StudentRequest` / `StudentResponse` | `@Valid` | `permitAll()` | **Working** (Unsecured) |
| 6 | `GET` | `/api/students` | `StudentController` | None / `List<StudentResponse>` | None | `permitAll()` | **Working** (No Pagination) |
| 7 | `GET` | `/api/students/{id}` | `StudentController` | None / `StudentResponse` | None | `permitAll()` | **Working** (Unsecured) |

---

## Detailed Endpoint Specifications

### 1. User Login
- **Route**: `POST /api/auth/login`
- **Controller**: `com.greenwood.school_erp.modules.authentication.controller.AuthController`
- **Request Body**:
  ```json
  {
    "email": "user@school.com",
    "password": "rawPassword123"
  }
  ```
- **Response Payload (Success)**:
  ```json
  {
    "success": true,
    "message": "Login Successful",
    "data": {
      "id": 1,
      "email": "user@school.com"
    }
  }
  ```
- **Defects**: No JWT token returned in `data`. No `@Valid` annotation on `@RequestBody LoginRequest`.

### 2. Admin Login
- **Route**: `POST /api/admin/login`
- **Controller**: `com.greenwood.school_erp.modules.admin.controller.AdminController`
- **Defects**: Authenticates via `admin.getPassword().equals(request.getPassword())` comparing raw string against plain-text database column.

### 3. Create Student
- **Route**: `POST /api/students`
- **Controller**: `com.greenwood.school_erp.modules.students.controller.StudentController`
- **Request Payload (`StudentRequest`)**:
  `admissionNo`, `firstName`, `lastName`, `className`, `section`, `rollNo`, `house`, `dateOfBirth`, `bloodGroup`, `gender`, `parentEmail`, `parentPhone`, `address`.
- **Status**: Functionally creates student record in DB. Permitted publicly without token!

---

## Missing API Endpoints Inventory (High Level)
Over **60+ API endpoints** are currently missing across the 19 ERP modules:
- **Student Module**: `PUT /api/students/{id}`, `DELETE /api/students/{id}`, `GET /api/students/search`, `POST /api/students/bulk-import`.
- **Teacher Module**: `GET /api/teachers`, `POST /api/teachers`, `PUT /api/teachers/{id}`, `DELETE /api/teachers/{id}`.
- **Parent Module**: `GET /api/parents`, `POST /api/parents`, `GET /api/parents/{id}/students`.
- **Attendance Module**: `POST /api/attendance/mark`, `GET /api/attendance/student/{id}`, `GET /api/attendance/class/{classId}`.
- **Fees Module**: `GET /api/fees/structures`, `POST /api/fees/collect`, `GET /api/fees/receipt/{id}`.
