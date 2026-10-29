import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';

interface Review {
  id: string;
  rating: number;
  text: string;
}

export const ReviewsScreen = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentRating, setCurrentRating] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  
  // State to handle the "Cancel/go back" flow
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const overallRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleSubmit = () => {
    // Basic Validation
    const ratingNum = Number(currentRating);
    if (!currentRating || Number.isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      Alert.alert("Validation Error", "Please enter a valid rating between 1 and 5 stars.");
      return;
    }
    if (!reviewText.trim()) {
      Alert.alert("Validation Error", "Please type a review before submitting.");
      return;
    }

    // Submit the review and display submitted info
    setReviews([{ id: Date.now().toString(), rating: ratingNum, text: reviewText }, ...reviews]);
    
    // Reset form and close it
    setReviewText('');
    setCurrentRating('');
    setIsReviewing(false);
  };

  const handleCancel = () => {
    // Clear inputs and go back
    setReviewText('');
    setCurrentRating('');
    setIsReviewing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overall Rating: {overallRating} ⭐</Text>
      <Text style={styles.subHeader}>Total Reviews: {reviews.length}</Text>

      {/* Toggles between the "Write a Review" button and the actual form */}
      {!isReviewing ? (
        <Button title="Write a Review" onPress={() => setIsReviewing(true)} />
      ) : (
        <View style={styles.form}>
          <Text>Rate this business (1-5 stars):</Text>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            value={currentRating}
            onChangeText={setCurrentRating}
            maxLength={1}
            placeholder="e.g., 5"
          />
          <Text>Tell us about your experience:</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            placeholder="Leave your review..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
          />
          <View style={styles.buttonRow}>
            <Button title="Submit Review" onPress={handleSubmit} />
            <Button title="Cancel" color="red" onPress={handleCancel} />
          </View>
        </View>
      )}

      <Text style={styles.reviewsTitle}>Recent Reviews:</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewStars}>{item.rating} Stars</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold' },
  subHeader: { fontSize: 16, marginBottom: 20 },
  form: { marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  textArea: { height: 80, textAlignVertical: 'top' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  reviewItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  reviewStars: { fontWeight: 'bold', marginBottom: 5 },
  reviewsTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }
});