package org.example.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * 权限验证配置

 * The Spring Boot 2.x auto-configuration class for OAuth Client support is OAuth2ClientAutoConfiguration.
 *
 * It performs the following tasks:
 *
 * Registers a ClientRegistrationRepository @Bean composed of ClientRegistration(s) from the configured OAuth Client properties.
 * Registers a SecurityFilterChain @Bean and enables OAuth 2.0 Login through httpSecurity.oauth2Login().
 *
 * @author lvyongjie
 * @created 26/06/2023
 */

@Configuration
@EnableWebSecurity  // enable Spring Security's web security support.
public class WebSecurityConfig {

    @Autowired private CustomOAuth2UserService oauthUserService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorize -> authorize
                        // Allow public access to swagger
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/webjars/**").permitAll()
                        // Allow public access to certain endpoint
                        .requestMatchers("/user/test", "/user/tokensignin/**", "/attraction/**").permitAll()
                        // Require authentication for all other requests
                        .anyRequest().authenticated()
                )
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))); // Return unauthorized status when not authenticated
        http
                // disable csrf - Allow POST/PUT/etc request
                .csrf(csrf -> csrf.disable());
        return http.build();
    }

//    // expose all endpoint
//    @Autowired private CustomOAuth2UserService oauthUserService;
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests(authorize -> authorize
//                        .anyRequest().permitAll()
//
//                );
//        http
//                .csrf(csrf -> csrf.disable());
//        return http.build();
//    }


}