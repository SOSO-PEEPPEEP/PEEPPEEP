package com.peeppeep.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${FRONT_WEB_BASE_URL}")
    private String frontWebBaseUrl;

    @Value("${FRONT_MOBILE_BASE_URL}")
    private String frontMobileBaseUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontWebBaseUrl, frontMobileBaseUrl) // Expo 앱의 로컬/모바일 IP
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
