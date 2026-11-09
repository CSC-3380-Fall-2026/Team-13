package com.popmap.backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String businessId;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false, length = 2000)
    private String text;

    protected Review() {
    }

    public Review(String businessId, int rating, String text) {
        this.businessId = businessId;
        this.rating = rating;
        this.text = text;
    }

    // Getters
    public Long getId() { return id; }
    public String getBusinessId() { return businessId; }
    public int getRating() { return rating; }
    public String getText() { return text; }
}