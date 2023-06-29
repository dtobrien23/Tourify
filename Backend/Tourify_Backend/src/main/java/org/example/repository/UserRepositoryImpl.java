package org.example.repository;

import org.example.bean.model.UserDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;


/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 27/06/2023
 */

@Component
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;


    @Override
    public UserDO findUserByName(String userName) {
        Query query=new Query(Criteria.where("user_name").is(userName));
        UserDO userDO =  mongoTemplate.findOne(query , UserDO.class);
        return userDO;
    }
}
