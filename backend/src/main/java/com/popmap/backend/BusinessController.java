package com.popmap.backend;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/businesses")
public class BusinessController {

    @GetMapping
    public List<Business> getAllBusinesses() {
        // Replace with actual business retrieval logic
        return List.of(
                new Business("1", "Business 1", "Category 1"),
                new Business("2", "Business 2", "Category 2")
        );
    }
}