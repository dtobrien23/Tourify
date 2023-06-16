package org.example.repository;

import org.example.model.AttractionDO;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;


import java.util.List;


/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 15/06/2023
 */


@Component
public class AttractionRepositoryImpl implements AttractionRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * create attraction
     * @param attractionDO
     */
    @Override
    public void saveAttraction(AttractionDO attractionDO) {
        mongoTemplate.save(attractionDO);
    }

    /**
     * find attraction by name
     * @param attractionName
     * @return
     */
    @Override
    public AttractionDO findAttractionByName(String attractionName) {
        Query query=new Query(Criteria.where("name").is(attractionName));
        AttractionDO attractionDO =  mongoTemplate.findOne(query , AttractionDO.class);
        return attractionDO;
    }

    /**
     * get all attraction
     * @param
     * @return
     */

    @Override
    public List<AttractionDO> getAllAttraction() {
        return mongoTemplate.findAll(AttractionDO.class);
    }
}