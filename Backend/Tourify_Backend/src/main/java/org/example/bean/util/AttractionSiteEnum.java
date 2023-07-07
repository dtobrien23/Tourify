package org.example.bean.util;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 28/06/2023
 */

public enum AttractionSiteEnum {

    INDOOR(0),
    OUTDOOR(1),
    HYBRID(2);

    private Integer value;

    AttractionSiteEnum(int value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }
}


