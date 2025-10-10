package com.trustscan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.trustscan.model")
@EnableJpaRepositories("com.trustscan.dao")
public class HealthcareApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(HealthcareApplication.class, args);
    }
}