package com.popmap.backend;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/businesses")
public class BusinessController {

    private final BusinessRepository businessRepository;

    public BusinessController(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @GetMapping
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }
}