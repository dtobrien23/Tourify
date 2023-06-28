package org.example.Auth;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 27/06/2023
 */

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService  {

    // This method will be called by Spring OAuth2 upon successful authentication
    // it returns a new CustomOAuth2User object.
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user =  super.loadUser(userRequest);
        return new CustomOAuth2User(user);
    }

}
