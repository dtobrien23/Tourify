package org.example.model;


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
 * @created 14/06/2023
 */


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Attraction") // the annotation @Document to specify the collection name that will be used by the model. If the collection doesn't exist, MongoDB will create it.
public class AttractionDO implements Serializable {

    @MongoId     // the primary key in our MongoDB document is specified using the @MongoId annotation. If we don't do this, MongoDB will automatically generate an _id when creating the document.
    private String id;
    private String name;
    private String coordinates_lat;
    private String coordinates_lng;
    private String full_address;


}
