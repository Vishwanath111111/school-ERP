# 06. Database Schema & Entity Analysis

## Target Database Management System
- **Engine**: PostgreSQL 14+
- **Database Name**: `school_erp`
- **Connection Configuration**: Configured in `application-dev.properties` (`jdbc:postgresql://localhost:5432/school_erp`).
- **Schema Management**: Hibernate Auto DDL (`spring.jpa.hibernate.ddl-auto=update`).
- **Migration Script Tooling**: **None** (Flyway / Liquibase not installed).

---

## Implemented Database Entities

### 1. Table: `users`
- **Entity File**: `com.greenwood.school_erp.modules.authentication.entity.User.java`
- **Description**: Stores user login credentials.

| Column Name | Data Type | Constraints | Default / Generator | Index | Description |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `id` | `BIGINT` | Primary Key | `@GeneratedValue(IDENTITY)` | `PK` | Unique user ID |
| `email` | `VARCHAR` | `NOT NULL`, `UNIQUE` | - | `UNIQUE` | User email address |
| `password` | `VARCHAR` | `NOT NULL` | - | - | BCrypt hashed password |

- **Deficiencies**: Missing `role`, `is_active`, `created_at`, `updated_at`, `reset_token`. No foreign key linking user to student, teacher, or parent.

### 2. Table: `admins`
- **Entity File**: `com.greenwood.school_erp.modules.admin.entity.Admin.java`
- **Description**: Stores administrator login accounts.

| Column Name | Data Type | Constraints | Default / Generator | Index | Description |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `id` | `BIGINT` | Primary Key | `@GeneratedValue(IDENTITY)` | `PK` | Unique admin ID |
| `email` | `VARCHAR` | `NOT NULL`, `UNIQUE` | - | `UNIQUE` | Admin login email |
| `password` | `VARCHAR` | `NOT NULL` | - | - | **Plaintext** password |
| `role` | `VARCHAR` | Default `'ADMIN'` | `'ADMIN'` | - | Admin privilege level |

- **Deficiencies**: Redundant with `users` table; password stored unhashed.

### 3. Table: `students`
- **Entity File**: `com.greenwood.school_erp.modules.students.entity.Student.java`
- **Description**: Stores student profiles and demographic details.

| Column Name | Data Type | Constraints | Default / Generator | Index | Description |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `id` | `BIGINT` | Primary Key | `@GeneratedValue(IDENTITY)` | `PK` | Unique student ID |
| `admission_no` | `VARCHAR` | `NOT NULL`, `UNIQUE` | - | `UNIQUE` | Official admission number |
| `first_name` | `VARCHAR` | `NOT NULL` | - | - | Student first name |
| `last_name` | `VARCHAR` | `NOT NULL` | - | - | Student last name |
| `class_name` | `VARCHAR` | `NOT NULL` | - | - | Enrolled class name |
| `section` | `VARCHAR` | `NOT NULL` | - | - | Class section |
| `roll_no` | `INTEGER` | `NULLABLE` | - | - | Class roll number |
| `house` | `VARCHAR` | `NULLABLE` | - | - | School house name |
| `date_of_birth` | `DATE` | `NULLABLE` | - | - | Date of birth |
| `blood_group` | `VARCHAR` | `NULLABLE` | - | - | Blood group |
| `gender` | `VARCHAR` | `NULLABLE` | - | - | Gender |
| `nationality` | `VARCHAR` | Default `'Indian'` | `'Indian'` | - | Student nationality |
| `parent_email` | `VARCHAR` | `NULLABLE` | - | - | Primary guardian email |
| `parent_phone` | `VARCHAR` | `NULLABLE` | - | - | Primary guardian phone |
| `address` | `VARCHAR` | `NULLABLE` | - | - | Residential address |
| `academic_year` | `VARCHAR` | Default `'2024-2025'` | `'2024-2025'` | - | Current academic year |
| `is_active` | `BOOLEAN` | Default `TRUE` | `TRUE` | - | Enrollment status |
| `created_at` | `TIMESTAMP` | Auto-generated | `@PrePersist` | - | Record creation date |

---

## Entity Relationship Diagram (ERD)

```mermaid
erdiagram
    users {
        bigint id PK
        string email UK
        string password
    }

    admins {
        bigint id PK
        string email UK
        string password
        string role
    }

    students {
        bigint id PK
        string admission_no UK
        string first_name
        string last_name
        string class_name
        string section
        integer roll_no
        string house
        date date_of_birth
        string blood_group
        string gender
        string nationality
        string parent_email
        string parent_phone
        string address
        string academic_year
        boolean is_active
        timestamp created_at
    }
```

### Critical Foreign Key & Relationship Gaps:
1. **Isolated Entities**: Zero `@OneToMany`, `@ManyToOne`, or `@ManyToMany` relationships defined in JPA.
2. **Missing Normalization**: `class_name` and `section` are stored as raw strings in `students` rather than referencing a `classes` or `sections` entity table.
3. **Missing Essential Database Tables**:
   - `teachers`, `parents`, `classes`, `sections`, `subjects`, `attendances`, `fees`, `fee_payments`, `exams`, `marks`, `timetables`, `homework`, `notices`.
