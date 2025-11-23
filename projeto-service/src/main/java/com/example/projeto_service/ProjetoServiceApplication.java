package com.example.projeto_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ProjetoServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjetoServiceApplication.class, args);
    }
}