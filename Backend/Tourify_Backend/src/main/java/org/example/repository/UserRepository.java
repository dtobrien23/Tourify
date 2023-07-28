package org.example.repository;

import org.example.bean.model.BadgeDO;
import org.example.bean.model.UserDO;
import org.springframework.stereotype.Repository;



/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 21/06/2023
 */
@Repository
public interface UserRepository {

    UserDO findUserByName(String userName);

    void saveUser(UserDO userDO);

    UserDO findUserById(String userId);

    Boolean updateUserAttractionStatus(String userId, String attractionName);

    Boolean updateUserBadge(String userId, BadgeDO badgeDO);

    void deleteUser(String userId);

    Boolean updateUserNft(String userId, String nftLink);


}