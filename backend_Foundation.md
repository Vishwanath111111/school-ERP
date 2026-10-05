# ==============================================================================
# Phase 1 - Foundation Structure (FINAL & LOCKED)
# ==============================================================================

school-erp
│
├── .mvn
│
├── src
│   │
│   ├── main
│   │   │
│   │   ├── java
│   │   │   │
│   │   │   └── com
│   │   │       └── greenwood
│   │   │           └── school_erp
│   │   │
│   │   │               ├── config
│   │   │               │
│   │   │               ├── security
│   │   │               │
│   │   │               ├── exception
│   │   │               │
│   │   │               ├── common
│   │   │               │   │
│   │   │               │   ├── response
│   │   │               │   ├── constants
│   │   │               │   ├── enums
│   │   │               │   └── util
│   │   │               │
│   │   │               ├── modules
│   │   │               │   │
│   │   │               │   ├── authentication
│   │   │               │   │   ├── controller
│   │   │               │   │   ├── service
│   │   │               │   │   ├── repository
│   │   │               │   │   ├── entity
│   │   │               │   │   ├── request
│   │   │               │   │   ├── response
│   │   │               │   │   ├── mapper
│   │   │               │   │   ├── security
│   │   │               │   │   └── validation
│   │   │               │   │
│   │   │               │   ├── school
│   │   │               │   ├── teacher
│   │   │               │   ├── parent
│   │   │               │   ├── student
│   │   │               │   ├── attendance
│   │   │               │   ├── timetable
│   │   │               │   ├── homework
│   │   │               │   ├── examination
│   │   │               │   ├── fees
│   │   │               │   ├── notice
│   │   │               │   └── dashboard
│   │   │               │
│   │   │               └── SchoolErpApplication.java
│   │   │
│   │   └── resources
│   │       │
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       │
│   │       ├── static
│   │       ├── templates
│   │       └── db
│   │
│   └── test
│
├── pom.xml
├── mvnw
└── mvnw.cmd


=========================================================================================
What Each Package Will Contain
==========================================================================================
1. config :-   All Spring configurations.

config
│
├── SecurityConfig.java
├── SwaggerConfig.java
├── CorsConfig.java
├── JacksonConfig.java
└── OpenApiConfig.java

========================================================================================
2. security :-  Everything related to authentication and authorization.

security
│
├── jwt
│
├── filter
│
├── service
│
├── handler
│
└── SecurityConstants.java
-----------------------------------------------------------------------------------
Later we'll add:

JWT Filter
JWT Provider
Authentication Entry Point
Access Denied Handler
UserDetailsService

=====================================================================================================
3. common  :- Reusable classes used across the application.

common
│
├── response
│
├── request
│
├── pagination
│
└── mapper


============================================================================================
4. exception :- Global exception handling.

exception
│
├── GlobalExceptionHandler.java
│
├── ResourceNotFoundException.java
│
├── BadRequestException.java
│
├── UnauthorizedException.java
│
├── ForbiddenException.java
│
└── ValidationException.java


=========================================================================================
5. dto :- Shared DTOs. 

dto
│
├── ApiResponseDTO
│
├── ErrorDTO
│
└── MessageDTO
==================================================================================

6. repository :- We'll keep this package empty for now.

Business repositories will later move into their own modules.

===================================================================================
7. service :-  Shared services.

EmailService

FileStorageService

AuditService

===================================================================================
8. util :- Utitlity class 

DateUtil
JwtUtil
StringUtil
ValidationUtil

========================================================================================
9. constants

ApiConstants

SecurityConstants

MessageConstants

AppConstants

==================================================================================
10. enums

Role

Gender

Status

UserType


=======================================================================================================
Resources
-----------------------------------------------------------
resources
│
├── application.properties
│
├── application-dev.properties
│
├── application-prod.properties
│
├── static
│
├── templates
│
└── db

================================================================================

*** application.properties :- Keep only common configuration here.

spring.application.name=school-erp

spring.profiles.active=dev
=================================================================================

*** application-dev.properties :- 

server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/school_erp
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true



