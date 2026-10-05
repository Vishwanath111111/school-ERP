# 09. Code Quality & Architectural Audit

## 1. Evaluation Against SOLID Principles

| Principle | Assessment | Observations & Violations |
| :--- | :---: | :--- |
| **Single Responsibility Principle (SRP)** | **Violated** | `AuthService.java` manages authentication AND contains a database migration utility (`encryptAllPasswords()`). `StudentService` handles mapping, persistence, and validation in single methods. |
| **Open/Closed Principle (OCP)** | **Violated** | Security configuration uses hardcoded list strings instead of extensible security policies or role-based permission mappers. |
| **Liskov Substitution Principle (LSP)** | **Compliant** | JPA Repositories extend `JpaRepository` cleanly without altering base behaviors. |
| **Interface Segregation Principle (ISP)** | **Violated** | Services do NOT implement service interfaces (`StudentServiceImpl` vs `StudentService`). Controllers inject concrete classes directly. |
| **Dependency Inversion Principle (DIP)** | **Violated** | Controllers rely on concrete service classes rather than interface abstractions. |

---

## 2. Evaluation Against DRY & Clean Code

1. **Duplicate Authentication Models in Mobile App**:
   - `lib/authentication/` and `lib/features/auth/` duplicate login models, services, and screens.
2. **Duplicate DTO Definitions in Backend**:
   - `LoginUserResponse.java` exists under `modules.authentication.dto.response` AND `modules.admin.dto.response` (where the admin version is an empty 0-byte file).
3. **Lombok Builder Configuration Warnings**:
   - Fields initialized inline in `Student.java` (`nationality = "Indian"`, `academicYear = "2024-2025"`, `isActive = true`) cause Lombok `@Builder` compiler warnings because Lombok overrides default values unless `@Builder.Default` is explicitly annotated.

---

## 3. Empty Files & Dead Code Inventory

| File Path | Component | Size / Lines | Impact & Recommendation |
| :--- | :--- | :---: | :--- |
| `school-erp/src/main/java/.../admin/dto/response/LoginUserResponse.java` | Backend | 0 Bytes (0 Lines) | **Dead Code**: Delete empty file or implement DTO. |
| `school-erp/src/main/resources/application-prod.properties` | Backend | 0 Bytes (0 Lines) | **Missing Config**: Populate production DB & server properties. |
| `school_erp_mobile/lib/features/settings/presentation/screens/setting_screen.dart` | Mobile App | 0 Bytes (0 Lines) | **Broken View**: Implemented empty file; causes screen rendering crash if navigated to. |

---

## 4. Security Risk Matrix

```
[HIGH RISK]   Plaintext Admin Password Storage (AdminService.java)
[HIGH RISK]   Public Access to Student Records (/api/students permitAll)
[HIGH RISK]   Data Exposure of BCrypt Hashes (/api/auth/users returns Entity)
[MEDIUM RISK] Destructive Re-encryption Endpoint (/api/auth/encrypt-passwords)
[MEDIUM RISK] Missing Rate Limiting / Brute-Force Protection on Login APIs
[LOW RISK]    CORS Configuration Allowing Credentials with Wildcard Headers
```
