package com.zegbit.moatix.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Member 4: OpenAPI / Swagger Configuration.
 * Documents all REST endpoints, schemas, parameters, and error responses for frontend consumers and team handovers.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI moatixOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Moatix Scam Detection REST API (Member 4)")
                .description("Central Application Backend REST API for the Moatix public scam checker.\n\n" +
                    "**Team Boundaries:**\n" +
                    "- Owned by Member 4 (REST Controllers, Validation, DTOs, Exception Handling)\n" +
                    "- Integrates with Member 5 (CheckOrchestrator, Persistence, Mock Detection Gateway)\n" +
                    "- Ready for Next.js frontend consumption (Members 2 & 3)\n\n" +
                    "*Note: In this phase, all returned classifications are simulated demonstration results clearly labelled as DEMO.*")
                .version("1.0.0")
                .contact(new Contact()
                    .name("ZegBit Engineering - Member 4")
                    .email("backend-api@zegbit.com"))
                .license(new License()
                    .name("Proprietary - ZegBit")
                    .url("https://zegbit.com")))
            .servers(List.of(
                new Server().url("http://localhost:8080").description("Local Development Server")
            ));
    }
}
