package org.example.bean.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttractionStatusDO implements Serializable {
    private Boolean Empire_State_Building = false;
    private Boolean Statue_of_Liberty = false;
    private Boolean Brooklyn_Bridge = false;
    private Boolean Metropolitan_Museum_of_Art = false;
    private Boolean Museum_of_Modern_Art = false;
    private Boolean Guggenheim_Museum = false;
    private Boolean Central_Park = false;
    private Boolean Bryant_Park = false;
    private Boolean High_Line = false;
    private Boolean Broadway = false;
    private Boolean Madame_Tussauds_New_York = false;
    private Boolean Lincoln_Center = false;
    private Boolean Greenwich_Village = false;
    private Boolean Harlem = false;
    private Boolean Eataly = false;
    private Boolean Grand_Central_Market = false;
    private Boolean Whitney_Museum = false;
    private Boolean Museum_of_Arts_and_Design = false;
    private Boolean New_Museum = false;
    private Boolean Morgan_Library_Museum = false;
    private Boolean Trinity_Church = false;
    private Boolean Fraunces_Tavern = false;
    private Boolean One_World_Observatory = false;
    private Boolean Top_of_the_Rock = false;
    private Boolean Edge_Observation_Deck = false;

    public void copy(AttractionStatusDO source) {
        this.Empire_State_Building = source.Empire_State_Building;
        this.Statue_of_Liberty = source.Statue_of_Liberty;
        this.Brooklyn_Bridge = source.Brooklyn_Bridge;
        this.Metropolitan_Museum_of_Art = source.Metropolitan_Museum_of_Art;
        this.Museum_of_Modern_Art = source.Museum_of_Modern_Art;
        this.Guggenheim_Museum = source.Guggenheim_Museum;
        this.Central_Park = source.Central_Park;
        this.Bryant_Park = source.Bryant_Park;
        this.High_Line = source.High_Line;
        this.Broadway = source.Broadway;
        this.Madame_Tussauds_New_York = source.Madame_Tussauds_New_York;
        this.Lincoln_Center = source.Lincoln_Center;
        this.Greenwich_Village = source.Greenwich_Village;
        this.Harlem = source.Harlem;
        this.Eataly = source.Eataly;
        this.Grand_Central_Market = source.Grand_Central_Market;
        this.Whitney_Museum = source.Whitney_Museum;
        this.Museum_of_Arts_and_Design = source.Museum_of_Arts_and_Design;
        this.New_Museum = source.New_Museum;
        this.Morgan_Library_Museum = source.Morgan_Library_Museum;
        this.Trinity_Church = source.Trinity_Church;
        this.Fraunces_Tavern = source.Fraunces_Tavern;
        this.One_World_Observatory = source.One_World_Observatory;
        this.Top_of_the_Rock = source.Top_of_the_Rock;
        this.Edge_Observation_Deck = source.Edge_Observation_Deck;

    }

    public boolean areAllFieldsTrue() {
        return Empire_State_Building &&
                Statue_of_Liberty &&
                Brooklyn_Bridge &&
                Metropolitan_Museum_of_Art &&
                Museum_of_Modern_Art &&
                Guggenheim_Museum &&
                Central_Park &&
                Bryant_Park &&
                High_Line &&
                Broadway &&
                Madame_Tussauds_New_York &&
                Lincoln_Center &&
                Greenwich_Village &&
                Harlem &&
                Eataly &&
                Grand_Central_Market &&
                Whitney_Museum &&
                Museum_of_Arts_and_Design &&
                New_Museum &&
                Morgan_Library_Museum &&
                Trinity_Church &&
                Fraunces_Tavern &&
                One_World_Observatory &&
                Top_of_the_Rock &&
                Edge_Observation_Deck;
    }

    public boolean areAllMuseumTrue() {
        return Metropolitan_Museum_of_Art &&
                Museum_of_Modern_Art &&
                Guggenheim_Museum &&
                Madame_Tussauds_New_York;
    }

    public boolean areAllParkTrue() {
        return  Central_Park &&
                Bryant_Park &&
                High_Line;
    }

    public boolean areAllDiningTrue() {
        return Eataly && Grand_Central_Market;
    }


}
