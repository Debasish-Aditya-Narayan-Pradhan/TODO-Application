package com.demo.todo.Config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class Config implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("POST","GET","PUT","DELETE")
                .allowedOrigins("http://localhost:5173")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
