package com.popmap.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/businesses")
@CrossOrigin(origins = "*") // Allows your React Native app to send data here
public class BusinessController {

    @Autowired
    private BusinessRepository businessRepository;

    // This catches the JSON from your frontend form and saves it to the H2 database
    @PostMapping
    public Business createBusiness(@RequestBody Business business) {
        return businessRepository.save(business);
    }

    // This returns all real businesses from the database (replacing the fake data)
    @GetMapping
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }
}
