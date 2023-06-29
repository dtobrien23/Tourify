package org.example.bean.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;
import java.io.Serializable;

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
public class UserDO implements Serializable {

    @MongoId
    private String user_id;
    private String user_name;
    private String user_email;
    private String user_icon;
    private String google_id;
    private String google_access_token;
    private String oauth_expires;



}
