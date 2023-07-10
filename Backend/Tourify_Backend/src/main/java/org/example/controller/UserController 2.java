package org.example.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.bean.dto.UserUpdateDTO;
import org.example.bean.model.AttractionDO;
import org.example.bean.model.UserDO;
import org.example.config.BusinessException;
import org.example.bean.util.ResponseCode;
import org.example.config.Result;
import org.example.repository.UserRepository;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Result userTesting() {
        return Result.success("Testing Testing");
    }

    // Receive the ID token from the front end and verify it
    @PostMapping("/tokensignin")
    public Result tokenSignIn(@RequestParam String idTokenString) throws Exception {
        if (idTokenString == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_EMPTY);
        }
        // Process the token, authenticate user etc
        UserDO userDO = userService.validateToken(idTokenString);
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_NOT_VAILD);
        }
        else {
            return Result.success(userDO);
        }
    }

    // Receive the user from database using useId
    @PostMapping("/info")
    @Operation(summary = "Retrieve user info", description = "Protected endpoint. Retrieve the User information from database using useId")
    public Result<UserDO> userInfo(@RequestParam String idTokenString) throws Exception {
        if (idTokenString == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_EMPTY);
        }
        // Process the token, authenticate user etc
        UserDO userDO = userService.validateToken(idTokenString);
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_NOT_VAILD);
        }
        // TODO: Should check whether the AuthFilter's bearer token match with the current input id_token (make sure it's the same user)
        // Process the token, authenticate user etc
        return Result.success(userService.findUserById(userDO.getUser_id()));
    }

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Unprotected endpoint. Use for new user register")
    public Result userRegister(@RequestParam String idTokenString) throws Exception {
        if (idTokenString == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_EMPTY);
        }
        // insert the user successful
        if (userService.saveUser(idTokenString) ){
            return Result.success(idTokenString);
        }
        // insert the user failure
        else {
            return Result.fail();
        }
    }

    @PostMapping("/update")
    @Operation(summary = "Update user's attraction history info", description = "Protected endpoint. Update user's attraction history info")
    public Result userUpdate(@RequestBody UserUpdateDTO userUpdateDTO) throws Exception {
        return userService.updateUser(userUpdateDTO);
    }

}
