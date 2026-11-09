package com.popmap.backend; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    // By extending JpaRepository, Spring Boot automatically gives us
    // the ability to use .save(), .findAll(), and .findById() without writing any SQL.
}