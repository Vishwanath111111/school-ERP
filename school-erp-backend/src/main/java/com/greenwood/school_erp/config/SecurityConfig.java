package com.greenwood.school_erp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/admin/login",
                                "/api/auth/login",
                                "/api/students",
                                "/api/students/**",
                                "/api/teachers",
                                "/api/teachers/**",
                                "/api/attendance",
                                "/api/attendance/**",
                                "/api/fees",
                                "/api/fees/**",
                                "/api/notices",
                                "/api/notices/**",
                                "/api/homework",
                                "/api/homework/**",
                                "/api/settings",
                                "/api/settings/**",
                                "/api/reports",
                                "/api/reports/**",
                                "/api/exams",
                                "/api/exams/**",
                                "/api/timetable",
                                "/api/timetable/**"
                        ).permitAll()

                        .anyRequest().authenticated()
                )

                .formLogin(form -> form.disable())

                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allowed Frontend Origins (Supports localhost/127.0.0.1 on any dev port e.g. 3000, 3001)
        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:*",
                "http://127.0.0.1:*"
        ));

        // Allowed HTTP Methods
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        // Allowed Headers
        configuration.setAllowedHeaders(List.of("*"));

        // Allow Credentials (Cookies / Authorization headers)
        configuration.setAllowCredentials(true);

        // Cache preflight response for 1 hour
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}