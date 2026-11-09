package com.popmap.backend;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/businesses/{businessId}/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping
    public List<Review> getReviews(@PathVariable String businessId) {
        return reviewRepository.findByBusinessIdOrderByIdDesc(businessId);
    }

    @PostMapping
    public ResponseEntity<?> createReview(
            @PathVariable String businessId,
            @RequestBody ReviewRequest request) {

        Double rating = request.rating();

        if (rating == null || !Double.isFinite(rating)
                || rating < 1 || rating > 5
                || rating != Math.floor(rating)) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Please choose a whole-number rating from 1 to 5.")
            );
        }

        if (request.text() == null || request.text().isBlank()) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Please write a comment before submitting.")
            );
        }

        String text = request.text().strip();

        if (text.length() > 2000) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Comments must be 2000 characters or fewer.")
            );
        }

        Review review = new Review(businessId, rating.intValue(), text);
        Review savedReview = reviewRepository.save(review);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    public record ReviewRequest(Double rating, String text) {
    }
}