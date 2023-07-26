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
    private String nftLink;
    private SystemRoleEnum systemRoleEnum;
    private AttractionStatusDO attractionStatusDO;
    private BadgeDO badgeDO;


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


