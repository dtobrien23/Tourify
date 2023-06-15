package org.example.controller;

import org.example.model.AttractionDO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;


@Tag(name = "Attraction API", description = "Desc for Attraction API")
@RestController
@RequestMapping("/v1")
public class AttractionController {

    @Autowired AttractionRepository attractionRepository;

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    //getMapping注解用于将/greeting的http请求定向到greeting方法上
    //@PostMapping, @RequestMapping等
    @GetMapping("")
    @Operation(summary = "return greeting string", description = "testing return string")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @GetMapping("/addAttraction")
    @Operation(summary = "adding attractions", description = "adding attractions to the mongoDB database")
    public AttractionDO addAttraction(@RequestParam(value = "name", defaultValue = "World") String name) {
        AttractionDO attractionDO = new AttractionDO("id germinated", name);
        attractionRepository.saveAttraction(attractionDO);
        return attractionDO;
    }

    @GetMapping("/findAttraction")
    @Operation(summary = "find an attraction", description = "find an attraction by the name")
    public AttractionDO findAttraction(@RequestParam(value = "name") String name) {
        AttractionDO attractionDO = attractionRepository.findAttractionByName(name);
        return attractionDO;
    }

}