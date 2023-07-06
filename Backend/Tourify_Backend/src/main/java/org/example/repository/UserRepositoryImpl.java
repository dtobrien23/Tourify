package org.example.repository;

import com.mongodb.client.result.UpdateResult;
import org.example.bean.model.AttractionDO;
import org.example.bean.model.BadgeDO;
import org.example.bean.model.UserDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
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

    @Override
    public void saveUser(UserDO userDO) {
        // 不需要set null. user id从google JWT token中解析获得id
        // userDO.setUser_id(null);
        mongoTemplate.save(userDO);
    }

    @Override
    public UserDO findUserById(String userId) {
        Query query=new Query(Criteria.where("user_id").is(userId));
        UserDO userDO =  mongoTemplate.findOne(query , UserDO.class);
        return userDO;
    }

    @Override
    public Boolean updateUserAttractionStatus(String userId, String attractionName) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user_id").is(userId));
        Update update = new Update();
        // set the variables needs to be updated
        update.set("attractionStatusDO."+attractionName, true);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserDO.class);
        // updateResult.wasAcknowledged() will return true if successful. false if error
        return updateResult.wasAcknowledged();

    }


    @Override
    public Boolean updateUserBadge(String userId, BadgeDO badgeDO) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user_id").is(userId));
        Update update = new Update();
        // set the variables needs to be updated
        update.set("badgeDO.All_Attraction_Badge", badgeDO.getAll_Attraction_Badge());
        update.set("badgeDO.All_Museum_Badge", badgeDO.getAll_Museum_Badge());
        update.set("badgeDO.All_Park_Badge", badgeDO.getAll_Park_Badge());
        update.set("badgeDO.All_Dining_Badge", badgeDO.getAll_Dining_Badge());
        update.set("badgeDO.Empire_State_Badge", badgeDO.getEmpire_State_Badge());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserDO.class);
        // updateResult.wasAcknowledged() will return true if successful. false if error
        return updateResult.wasAcknowledged();

    }



}
