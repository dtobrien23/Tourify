package org.example.service;

import org.example.bean.model.UserDO;
import org.example.bean.util.SystemRoleEnum;
import org.example.config.BusinessException;
import org.example.bean.util.ResponseCode;
import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.util.Collections;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 27/06/2023
 */

@Service
public class UserService {

    @Autowired UserRepository userRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id:}")
    private String CLIENT_ID;

    // This method will validate the token.
    // success - return a default user object created from the token
    // Failure - return null
    public UserDO validateToken(String idTokenString) throws Exception {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(CLIENT_ID))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            Payload payload = idToken.getPayload();
            // Print user identifier
            String userId = payload.getSubject();
            // Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            // store the information retrieved from idToken to UserDO class and return
            UserDO userDO = new UserDO();
            userDO.setUser_id(userId);
            userDO.setUser_email(email);
            userDO.setUser_icon(pictureUrl);
            userDO.setUser_name(name);
            userDO.setEmailVerified(emailVerified);
            userDO.setSystemRoleEnum(SystemRoleEnum.USER);
            return userDO;
        }
        else {
            return null;
        }


    }


    public boolean insertUser(UserDO userDO) throws Exception {
        try {
            userRepository.saveUser(userDO);
        }catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean saveUser(String idTokenString) throws Exception {
        UserDO userDO = validateToken(idTokenString);
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_NOT_VAILD);
        }
        // see if the user already exist in the DB
        UserDO userDO2 = userRepository.findUserById(userDO.getUser_id());
        if (userDO2 != null){
            // user is already in the DB
            throw new BusinessException(ResponseCode.PARAM_USER_ALREADY_EXIST);
        }
        // proceed to store the user in the DB
        try {
            userRepository.saveUser(userDO);
        }catch (Exception e) {
            return false;
        }
        return true;
    }

    public UserDO findUserByName(String userName) throws Exception {
        UserDO userDO = userRepository.findUserByName(userName);
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_NOT_EXIST);
        }
        else {
            return userDO;
        }
    }

    public UserDO findUserById(String userId) throws Exception {
        UserDO userDO = userRepository.findUserById(userId);
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_NOT_EXIST);
        }
        else {
            return userDO;
        }
    }

}
