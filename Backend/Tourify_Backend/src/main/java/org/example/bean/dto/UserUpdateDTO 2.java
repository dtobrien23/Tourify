package org.example.bean.dto;

import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;


/**
 * Description of the class.
 *
 * @author lvyongjie
 * @created 05/07/2023
 */

@Data
@Schema(description = "User update info")
public class UserUpdateDTO {

    @NotNull
    @Schema(description = "current user's id_token")
    private String id_token;

    @NotNull
    @Schema(description = "Update attraction status using attraction_id")
    private String attraction_id;

    // TODO: add in base64 decode

    @NotNull
    @Schema(description = "User's current geo Latitude")
    private Double lat;

    @NotNull
    @Schema(description = "User's current geo longitude")
    private Double lng;


}
