package org.example.bean.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 12/07/2023
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Attraction prediction info")
public class AttractionPredictionDTO {

    @NotNull
    @Schema(description = "current temperature in Fahrenheit")
    private float temperature;

    @NotNull
    @Schema(description = "current precipitation level in inches")
    private float precipitation;
}
