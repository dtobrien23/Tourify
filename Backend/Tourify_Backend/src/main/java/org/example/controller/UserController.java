package org.example.controller;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.config.BusinessException;
import org.example.config.ResponseCode;
import org.example.config.Result;
import org.example.repository.UserRepository;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 26/06/2023
 */

@CrossOrigin
@Tag(name = "User API", description = "User API requires login")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired UserService userService;
    @Autowired UserRepository userRepository;

    @GetMapping("/test")
    @Operation(summary = "Test. return string", description = "Test. return string")
    public Result userInfo() {
        return Result.success("Testing Testing");
    }

//    // Test getting the cde token from Google. Then send the
//    @GetMapping("/test/signin/info")
//    @Operation(summary = "user sign in google and return full information", description = "User sign in api - return the user info")
//    public OAuth2User userInfo(@AuthenticationPrincipal OAuth2User oAuth2User) {
//        return oAuth2User;
//    }
//
//    @GetMapping("/test/signin")
//    @Operation(summary = "user sign in google and return name", description = "User sign in api - return the user's name")
//    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User oAuth2User) {
//        return Collections.singletonMap("name", oAuth2User.getAttribute("name"));
//    }

    // Receive the ID token from the front end and verify it
    @PostMapping("/tokensignin")
    public Result tokenSignIn(@RequestParam String idTokenString) throws Exception {
        if (idTokenString == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_EMPTY);
        }
        // Process the token, authenticate user etc
        Result result = userService.vaildateToken(idTokenString);
        return result;
    }

    @PostMapping("/tokensigninTest")
    public Result tokenSignInTest(@RequestParam String idTokenString) throws Exception {
        return Result.success(idTokenString);
    }


}
