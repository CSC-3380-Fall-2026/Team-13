package com.popmap.backend; // ⚠️ Update this to match your actual package name at the top!

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Required fields based on your frontend validation
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    private String category;
    private String hours;

    // Giving descriptions and products more character space in the database
    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String products;

    // Default constructor (Required by Spring Boot/JPA)
    public Business() {}

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getHours() { return hours; }
    public void setHours(String hours) { this.hours = hours; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProducts() { return products; }
    public void setProducts(String products) { this.products = products; }
}