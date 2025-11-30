package com.resumeshortlist.resume_shortlist_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
public class HealthCheckController {

    @GetMapping
    public String healthCheck() {
        return "ResumeShortlist API is up and running!";
    }

}
