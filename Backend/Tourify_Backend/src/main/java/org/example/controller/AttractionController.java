package org.example.controller;

import java.util.List;
import java.time.LocalDateTime;

import org.example.bean.dto.AttractionOnePredictionDTO;
import org.example.bean.dto.AttractionPredictionDTO;
import org.example.bean.model.AttractionDO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.bean.util.ResponseCode;
import org.example.bean.vo.AttractionOnePredictionVO;
import org.example.bean.vo.AttractionPredictionVO;
import org.example.repository.AttractionRepository;
import org.example.service.AttractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.config.*;



@Tag(name = "Attraction API", description = "Desc for Attraction API")
@RestController
@RequestMapping("/attraction")
public class AttractionController {

    @Autowired AttractionRepository attractionRepository;
    @Autowired AttractionService attractionService;

    //getMapping注解用于将/greeting的http请求定向到greeting方法上
    //@PostMapping, @RequestMapping等
    @PostMapping("/feedback")
    @Operation(summary = "User feed back")
    public String index(@RequestBody String feedback) {
        return "Thank you for your feedback!";
    }

    @PostMapping("/addAttraction")
    @Operation(summary = "adding attractions", description = "adding attractions to the mongoDB database (connecting DB)")
    public Result addAttraction(@RequestBody AttractionDO attraction) {
        try {
            // set the creat time
            attraction.setCreat_time(LocalDateTime.now());
            // save the attraction
            attractionRepository.saveAttraction(attraction);
        }catch (Exception e) {
            return Result.fail("attraction insertion failure!");
        }
        return Result.success(attraction);
    }

    @GetMapping("/findAttraction")
    @Operation(summary = "find an attraction", description = "find an attraction by the attraction id (connecting DB)")
    public Result findAttraction(@RequestParam(value = "attraction_id") String attractionId) throws BusinessException {
        AttractionDO attractionDO = attractionRepository.findAttractionById(attractionId);
        if (attractionDO == null) {
            return Result.fail(ResponseCode.PARAM_ATTRACTION_EMPTY);
        } else {
            return Result.success(attractionDO);
        }
    }

    @GetMapping("/getAllAttraction")
    @Operation(summary = "get all attraction", description = "get all attraction (connecting DB)")
    public Result getAttraction() {
        List<AttractionDO> attractionDOList = attractionRepository.getAllAttraction();
        if (attractionDOList.isEmpty()) {
            return Result.fail("Attraction List is empty.");
        } else {
            return Result.success(attractionDOList);
        }
    }


    @GetMapping("/getAllPrediction")
    @Operation(summary = "get the ML attraction prediction", description = "get the ML attraction prediction for the current time")
    public Result<List<AttractionPredictionVO>> getAllPredictAttraction(AttractionPredictionDTO attractionPredictionDTO) {

        try {
            return Result.success(attractionService.getPrediction(attractionPredictionDTO));
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.fail("Prediction error!");
        }
    }

    @GetMapping("/getOnePrediction")
    @Operation(summary = "get the single attraction prediction", description = "get the single attraction prediction in future 24 hour")
    public Result<AttractionOnePredictionVO> getOnePredictAttraction(AttractionOnePredictionDTO attractionOnePredictionDTO) {

        try {
            return Result.success(attractionService.getOnePrediction(attractionOnePredictionDTO));
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.fail("ML Prediction error!");
        }
    }

}