package com.popmap.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReviewControllerTest {

    private ReviewRepository repository;
    private ReviewController controller;

    @BeforeEach
    void setUp() {
        repository = mock(ReviewRepository.class);
        controller = new ReviewController(repository);
    }

    @Test
    void rejectsInvalidRatingsWithoutSaving() {
        Double[] invalidRatings = {
            null, 0.0, -1.0, 6.0, 4.5,
            Double.NaN, Double.POSITIVE_INFINITY
        };

        for (Double rating : invalidRatings) {
            var request = new ReviewController.ReviewRequest(
                    rating, "Great service!"
            );

            var response = controller.createReview("1", request);

            assertEquals(
                    400,
                    response.getStatusCode().value(),
                    "Expected rejection for rating: " + rating
            );
        }

        verifyNoInteractions(repository);
    }

    @Test
    void rejectsBlankCommentsWithoutSaving() {
        String[] invalidComments = {null, "", "   ", "\t\n"};

        for (String text : invalidComments) {
            var request = new ReviewController.ReviewRequest(5.0, text);

            var response = controller.createReview("1", request);

            assertEquals(400, response.getStatusCode().value());
        }

        verifyNoInteractions(repository);
    }

    @Test
    void rejectsCommentsOver2000CharactersWithoutSaving() {
        var request = new ReviewController.ReviewRequest(
                5.0, "a".repeat(2001)
        );

        var response = controller.createReview("1", request);

        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(repository);
    }

    @Test
    void savesValidReviewAndTrimsComment() {
        when(repository.save(any(Review.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        var request = new ReviewController.ReviewRequest(
                5.0, "  Great service!  "
        );

        var response = controller.createReview("1", request);

        assertEquals(201, response.getStatusCode().value());

        Review savedReview = assertInstanceOf(
                Review.class, response.getBody()
        );

        assertEquals("1", savedReview.getBusinessId());
        assertEquals(5, savedReview.getRating());
        assertEquals("Great service!", savedReview.getText());

        verify(repository).save(same(savedReview));
    }
}