package com.peeppeep.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)  // CSRF 비활성화 (필요에 따라)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()  // 모든 요청 허용
                        .anyRequest().authenticated()  // 나머지는 인증 필요
                )
                .build();
    }
}