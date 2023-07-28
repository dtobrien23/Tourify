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
        update.set("badgeDO.Statue_of_Liberty_Badge", badgeDO.getStatue_of_Liberty_Badge());
        update.set("badgeDO.Brooklyn_Bridge_Badge", badgeDO.getBrooklyn_Bridge_Badge());
        update.set("badgeDO.Metropolitan_Museum_of_Art_Badge", badgeDO.getMetropolitan_Museum_of_Art_Badge());
        update.set("badgeDO.Museum_of_Modern_Art_Badge", badgeDO.getMuseum_of_Modern_Art_Badge());
        update.set("badgeDO.Guggenheim_Museum_Badge", badgeDO.getGuggenheim_Museum_Badge());
        update.set("badgeDO.Central_Park_Badge", badgeDO.getCentral_Park_Badge());
        update.set("badgeDO.Bryant_Park_Badge", badgeDO.getBryant_Park_Badge());
        update.set("badgeDO.High_Line_Badge", badgeDO.getHigh_Line_Badge());
        update.set("badgeDO.Broadway_Badge", badgeDO.getBroadway_Badge());
        update.set("badgeDO.Madame_Tussauds_New_York_Badge", badgeDO.getMadame_Tussauds_New_York_Badge());
        update.set("badgeDO.Lincoln_Center_Badge", badgeDO.getLincoln_Center_Badge());
        update.set("badgeDO.Greenwich_Village_Badge", badgeDO.getGreenwich_Village_Badge());
        update.set("badgeDO.Harlem_Badge", badgeDO.getHarlem_Badge());
        update.set("badgeDO.Eataly_Badge", badgeDO.getEataly_Badge());
        update.set("badgeDO.Grand_Central_Market_Badge", badgeDO.getGrand_Central_Market_Badge());
        update.set("badgeDO.Whitney_Museum_Badge", badgeDO.getWhitney_Museum_Badge());
        update.set("badgeDO.Museum_of_Arts_and_Design_Badge", badgeDO.getMuseum_of_Arts_and_Design_Badge());
        update.set("badgeDO.New_Museum_Badge", badgeDO.getNew_Museum_Badge());
        update.set("badgeDO.Morgan_Library_Museum_Badge", badgeDO.getMorgan_Library_Museum_Badge());
        update.set("badgeDO.Trinity_Church_Badge", badgeDO.getTrinity_Church_Badge());
        update.set("badgeDO.Fraunces_Tavern_Badge", badgeDO.getFraunces_Tavern_Badge());
        update.set("badgeDO.One_World_Observatory_Badge", badgeDO.getOne_World_Observatory_Badge());
        update.set("badgeDO.Top_of_the_Rock_Badge", badgeDO.getTop_of_the_Rock_Badge());
        update.set("badgeDO.Edge_Observation_Deck_Badge", badgeDO.getEdge_Observation_Deck_Badge());

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserDO.class);
        // updateResult.wasAcknowledged() will return true if successful. false if error
        return updateResult.wasAcknowledged();

    }


    @Override
    public Boolean updateUserNft(String userId, String nftLink) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user_id").is(userId));
        Update update = new Update();
        // set the variables needs to be updated
        update.set("nftLink", nftLink);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserDO.class);
        // updateResult.wasAcknowledged() will return true if successful. false if error
        return updateResult.wasAcknowledged();
    }

    @Override
    public void deleteUser(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user_id").is(userId));
        mongoTemplate.remove(query, UserDO.class);
    }



}
