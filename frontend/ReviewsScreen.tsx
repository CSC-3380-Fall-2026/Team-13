import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Review {
  id: number;
  rating: number;
  text: string;
}

const StarInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) => (
  <View style={styles.starRow}>
    {[1, 2, 3, 4, 5].map((n) => (
      <TouchableOpacity key={n} onPress={() => onChange(n)} accessibilityLabel={`${n} stars`}>
        <Text style={[styles.star, n <= value && styles.starActive]}>★</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentRating, setCurrentRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const overallRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  const handleSubmit = () => {
    if (!reviewText.trim()) return;
    setReviews((prev) => [
      { id: Date.now(), rating: currentRating, text: reviewText.trim() },
      ...prev,
    ]);
    setReviewText('');
    setCurrentRating(5);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Overall Rating: {overallRating} / 5</Text>
      <Text style={styles.count}>
        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
      </Text>

      <StarInput value={currentRating} onChange={setCurrentRating} />

      <TextInput
        style={styles.input}
        placeholder="Leave your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>

      <FlatList
        data={reviews}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.review}>
            <Text style={styles.reviewStars}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No reviews yet.</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  count: { color: '#666', marginBottom: 12 },
  starRow: { flexDirection: 'row', marginBottom: 12 },
  star: { fontSize: 32, color: '#ccc', marginRight: 4 },
  starActive: { color: '#f5b301' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  review: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 },
  reviewStars: { color: '#f5b301', fontSize: 16 },
  empty: { textAlign: 'center', color: '#888', marginTop: 20 },
});