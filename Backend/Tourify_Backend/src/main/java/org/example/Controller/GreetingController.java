package org.example.Controller;

import org.example.model.GreetingDo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@Tag(name = "System API", description = "Desc for System API")
@RestController
@RequestMapping("/v1")
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    //getMapping注解用于将/greeting的http请求定向到greeting方法上
    //@PostMapping, @RequestMapping等
    @GetMapping("")
    @Operation(summary = "return greeting string", description = "返回你好字符串")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @GetMapping("/greeting")
    @Operation(summary = "greeting nums count", description = "访问次数计数")
    public GreetingDo greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new GreetingDo(counter.incrementAndGet(), String.format(template, name));
    }
}