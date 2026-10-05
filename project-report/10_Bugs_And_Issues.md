# 10. Bugs & Known Issues Register

## Categorized Defect Log

### A. Critical Security & Logic Bugs (Priority: P0 - Urgent)

#### Bug P0-01: Plaintext Password Checking for Admins
- **Location**: `com.greenwood.school_erp.modules.admin.service.AdminService.java#L27`
- **Description**: `!admin.get().getPassword().equals(request.getPassword())` compares administrative passwords as unhashed plaintext strings.
- **Impact**: Critical security breach; admin credentials stored in database without BCrypt hashing.

#### Bug P0-02: Public Unauthenticated Access to Student Endpoints
- **Location**: `com.greenwood.school_erp.config.SecurityConfig.java#L29`
- **Description**: `/api/students` is configured under `.permitAll()`.
- **Impact**: Any unauthenticated actor can read, search, and insert student records.

#### Bug P0-03: Sensitive Password Exposure in User Endpoint
- **Location**: `com.greenwood.school_erp.modules.authentication.controller.AuthController.java#L22`
- **Description**: `getAllUsers()` returns `List<User>` raw entity objects directly over HTTP JSON responses.
- **Impact**: Exposes hashed BCrypt password strings of all registered users to any caller.

#### Bug P0-04: Destructive Multi-Execution Password Encryptor
- **Location**: `com.greenwood.school_erp.modules.authentication.service.AuthService.java#L60`
- **Description**: `encryptAllPasswords()` re-encodes existing password fields without checking if they are already BCrypt hashes.
- **Impact**: Calling this endpoint multiple times double-hashes passwords, permanently locking out all system users.

---

### B. Compile & Runtime Defects (Priority: P1 - High)

#### Bug P1-01: Empty Source File Crash in Mobile Settings
- **Location**: `school_erp_mobile/lib/features/settings/presentation/screens/setting_screen.dart`
- **Description**: File is completely empty (0 lines).
- **Impact**: Importing or navigating to `SettingScreen` throws Dart runtime syntax / compilation failure.

#### Bug P1-02: Empty DTO File in Admin Package
- **Location**: `school-erp/src/main/java/com/greenwood/school_erp/modules/admin/dto/response/LoginUserResponse.java`
- **Description**: File contains 0 lines of code.

#### Bug P1-03: Async Context Usage Across Async Gaps in Flutter
- **Location**: `school_erp_mobile/lib/features/auth/presentation/screens/login_screen.dart#L199, L213, L225`
- **Description**: Navigator calls use `BuildContext` after `await` operations without checking `if (!mounted) return;`.
- **Impact**: Potential widget tree crash if the screen is unmounted before the async HTTP call resolves.

---

### C. Compiler & Linter Warnings (Priority: P2 - Medium)

#### Warning P2-01: Lombok Builder Default Value Overrides
- **Location**: `Student.java` (lines 54, 66, 69) and `StudentRequest.java` (lines 35, 43)
- **Description**: Compiler warning: `@Builder will ignore the initializing expression entirely`.
- **Impact**: Default values (`nationality = "Indian"`, `isActive = true`) are set to `null` or `false` when instantiated via `.builder()`.

#### Warning P2-02: Flutter Deprecated Method Warnings
- **Location**: `dashboard_screen.dart` (L331) and `profile_screen.dart` (L115, L168)
- **Description**: `'withOpacity' is deprecated and shouldn't be used`.
- **Fix**: Replace with `.withValues()`.
