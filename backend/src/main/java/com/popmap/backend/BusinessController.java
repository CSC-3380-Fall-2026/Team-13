package com.popmap.backend;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/businesses")
@CrossOrigin(origins = "*")
public class BusinessController {

    private final BusinessRepository businessRepository;

    public BusinessController(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @GetMapping
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createBusiness(@RequestBody Business business) {
        if (business.getName() == null || business.getName().isBlank()
                || business.getLocation() == null
                || business.getLocation().isBlank()) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Business name and location are required.")
            );
        }

        String[] shortFields = {
            business.getName(),
            business.getLocation(),
            business.getCategory(),
            business.getHours()
        };

        for (String field : shortFields) {
            if (field != null && field.length() > 255) {
                return ResponseEntity.badRequest().body(
                        Map.of("message",
                                "Name, location, category, and hours must each be 255 characters or fewer.")
                );
            }
        }

        if ((business.getDescription() != null
                && business.getDescription().length() > 2000)
                || (business.getProducts() != null
                && business.getProducts().length() > 2000)) {
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            "Description and products must each be 2000 characters or fewer.")
            );
        }

        business.setId(null);
        business.setName(business.getName().strip());
        business.setLocation(business.getLocation().strip());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(businessRepository.save(business));
    }
}