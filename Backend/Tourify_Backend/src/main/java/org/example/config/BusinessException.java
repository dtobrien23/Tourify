package org.example.config;

import lombok.Data;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 15/06/2023
 */

@Data
public class BusinessException extends Exception {
    private ResponseCode responseCode;

    private BusinessException() {
    }

    public BusinessException(ResponseCode responseCode) {
        super(responseCode.getMsg());
        this.responseCode = responseCode;
    }
}
