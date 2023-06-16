package org.example.repository;

import org.example.model.AttractionDO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

/**
 * Acts as a link between the model and the database and has all the methods for CRUD operations.
 *
 * Two main ways of connecting to MongoDB
 * 1. MongoRepository interface will provide built-in methods for CRUD operations on the database.
 * 2. MongoTemplate
 *
 * @author lvyongjie
 * @created 14/06/2023
 *
 */


@Repository
public interface AttractionRepository  {

    // MongoTemplate Method ----------------------------------------------------------------------

    void saveAttraction(AttractionDO attractionDO);

    AttractionDO findAttractionByName(String attractionName);

    List<AttractionDO> getAllAttraction();



    // MongoRepository Method ----------------------------------------------------------------------

//    // This method returns a AttractionDO object that matches the provided name.
//    @Query("{name:'?0'}")      // The @Query annotation allows to customize the MongoDB query。 "{name:'?0'}" is the query being executed, where ?0 is replaced by the method's argument.
//    AttractionDO findAttractionByName(String name);
//
//    // This method retrieves all AttractionDO objects of a specific category.
//    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")  // The value attribute specifies the query, and the fields attribute allows you to limit the fields returned in the response (name and quantity in this case).
//    List<AttractionDO> findAll(String category);
//
//    // This method returns the total number of documents in the collection.
//    public long count();

}
