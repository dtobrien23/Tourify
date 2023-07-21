package org.example.bean.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 17/07/2023
 */

@Data
@Schema(description = "Attraction one prediction info")
public class AttractionOnePredictionDTO {

    @NotNull
    @Schema(description = "the attraction's id")
    private String attraction_id;

    @NotNull
    @Schema(description = "24 hours of temperature in Fahrenheit")
    private List<Float> temperatures;

    @NotNull
    @Schema(description = "24 hours of precipitation level in inches")
    private List<Float> precipitation;

}