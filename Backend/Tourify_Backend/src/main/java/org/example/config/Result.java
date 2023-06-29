package org.example.config;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.example.bean.util.ResponseCode;


/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 15/06/2023
 */

@Data
@Schema(description = "General response message")
public class Result<T> {

    @Schema(description = "Message")
    private String msg;

    @Schema(description = "Message code")
    private Integer code;

    @Schema(description = "data")
    private T data;

    private Result() {
    }

    public static Result success() {
        Result result = new Result();
        result.data = null;
        result.code = ResponseCode.SUCCESS.getCode();
        result.msg = ResponseCode.SUCCESS.getMsg();
        return result;
    }

    public static Result success(Object data) {
        Result result = new Result();
        result.data = data;
        result.code = ResponseCode.SUCCESS.getCode();
        result.msg = ResponseCode.SUCCESS.getMsg();
        return result;
    }


    public static Result fail() {
        return fail();
    }

    public static Result fail(ResponseCode code) {
        Result result = new Result();
        if (code == null) {
            result.code = ResponseCode.INTERNAL_ERROR.getCode();
            result.msg = "ERROR";
        } else {
            result.code = code.getCode();
            result.msg = code.getMsg();
        }
        return result;
    }

    public static Result fail(String msg) {
        Result result = new Result();
        result.code = ResponseCode.INTERNAL_ERROR.getCode();
        result.msg = msg;
        return result;
    }

}