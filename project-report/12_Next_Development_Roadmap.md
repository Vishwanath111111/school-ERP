# 12. Next Development Roadmap

## Phased Execution Strategy (13-Week Timeline)

```mermaid
gantt
    title Greenwood School ERP Development Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Core Foundation
    Security & JWT Integration        :active, p1, 2026-08-10, 10d
    Global Exception & Validation     :p1_2, 2026-08-15, 4d
    Database Migrations (Flyway)      :p1_3, 2026-08-18, 4d
    section Phase 2: Academic Core
    Teacher & Parent Modules          :p2_1, 2026-08-24, 10d
    Class & Section Management       :p2_2, 2026-08-31, 7d
    Admin Web Integration             :p2_3, 2026-09-07, 7d
    section Phase 3: Daily Operations
    Attendance Engine & API           :p3_1, 2026-09-14, 10d
    Fees & Payment Gateway            :p3_2, 2026-09-21, 12d
    Homework & Mobile App Sync        :p3_3, 2026-09-28, 7d
    section Phase 4: Enterprise & Launch
    Exams & Report Cards              :p4_1, 2026-10-05, 10d
    Notices & Push Notifications      :p4_2, 2026-10-12, 7d
    Final Audit & Production Deploy   :p4_3, 2026-10-19, 7d
```

---

## Detailed Phase Breakdown

### Phase 1: Security & Core Infrastructure (Weeks 1 - 2)
- **Primary Objectives**: Secure backend APIs, implement JWT authentication, eliminate plaintext credentials, add global exception handling, and set up database migrations.
- **Tasks**:
  1. Add `io.jsonwebtoken` (JJWT) dependency to `pom.xml`.
  2. Implement `JwtTokenProvider`, `JwtAuthenticationFilter`, and `CustomUserDetailsService`.
  3. Hash admin passwords with BCrypt and fix `AdminService.java`.
  4. Implement `GlobalExceptionHandler.java` handling `ResourceNotFoundException`, `MethodArgumentNotValidException`, and `BadRequestException`.
  5. Delete empty files (`setting_screen.dart`, `LoginUserResponse.java` in admin DTO).
  6. Add Flyway migration scripts under `src/main/resources/db/migration/`.
- **Dependencies**: Spring Security, JJWT, Flyway.
- **Difficulty**: Medium | **Estimated Effort**: 2 Weeks (80 Hours).

### Phase 2: Core Academic & User Modules (Weeks 3 - 5)
- **Primary Objectives**: Implement Teacher, Parent, Class, and Section domains across backend, web admin, and mobile.
- **Tasks**:
  1. Create `Teacher`, `Parent`, `SchoolClass`, and `Section` entities with JPA relations.
  2. Implement complete CRUD APIs with pagination (`Pageable`).
  3. Build Next.js Admin views for Teachers, Parents, and Class allocation.
  4. Connect Next.js frontend to Spring Boot backend APIs using React Query / SWR.
- **Dependencies**: Phase 1 Security.
- **Difficulty**: Medium | **Estimated Effort**: 3 Weeks (120 Hours).

### Phase 3: Daily Operational Modules (Weeks 6 - 9)
- **Primary Objectives**: Implement Attendance, Fees & Finance, and Homework systems.
- **Tasks**:
  1. Build Attendance domain (`Attendance` entity, bulk attendance submission API, monthly summaries).
  2. Implement Fee Structure, Fee Discount, Invoice, and Stripe/Razorpay payment gateway integration.
  3. Complete Flutter Attendance & Homework integration.
- **Dependencies**: Phase 2 User Modules.
- **Difficulty**: High | **Estimated Effort**: 4 Weeks (160 Hours).

### Phase 4: Enterprise Modules, Reports & Deployment (Weeks 10 - 13)
- **Primary Objectives**: Implement Examinations, Noticeboard/Push Notifications, Transport/Library, Analytics, and Production CI/CD deployment.
- **Tasks**:
  1. Build Exam Gradebook, GPA calculator, and PDF Report Card generator.
  2. Integrate Firebase Cloud Messaging (FCM) for push notifications on mobile.
  3. Setup Docker containers (`Dockerfile`, `docker-compose.yml`) for PostgreSQL, Spring Boot backend, and Next.js frontend.
- **Dependencies**: Phase 3 Operations.
- **Difficulty**: High | **Estimated Effort**: 4 Weeks (160 Hours).
