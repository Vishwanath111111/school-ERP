# 14. Comprehensive Risk Assessment

## Risk Evaluation Matrix

```
   HIGH LIKELIHOOD  │  [Security Risk 01]    [Security Risk 02]
                    │  Plaintext Passwords    Public Student API
   MED LIKELIHOOD   │  [Arch Risk 01]        [Deploy Risk 01]
                    │  No DB Migrations      Missing Prod Config
   LOW LIKELIHOOD   │  [Scalability Risk]    [Maintainability]
                    │  Unpaged Queries       Duplicate Mobile Auth
                    └──────────────────────────────────────────────
                        MEDIUM IMPACT           HIGH IMPACT
```

---

## Identified Project Risks & Mitigation Strategies

| Risk Category | Identified Threat | Severity | Likelihood | Impact | Proposed Mitigation Strategy |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Security Risk** | Admin passwords stored & matched in **plaintext**. | **CRITICAL** | High | Critical | Immediately hash admin passwords using BCrypt; refactor `AdminService.java`. |
| **Security Risk** | Student APIs (`/api/students`) accessible without authentication. | **HIGH** | High | High | Remove `/api/students` from `permitAll()`; enforce JWT Bearer token authentication. |
| **Security Risk** | `getAllUsers()` API exposes raw BCrypt hashes in JSON response. | **HIGH** | High | High | Map `User` entity to `UserResponseDTO` excluding sensitive fields. |
| **Architectural Risk** | Absence of database migration scripts (Flyway/Liquibase). | **HIGH** | High | High | Introduce Flyway migrations (`db/migration/V1__init.sql`); disable `hibernate.ddl-auto=update` in prod. |
| **Performance Risk** | Unpaged queries (`studentRepository.findAll()`) loading full tables. | **MEDIUM** | High | Medium | Implement Spring Data `Pageable` across all list endpoints. |
| **Maintainability Risk** | Dual redundant auth packages in Flutter app (`lib/authentication` vs `lib/features/auth`). | **MEDIUM** | High | Medium | Delete legacy `lib/authentication/` directory; standardize on feature-first pattern. |
| **Deployment Risk** | `application-prod.properties` is completely empty. | **HIGH** | Medium | High | Define production environment variables for DB credentials, port, and SSL certificates. |
| **Maintainability Risk** | Completely empty 0-byte file `setting_screen.dart` in mobile app. | **MEDIUM** | High | Medium | Implement proper Flutter widget or placeholder layout. |
