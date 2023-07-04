package org.example.bean.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.bean.util.SystemRoleEnum;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.*;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 21/06/2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("User")
public class UserDO implements UserDetails, Serializable {

    @MongoId
    private String user_id;
    private String user_name;
    private String user_email;
    private String user_icon;
    private boolean emailVerified;
    private SystemRoleEnum systemRoleEnum;
    private AttractionStatus attractionStatus;



    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class AttractionStatus {
        private Boolean Empire_State_Building = false;
        private Boolean Statue_of_Liberty = false;
        private Boolean Brooklyn_Bridge;
        private Boolean Metropolitan_Museum_of_Art;
        private Boolean Museum_of_Modern_Art;
        private Boolean Guggenheim_Museum;
        private Boolean Central_Park;
        private Boolean Bryant_Park;
        private Boolean High_Line;
        private Boolean Broadway;
        private Boolean Madame_Tussauds_New_York;
        private Boolean Lincoln_Center;
        private Boolean Greenwich_Village;
        private Boolean Harlem;
        private Boolean Eataly;
        private Boolean Grand_Central_Market;
        private Boolean Whitney_Museum;
        private Boolean Museum_of_Arts_and_Design;
        private Boolean New_Museum;
        private Boolean Morgan_Library_Museum;
        private Boolean Trinity_Church;
        private Boolean Fraunces_Tavern;
        private Boolean One_World_Observatory;
        private Boolean Top_of_the_Rock;
        private Boolean Edge_Observation_Deck;


    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(systemRoleEnum.name()));
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return user_name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "UserDO{" +
                "user_id='" + user_id + '\'' +
                ", user_name='" + user_name + '\'' +
                ", user_email='" + user_email + '\'' +
                ", user_icon='" + user_icon + '\'' +
                ", emailVerified=" + emailVerified +
                ", systemRoleEnum=" + systemRoleEnum +
                '}';
    }


}
