
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function BusinessDetailsScreen() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Business Header */}
      <View style={styles.header}>
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>Bayou Bites</Text>
          <Text style={styles.category}>Restaurant</Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <Text style={styles.favorite}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Business Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStar}>★</Text>
        <Text style={styles.rating}>4.8 / 5.0</Text>
      </View>

      {/* Business Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>
          A local Baton Rouge business serving fresh food
          and providing a welcoming experience for the
          community.
        </Text>
      </View>

      {/* Business Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Hours</Text>

        <Text style={styles.text}>
          Monday - Friday: 9:00 AM - 7:00 PM
        </Text>

        <Text style={styles.text}>
          Saturday - Sunday: 10:00 AM - 5:00 PM
        </Text>
      </View>

      {/* Business Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>

        <Text style={styles.text}>
          Baton Rouge, Louisiana
        </Text>
      </View>

      {/* Customer Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>

        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>
              PopMap User
            </Text>

            <Text style={styles.reviewRating}>
              ★★★★★
            </Text>
          </View>

          <Text style={styles.reviewText}>
            Great service and a really welcoming
            atmosphere! I would definitely recommend
            visiting this business.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },

  businessInfo: {
    flex: 1,
    marginRight: 12,
  },

  businessName: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
  },

  category: {
    fontSize: 17,
    color: '#666666',
    marginTop: 5,
  },

  favoriteButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  favorite: {
    fontSize: 36,
    color: '#E63946',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  ratingStar: {
    fontSize: 24,
    color: '#F4B400',
    marginRight: 8,
  },

  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },

  section: {
    marginTop: 28,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    lineHeight: 25,
    color: '#444444',
  },

  reviewCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },

  reviewRating: {
    fontSize: 17,
    color: '#F4B400',
  },

  reviewText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#444444',
  },
});
