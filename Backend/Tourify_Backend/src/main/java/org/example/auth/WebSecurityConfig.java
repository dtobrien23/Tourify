package org.example.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


/**
 * 权限验证配置
 * Register the security policy
 *
 * @author lvyongjie
 * @created 26/06/2023
 */

@Configuration
@EnableWebSecurity  // enable Spring Security's web security support.
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfig{

    private final JWTAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;


    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        // config the server to be stateless (authenticate every request via a token and do not require a session to keep the user context)
        http.sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeRequests(authorize -> authorize
                        // Allow public access to swagger
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/webjars/**").permitAll()
                        // Allow public access to certain endpoint
                        .requestMatchers("/user/tokensignin/**", "/user/register/**", "/attraction/**").permitAll()
                        // Require authentication for all other requests
                        .anyRequest().authenticated())
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        // config CORS and CSRF
        http
                .csrf(csrf -> csrf.disable())    // disable csrf - Allow POST/PUT/etc request
                .cors(cors -> cors.disable());   // disable the CORS integration within Spring Security
        return http.build();
    }

}