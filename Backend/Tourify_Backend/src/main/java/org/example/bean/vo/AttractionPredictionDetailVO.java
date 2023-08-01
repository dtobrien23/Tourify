package org.example.bean.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 17/07/2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttractionPredictionDetailVO implements Serializable {

    private int hour;
    private int businessRate;
    private boolean openOrClose;

}