package org.example.config;

import lombok.Getter;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 15/06/2023
 */


@Getter
public enum ResponseCode {
    SUCCESS(200, "response.message.success"),
    INTERNAL_ERROR(500, "response.message.internal.error"),
    PARAM_ATTRACTION_EMPTY(10001, "param.attraction.not.exist"),
    PARAM_USER_IDTOKEN_EMPTY(10002, "param.user.idtoken.not.exist"),
    PARAM_USER_IDTOKEN_NOT_VAILD(10003, "param.user.idtoken.not.valid");



    /**
     * status code
     */
    private Integer code;

    /**
     * status message
     */
    private String msg;

    ResponseCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static ResponseCode getByName(String name) {
        for (ResponseCode code : values()) {
            if (code.name().equals(name)) {
                return code;
            }
        }
        return null;
    }

}
