package org.example.service;

import org.example.bean.dto.UserUpdateDTO;
import org.example.bean.model.AttractionDO;
import org.example.bean.model.AttractionStatusDO;
import org.example.bean.model.BadgeDO;
import org.example.bean.model.UserDO;
import org.example.bean.util.SystemRoleEnum;
import org.example.config.BusinessException;
import org.example.bean.util.ResponseCode;
import org.example.config.Result;
import org.example.repository.AttractionRepository;
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
    @Autowired AttractionRepository attractionRepository;


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
            // set the default data for the new user
            AttractionStatusDO attractionStatusDO = new AttractionStatusDO();
            userDO.setAttractionStatusDO(attractionStatusDO);
            BadgeDO badgeDO = new BadgeDO();
            userDO.setBadgeDO(badgeDO);
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

    // To calculate the distance between two locations using the Haversine formula
    private static final int EARTH_RADIUS = 6371; // Approx Earth radius in KM
    public static double calculateDistanceInMeter(double startLat, double startLong, double endLat, double endLong) {

        double dLat  = Math.toRadians((endLat - startLat));
        double dLong = Math.toRadians((endLong - startLong));

        startLat = Math.toRadians(startLat);
        endLat   = Math.toRadians(endLat);

        double a = haversin(dLat) + Math.cos(startLat) * Math.cos(endLat) * haversin(dLong);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c * 1000; // <-- distance in meters
    }
    public static double haversin(double val) {
        return Math.pow(Math.sin(val / 2), 2);
    }


    public Result updateUser(UserUpdateDTO userUpdateDTO) throws Exception {
        // Process the token, authenticate user etc
        UserDO userDO = validateToken(userUpdateDTO.getId_token());
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_NOT_VAILD);
        }
        // get the user info in DB
        UserDO userDOdb = findUserById(userDO.getUser_id());
        if (userDOdb == null){
            throw new BusinessException(ResponseCode.PARAM_USER_NOT_EXIST);
        }
        // get the attraction info inDB
        AttractionDO attractionDOdb = attractionRepository.findAttractionById(userUpdateDTO.getAttraction_id());
        if (attractionDOdb == null) {
            throw new BusinessException(ResponseCode.PARAM_ATTRACTION_EMPTY);
        }
        // Check whether the user's current address is close to the attraction
        double distance = calculateDistanceInMeter(userUpdateDTO.getLat(), userUpdateDTO.getLng(), Double.parseDouble(attractionDOdb.getCoordinates_lat()), Double.parseDouble(attractionDOdb.getCoordinates_lng()));
        // Check if distance is within 50 meters
        System.out.println( distance + " Meters");
        if (distance > 50 ){
            throw new BusinessException(ResponseCode.PARAM_DISTANCE_TOO_LONG);
        }
        else {
            // update the user's attraction record
            Boolean resultBoolean = userRepository.updateUserAttractionStatus(userDO.getUser_id(),attractionDOdb.getName_alias());
            if (resultBoolean == false){
                throw new BusinessException(ResponseCode.PARAM_DISTANCE_TOO_LONG);
            }
            else{
                // If the resultBoolean is true that means The database have already changed the user's attraction's record
                // Needs to check and potentially update the badge record.

                // get the latest user info in DB to check the badge
                UserDO userDONewBadge = findUserById(userDO.getUser_id());
                BadgeDO badgeDO = userDONewBadge.getBadgeDO();
                // Check the All_Attraction_Badge
                if(userDONewBadge.getAttractionStatusDO().areAllFieldsTrue()){
                    badgeDO.setAll_Attraction_Badge(true);
                }
                // Check the All_Museum_Badge
                if(userDONewBadge.getAttractionStatusDO().areAllMuseumTrue()){
                    badgeDO.setAll_Museum_Badge(true);
                }
                // Check the All_Park_Badge
                if(userDONewBadge.getAttractionStatusDO().areAllParkTrue()){
                    badgeDO.setAll_Park_Badge(true);
                }
                // Check the All_Dining_Badge
                if(userDONewBadge.getAttractionStatusDO().areAllDiningTrue()){
                    badgeDO.setAll_Dining_Badge(true);
                }
                // Check the Empire_State_Badge
                if(userDONewBadge.getAttractionStatusDO().getEmpire_State_Building()){
                    badgeDO.setEmpire_State_Badge(true);
                }

                // update the user badge in DB
                Boolean resultBooleanBadge = userRepository.updateUserBadge(userDO.getUser_id() , badgeDO);
                if (!resultBooleanBadge){
                    throw new BusinessException(ResponseCode.PARAM_UPDATE_BADGE_ERROR);
                }
                // get the latest user info in DB to return it
                UserDO userDONew = findUserById(userDO.getUser_id());
                return Result.success(userDONew);
            }
        }

    }

    public Boolean DeleteUser(String idTokenString) throws Exception {
        UserDO userDO = validateToken(idTokenString);
        if (userDO == null){
            throw new BusinessException(ResponseCode.PARAM_USER_IDTOKEN_NOT_VAILD);
        }
        // see whether the user exist in the DB
        UserDO userDO2 = userRepository.findUserById(userDO.getUser_id());
        if (userDO2 == null){
            // user is already in the DB
            throw new BusinessException(ResponseCode.PARAM_USER_NOT_EXIST);
        }

        // proceed to delete the user in the DB
        try {
            userRepository.deleteUser(userDO.getUser_id());
        }catch (Exception e) {
            return false;
        }
        return true;

    }



}
