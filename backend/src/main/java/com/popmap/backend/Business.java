package com.popmap.backend;

public class Business {
    private String id;
    private String name;
    private String category;

    public Business(String id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
}