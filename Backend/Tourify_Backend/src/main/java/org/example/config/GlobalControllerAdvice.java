package org.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 27/06/2023
 */
@RestControllerAdvice
public class GlobalControllerAdvice {

    @Value("${spring.profiles.active}")
    private String profile;

    /**
     * JavaBean data bond handler
     * JavaBean 数据绑定异常处理
     *
     * @param exception
     * @return
     */
    @ExceptionHandler(BindException.class)
    public Result handleException(BindException e) {
        String message = e.getBindingResult().getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.joining());
        return Result.fail(ResponseCode.getByName(message));
    }

    /**
     * Global business exception handler
     * 全局业务异常处理
     *
     * @param exception
     * @return
     */
    @ExceptionHandler(BusinessException.class)
    public Result handleException(BusinessException exception) {
        exception.printStackTrace();
        return Result.fail(exception.getResponseCode());
    }

    /**
     * Global exception handler
     * 全局异常处理
     *
     * @param exception
     * @return
     */
    @ExceptionHandler(Exception.class)
    public Result handleException(Exception exception) {
        exception.printStackTrace();
        return Result.fail(exception.getMessage());
    }
}
