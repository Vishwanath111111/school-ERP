# 08. Backend Architecture & Security Analysis

## 1. Package Structure & Architectural Integrity

The backend project `school-erp` strictly follows a Spring Boot modular package structure under `com.greenwood.school_erp`:

```
com.greenwood.school_erp
├── SchoolErpApplication.java (Main Entry Point)
├── common/
│   └── response/
│       └── ApiResponse.java (Standardized Response Wrapper)
├── config/
│   ├── PasswordConfig.java (BCryptPasswordEncoder Bean)
│   └── SecurityConfig.java (Spring Security & CORS Configuration)
└── modules/
    ├── admin/ (Admin Authentication & Service)
    ├── authentication/ (User Authentication & Management)
    └── students/ (Student Management CRUD)
```

---

## 2. Spring Beans, Controllers, Services & Repositories

### A. Controller Tier
- `AuthController`: Handles `/api/auth/login`, `/api/auth/users`, and `/api/auth/encrypt-passwords`.
- `AdminController`: Handles `/api/admin/login`.
- `StudentController`: Handles `POST /api/students`, `GET /api/students`, and `GET /api/students/{id}`.

### B. Service Tier
- `AuthService`: Validates user login credentials, matches BCrypt password hashes, and provides password encryption utilities.
- `AdminService`: Performs admin login validation.
- `StudentService`: Validates admission number uniqueness, maps requests to entities, and persists student records.

### C. Repository Tier
- `UserRepository`: Extends `JpaRepository<User, Long>`, provides `findByEmail(String email)`.
- `AdminRepository`: Extends `JpaRepository<Admin, Long>`, provides `findByEmail(String email)`.
- `StudentRepository`: Extends `JpaRepository<Student, Long>`, provides `existsByAdmissionNo(String admissionNo)`.

---

## 3. Security, Authentication & JWT Audit

```java
// Current SecurityConfig.java requestMatchers setup
.authorizeHttpRequests(auth -> auth
    .requestMatchers(
        "/api/admin/login",
        "/api/auth/login",
        "/api/students"
    ).permitAll()
    .anyRequest().authenticated()
)
```

### Critical Security Vulnerabilities Identified:
1. **Missing JWT Infrastructure**:
   - `pom.xml` lacks `io.jsonwebtoken` (JJWT) dependencies.
   - SecurityFilterChain does NOT register a `JwtAuthenticationFilter` prior to `UsernamePasswordAuthenticationFilter`.
2. **Unauthenticated Public Student API**:
   - `/api/students` is configured in `permitAll()`, allowing unauthenticated public read and write access to student personal records.
3. **Plaintext Admin Password Authentication**:
   - `AdminService.java` executes `!admin.get().getPassword().equals(request.getPassword())`, storing and comparing admin credentials in plain text.
4. **Data Leakage Vulnerability**:
   - `AuthController.java` endpoint `/api/auth/users` returns raw JPA `User` entity objects directly, exposing hashed user passwords in HTTP responses.

---

## 4. Exception Handling & Validation Audit

- **Input Validation**: `StudentController.java` utilizes `@Valid @RequestBody StudentRequest request`.
- **Global Exception Handling**: **COMPLETELY MISSING**.
  - `GlobalExceptionHandler.java` outlined in `backend_Foundation.md` has NOT been implemented.
  - Runtime exceptions (e.g., `"Admission number already exists"`, `"Student not found"`) throw generic `RuntimeException`, resulting in unformatted HTTP 500 responses with raw stack traces exposed to clients.
