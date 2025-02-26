package com.peeppeep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class PeeppeepApplication {

    public static void main(String[] args) {
        SpringApplication.run(PeeppeepApplication.class, args);
    }

}
