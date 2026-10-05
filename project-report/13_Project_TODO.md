# 13. Project Master TODO Checklist

This document serves as the master execution checklist for developers continuing work on the Greenwood School ERP.

---

## 1. Security & Core Infrastructure
- [ ] **Dependencies**: Add `io.jsonwebtoken` (jjwt-api, jjwt-impl, jjwt-jackson) to `school-erp/pom.xml`.
- [ ] **JWT Provider**: Create `JwtTokenProvider.java` for token generation, validation, and claim parsing.
- [ ] **JWT Filter**: Implement `JwtAuthenticationFilter.java` extending `OncePerRequestFilter`.
- [ ] **Spring Security**: Update `SecurityConfig.java` to enforce JWT validation on all protected endpoints.
- [ ] **Password Security**: Refactor `AdminService.java` to use `PasswordEncoder.matches()` instead of plain text `.equals()`.
- [ ] **Exception Handling**: Create `GlobalExceptionHandler.java` with `@RestControllerAdvice`.
- [ ] **Response Standard**: Wrap all API outputs in `ApiResponse<T>` wrapper.
- [ ] **DB Migrations**: Add Flyway or Liquibase for database schema versioning.
- [ ] **Environment Config**: Populate `application-prod.properties` with environment variables.

---

## 2. Backend Module Development
- [ ] **Student CRUD**: Implement `PUT /api/students/{id}` and `DELETE /api/students/{id}` endpoints.
- [ ] **Student Pagination**: Refactor `getAllStudents()` to accept `Pageable` (`page`, `size`, `sort`).
- [ ] **Teacher Domain**: Create `Teacher` entity, `TeacherRepository`, `TeacherService`, and `TeacherController`.
- [ ] **Parent Domain**: Create `Parent` entity, linking parents to students via `@ManyToMany` or `@OneToMany`.
- [ ] **Class & Section**: Create `SchoolClass` and `Section` entities; refactor `Student` string fields to foreign key relations.
- [ ] **Attendance Engine**: Implement `Attendance` entity, `POST /api/attendance/mark`, and monthly summary queries.
- [ ] **Fees Engine**: Create `FeeHead`, `FeeStructure`, `FeeInvoice`, and `FeePayment` entities & controllers.
- [ ] **Homework Domain**: Create `Homework` entity with file attachment support (`FileStorageService`).

---

## 3. Web Admin Dashboard (`school-erp-admin`)
- [ ] **Auth Flow**: Build Login Page (`app/login/page.tsx`) storing JWT in HTTP-Only cookies or LocalStorage.
- [ ] **API Integration**: Create central API service wrapper (`lib/api.ts`) using `axios` or native `fetch` with Bearer auth headers.
- [ ] **State Management**: Integrate React Query (`@tanstack/react-query`) for cached server state fetching.
- [ ] **Student Modal**: Implement Add Student & Edit Student dialog forms with Zod validation.
- [ ] **Teacher Management View**: Create `app/dashboard/teachers/page.tsx`.
- [ ] **Attendance View**: Create `app/dashboard/attendance/page.tsx` for daily attendance entry.
- [ ] **Fees View**: Create `app/dashboard/fees/page.tsx` for collection & receipt generation.

---

## 4. Mobile Application (`school_erp_mobile`)
- [ ] **Clean Redundant Code**: Delete legacy `lib/authentication/` directory; consolidate into `lib/features/auth/`.
- [ ] **Fix Broken View**: Implement `lib/features/settings/presentation/screens/setting_screen.dart` widget.
- [ ] **Lint Fixes**: Guard all `BuildContext` uses across async gaps in `login_screen.dart` (`if (!context.mounted) return;`).
- [ ] **Deprecation Fixes**: Replace `.withOpacity()` with `.withValues()` in dashboard and profile screens.
- [ ] **Base URL Config**: Move base URL from hardcoded strings to `String.fromEnvironment()` or `.env` configuration.
- [ ] **Live API Integration**: Connect Flutter Login, Attendance, Homework, and Profile views to live Spring Boot endpoints.
