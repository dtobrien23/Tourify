package org.example.bean.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 12/07/2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttractionPredictionVO implements Serializable {

    private String attraction_id;
    private String name;
    private String name_alias; // alias contains the underscore
    private Float businessRate;

}