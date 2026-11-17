import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import { apiRequest } from "./api";

interface Review {
  id: number;
  businessId: string;
  rating: number;
  text: string;
}

interface ReviewsScreenProps {
  businessId: number;
}

export const ReviewsScreen = ({
  businessId,
}: ReviewsScreenProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentRating, setCurrentRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const submissionInProgress = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      setIsLoading(true);
      setLoadError("");
      setReviews([]);

      try {
        const data = await apiRequest<Review[]>(
          `/businesses/${businessId}/reviews`
        );

        if (!Array.isArray(data)) {
          throw new Error("The server returned an invalid review list.");
        }

        if (active) setReviews(data);
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Could not load reviews."
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadReviews();

    return () => {
      active = false;
    };
  }, [businessId, reloadKey]);

  const overallRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings yet";

  const handleSubmit = async () => {
    if (submissionInProgress.current || isLoading || loadError) return;

    setSubmitError("");

    const rating = Number(currentRating);
    const text = reviewText.trim();

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setSubmitError("Choose a whole-number rating from 1 to 5.");
      return;
    }

    if (!text) {
      setSubmitError("Please write a comment before submitting.");
      return;
    }

    if (text.length > 2000) {
      setSubmitError("Comments must be 2000 characters or fewer.");
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);

    try {
      const savedReview = await apiRequest<Review>(
        `/businesses/${businessId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, text }),
        }
      );

      if (!mounted.current) return;

      setReviews((previous) => [savedReview, ...previous]);
      setCurrentRating("");
      setReviewText("");
      setSubmitError("");
      setIsReviewing(false);
    } catch (error) {
      if (mounted.current) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Could not save your review. Please try again."
        );
      }
    } finally {
      submissionInProgress.current = false;

      if (mounted.current) setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (submissionInProgress.current) return;

    setCurrentRating("");
    setReviewText("");
    setSubmitError("");
    setIsReviewing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Overall Rating: {overallRating}
      </Text>

      <Text style={styles.subHeader}>
        Total Reviews: {reviews.length}
      </Text>

      {isLoading ? (
        <Text>Loading reviews...</Text>
      ) : loadError ? (
        <View>
          <Text style={styles.error}>{loadError}</Text>
          <Button
            title="Retry"
            onPress={() => setReloadKey((value) => value + 1)}
          />
        </View>
      ) : (
        <>
          {!isReviewing ? (
            <Button
              title="Write a Review"
              onPress={() => {
                setSubmitError("");
                setIsReviewing(true);
              }}
            />
          ) : (
            <View style={styles.form}>
              <Text>Rate this business (1–5 stars):</Text>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={currentRating}
                onChangeText={setCurrentRating}
                placeholder="e.g., 5"
                editable={!isSubmitting}
                accessibilityLabel="Rating from 1 to 5"
              />

              <Text>Tell us about your experience:</Text>

              <TextInput
                style={[styles.input, styles.textArea]}
                value={reviewText}
                onChangeText={setReviewText}
                placeholder="Leave your review..."
                multiline
                maxLength={2000}
                editable={!isSubmitting}
                accessibilityLabel="Review comment"
              />

              {!!submitError && (
                <Text style={styles.error} accessibilityRole="alert">
                  {submitError}
                </Text>
              )}

              <View style={styles.buttonRow}>
                <Button
                  title={isSubmitting ? "Saving..." : "Submit Review"}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />

                <Button
                  title="Cancel"
                  color="red"
                  onPress={handleCancel}
                  disabled={isSubmitting}
                />
              </View>
            </View>
          )}

          <Text style={styles.reviewsTitle}>Recent Reviews:</Text>

          <FlatList
            data={reviews}
            keyExtractor={(item) => String(item.id)}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text>No reviews yet. Be the first to leave one!</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Text style={styles.reviewStars}>
                  {item.rating} Stars
                </Text>
                <Text>{item.text}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  reviewItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reviewStars: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  error: {
    color: "#b00020",
    marginBottom: 12,
  },
});