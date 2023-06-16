package org.example.controller;

import java.util.List;
import org.example.model.AttractionDO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.config.*;




@Tag(name = "Attraction API", description = "Desc for Attraction API")
@RestController
@RequestMapping("/v1")
public class AttractionController {

    @Autowired AttractionRepository attractionRepository;

    //getMapping注解用于将/greeting的http请求定向到greeting方法上
    //@PostMapping, @RequestMapping等
    @GetMapping("")
    @Operation(summary = "return greeting string", description = "testing return string")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @PostMapping("/addAttraction")
    @Operation(summary = "adding attractions", description = "adding attractions to the mongoDB database")
    public Result addAttraction(@RequestBody AttractionDO attraction) {
        System.out.println("1");
        attractionRepository.saveAttraction(attraction);
        return Result.success(attraction);
    }

    @GetMapping("/findAttraction")
    @Operation(summary = "find an attraction", description = "find an attraction by the name")
    public Result findAttraction(@RequestParam(value = "name") String name) throws BusinessException {
        AttractionDO attractionDO = attractionRepository.findAttractionByName(name);
        if (attractionDO == null) {
            return Result.fail(ResponseCode.PARAM_ATTRACTION_EMPTY);
        } else {
            return Result.success(attractionDO);
        }
    }

    @GetMapping("/getAllAttraction")
    @Operation(summary = "get all attraction", description = "get all attraction")
    public Result getAttraction() {
        List<AttractionDO> attractionDOList = attractionRepository.getAllAttraction();
        if (attractionDOList.isEmpty()) {
            return Result.fail("Attraction List is empty.");
        } else {
            return Result.success(attractionDOList);
        }
    }
}