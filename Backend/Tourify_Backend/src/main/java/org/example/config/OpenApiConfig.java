package org.example.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * config class for the swagger
 *
 * @author lvyongjie
 * @created 14/06/2023
 */

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI initOpenAPI() {
        return new OpenAPI().info(
                new Info().title("Tourify Spring Boot Project API Doc").description("OpenAPI generated swagger doc").version("v1.0")
        );
    }
}