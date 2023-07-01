package org.example.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.example.bean.model.UserDO;
import org.example.service.UserService;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Intercept every HTTP request and add a new response (extends OncePerRequestFilter)
 *
 * @author lvyongjie
 * @created 30/06/2023
 */


@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }
        //Extract the authHeader from the request passed from the front end
        final String authHeader = request.getHeader("Authorization");
        // return the response if can't extract the authHeader
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        //Extract the JWT String from the authHeader
        final String jwt;
        jwt = authHeader.substring(7);
        System.out.println("Filter - loading the JWTAuthenticationFilter...     JWT:"+jwt);
        // Check whether the user exist in the database
        final UserDO userDO;
        try {
            userDO = userService.validateToken(jwt); // the method will return null if the input isn't a valid token.
            System.out.println("Filter - loading the User using JWT:"+userDO.toString());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        // If the user info can be extracted from JWT(means the token is valid) and user haven't been authenticated yet
            // (If the user have been authenticated, Won't have to go through all the process)
        if (userDO != null && SecurityContextHolder.getContext().getAuthentication() == null){
            System.out.println("Filter - successful retrieved the User and User haven't been authenticated");
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userDO.getUser_id());
            System.out.println("Filter - retrieve the user info from the database"+userDetails.toString());
            // Grant the user with access (UsernamePasswordAuthenticationToken object is used by Spring Security to represent the authentication of a user.)
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            // In the end use the SecurityContextHolder to give access to user(which is authToken)
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        // doFilter() is typically used within a custom filter to allow Spring Security's filter chain to continue processing after the custom filter's own logic has been executed.
        filterChain.doFilter(request, response);
    }
}