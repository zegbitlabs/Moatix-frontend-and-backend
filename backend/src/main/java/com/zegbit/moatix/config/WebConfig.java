package com.zegbit.moatix.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Member 4: Secure CORS Configuration.
 * Restricts cross-origin resource sharing to approved frontend development origins without using wildcards with credentials.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${moatix.cors.allowed-origins:http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Content-Type", "Authorization", "Accept", "X-Requested-With", "Origin")
                .exposedHeaders("X-Request-Id")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
