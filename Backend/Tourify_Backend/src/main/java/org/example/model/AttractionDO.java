package org.example.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 14/06/2023
 */


@Data
@Document("Attraction") // the annotation @Document to specify the collection name that will be used by the model. If the collection doesn't exist, MongoDB will create it.
public class AttractionDO {

    @Id      // the primary key in our MongoDB document is specified using the @Id annotation. If we don't do this, MongoDB will automatically generate an _id when creating the document.
    private String id;
    private String name;
    private String coordinates_lat;
    private String coordinates_lng;



    public AttractionDO(String id, String name) {
        super();
        this.id = id;
        this.name = name;
    }
}
