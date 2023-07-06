package org.example.bean.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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

}