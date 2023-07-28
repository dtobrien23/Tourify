package org.example.bean.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 17/07/2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttractionOnePredictionVO implements Serializable {

    private String attraction_id;
    private String attraction_name;
    private String name_alias; // alias contains the underscore
    private Long predictionDays;
    private List<AttractionPredictionDetailVO> attractionPredictionDetailVOList;

}