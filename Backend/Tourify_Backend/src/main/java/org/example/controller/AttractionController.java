package org.example.controller;

import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.example.bean.model.AttractionDO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.bean.util.ResponseCode;
import org.example.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.config.*;
import ai.onnxruntime.*;
import java.time.LocalDateTime;



@CrossOrigin
@Tag(name = "Attraction API", description = "Desc for Attraction API")
@RestController
@RequestMapping("/attraction")
public class AttractionController {

    @Autowired AttractionRepository attractionRepository;

    //getMapping注解用于将/greeting的http请求定向到greeting方法上
    //@PostMapping, @RequestMapping等
    @GetMapping("/test")
    @Operation(summary = "return greeting string", description = "testing return string (testing)")
    public String index() {
        return "Greetings from Spring Boot!";
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

    @GetMapping("/getPrediction")
    @Operation(summary = "get the attraction prediction", description = "get the attraction prediction using ONNX file (connecting ONNX)")
    public Result getPredictAttraction() {
                try (OrtEnvironment env = OrtEnvironment.getEnvironment();
                     OrtSession.SessionOptions options = new OrtSession.SessionOptions()) {
                    // load the model
                    String currentWorkingDir = System.getProperty("user.dir");
                    String modelPath = currentWorkingDir + "/Tourify_Backend/src/main/resources/model.onnx";
                    try (OrtSession session = env.createSession(modelPath, options)) {
                        // create the input
                        long[][] longArray = new long[1][9];
                        longArray[0][0] = 1L;
                        longArray[0][1] = 2L;
                        longArray[0][2] = 3L;
                        longArray[0][3] = 4L;
                        longArray[0][4] = 5L;
                        longArray[0][5] = 6L;
                        longArray[0][6] = 7L;
                        longArray[0][7] = 7L;
                        longArray[0][8] = 12L;
                        OnnxTensor tensor = OnnxTensor.createTensor(env, longArray);
                        // Create a map to hold the input tensor
                        HashMap<String, OnnxTensor> inputs = new HashMap<>();
                        inputs.put("integer_input", tensor); // Replace "input_name" with the actual name of your model's input
                        // run the model
                        try (OrtSession.Result results = session.run(inputs)) {
                            // get the output
                            float[][] output = (float[][]) ((OnnxTensor)results.get(0)).getValue();
                            System.out.println("Predicted: " + output[0][0]);  // modify this to suit your output shape
                        }
                    }
                } catch (OrtException e) {
                    e.printStackTrace();
                }
    return Result.success();
    }


}