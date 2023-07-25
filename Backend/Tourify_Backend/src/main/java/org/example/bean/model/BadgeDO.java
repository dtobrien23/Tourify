package org.example.bean.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 05/07/2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BadgeDO implements Serializable {

    private Boolean All_Attraction_Badge = false;
    private Boolean All_Museum_Badge = false;
    private Boolean All_Park_Badge = false;
    private Boolean All_Dining_Badge = false;

    private Boolean Empire_State_Badge = false;
    private Boolean Statue_of_Liberty_Badge = false;
    private Boolean Brooklyn_Bridge_Badge = false;
    private Boolean Metropolitan_Museum_of_Art_Badge = false;
    private Boolean Museum_of_Modern_Art_Badge = false;
    private Boolean Guggenheim_Museum_Badge = false;
    private Boolean Central_Park_Badge = false;
    private Boolean Bryant_Park_Badge = false;
    private Boolean High_Line_Badge = false;
    private Boolean Broadway_Badge = false;
    private Boolean Madame_Tussauds_New_York_Badge = false;
    private Boolean Lincoln_Center_Badge = false;
    private Boolean Greenwich_Village_Badge = false;
    private Boolean Harlem_Badge = false;
    private Boolean Eataly_Badge = false;
    private Boolean Grand_Central_Market_Badge = false;
    private Boolean Whitney_Museum_Badge = false;
    private Boolean Museum_of_Arts_and_Design_Badge = false;
    private Boolean New_Museum_Badge = false;
    private Boolean Morgan_Library_Museum_Badge = false;
    private Boolean Trinity_Church_Badge = false;
    private Boolean Fraunces_Tavern_Badge = false;
    private Boolean One_World_Observatory_Badge = false;
    private Boolean Top_of_the_Rock_Badge = false;
    private Boolean Edge_Observation_Deck_Badge = false;

}