package org.example.bean.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.bean.util.*;
import org.springframework.cglib.core.Local;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

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
    private String name_alias; // alias contains the underscore
    private String coordinates_lat;
    private String coordinates_lng;
    private String full_address;
    private AttractionTypeEnum attractionTypeEnum;
    private AttractionSiteEnum attractionSiteEnum;
    private String price; // shown in dollar
    private String estimated_hours;
    private String link;
    private OpenHour openHour;
    private LocalDateTime creat_time;
}

