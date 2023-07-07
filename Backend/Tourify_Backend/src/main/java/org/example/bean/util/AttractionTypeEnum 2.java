package org.example.bean.util;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 28/06/2023
 */

public enum AttractionTypeEnum {

    LANDMARK(0),
    MUSEUM(1),
    PARK(2),
    THEATER(3),
    NEIGHBORHOOD(4),
    DINING(5),
    GALLERY(6),
    LIBRARY(7),
    HISTORIC_SITE(8),
    OBSERVATORY(9);

    private Integer value;

    AttractionTypeEnum(int value) {
        this.value = value;
    }

    public Integer getValue() {
        return value;
    }
}

