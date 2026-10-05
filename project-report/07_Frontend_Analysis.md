# 07. Frontend Analysis (Web Admin & Mobile App)

## 1. Web Admin Application (`school-erp-admin`)

### A. Core Architecture & Routing
- **Framework**: Next.js 15.0 App Router Architecture with React 19 & TypeScript.
- **Routing Engine**: File-based router in `app/`.
- **Existing Page Tree**:
  - `app/page.tsx`: Root redirect / public landing page.
  - `app/layout.tsx`: Root HTML layout with Google Font configuration (Geist / Geist Mono).
  - `app/globals.css`: Global Tailwind CSS imports (`@tailwind base`, `@tailwind components`, `@tailwind utilities`).
  - `app/dashboard/layout.tsx`: Flexbox dashboard layout containing `Sidebar.tsx` and container wrapper.
  - `app/dashboard/page.tsx`: Dashboard overview with metric cards and recent activity.
  - `app/dashboard/students/page.tsx`: Student listing table with search input, class dropdown filter, and action buttons.

### B. Component Breakdown
- **Layout Components**:
  - `components/layout/Sidebar.tsx` (88 LOC): Sidebar navigation bar featuring active state matching, navigation links (Dashboard, Students, Teachers, Classes, Fees, Attendance, Settings), and logout button.
- **UI Components**:
  - `components/ui/Card.tsx` (14 LOC): Reusable wrapper component for metric cards.

### C. State Management & API Integration
- **State Management**: Local React `useState` hooks only. No global state manager (Redux Toolkit, Zustand, Context API) implemented.
- **API Integration**: Currently **0% Live Integration**. `app/dashboard/students/page.tsx` renders static dummy array data rather than executing `fetch('http://localhost:8080/api/students')`.

### D. Missing & Broken Admin Pages
- **Missing Pages**: Login Page (`app/login`), Teachers (`app/dashboard/teachers`), Parents, Attendance, Fees & Payment, Examinations, Timetable, Settings.
- **Broken Features**: Student addition form, edit modal, and delete action triggers are non-functional UI stubs.

---

## 2. Mobile Application (`school_erp_mobile`)

### A. Core Architecture & Routing
- **Framework**: Flutter SDK with Material 3 styling.
- **State Management**: `StatefulWidget` local state.
- **Active Screen Inventory**:
  1. `splash_screen.dart` (194 LOC): Animated splash view checking token validity via `SessionManager`.
  2. `login_screen.dart` (276 LOC): User login form with email/password validation and `AuthService` trigger.
  3. `dashboard_screen.dart` (365 LOC): Student portal home screen displaying student profile header, quick action grids, upcoming events, and attendance summary.
  4. `bottom_navigation.dart` (58 LOC): Bottom navigation bar routing between Dashboard, Attendance, Homework, Profile, and Settings.
  5. `attendance_screen.dart` (181 LOC): Monthly calendar view displaying present/absent markers.
  6. `homework_screen.dart` (46 LOC): Homework assignment list stub.
  7. `profile_screen.dart` (230 LOC): Student personal and academic detail view.
  8. `setting_screen.dart` (0 LOC): **Empty 0-Byte File** (Broken Screen).

### B. Core Services & Storage
- `lib/core/api/api_client.dart`: HTTP client wrapper configured for `http://10.0.2.2:8080/api` (Android Emulator loopback) and `http://localhost:8080/api`.
- `lib/core/storage/session_manager.dart`: Session manager wrapping `SharedPreferences` to save access tokens, user ID, email, and role.

### C. Critical Mobile Issues & Lint Errors
- **Broken File**: `lib/features/settings/presentation/screens/setting_screen.dart` is completely empty (0 lines).
- **Code Duplication**: Two competing auth modules (`lib/authentication/` vs `lib/features/auth/`).
- **Flutter Analyzer Warnings**:
  - `login_screen.dart`: Unsafe use of `BuildContext` across async gaps (`use_build_context_synchronously`).
  - `dashboard_screen.dart` & `profile_screen.dart`: Deprecated Flutter method `withOpacity()` used instead of `withValues()`.
