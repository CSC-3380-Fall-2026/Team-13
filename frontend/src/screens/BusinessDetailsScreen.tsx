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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.businessName}>Bayou Bites</Text>
          <Text style={styles.category}>Restaurant</Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Text style={styles.favorite}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.rating}>★ 4.8</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>
          A local Baton Rouge business serving fresh food and providing
          a welcoming experience for the community.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hours</Text>
        <Text style={styles.text}>Monday - Friday: 9:00 AM - 7:00 PM</Text>
        <Text style={styles.text}>Saturday - Sunday: 10:00 AM - 5:00 PM</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.text}>Baton Rouge, LA</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewRating}>★★★★★</Text>
          <Text style={styles.reviewText}>
            Great service and a really welcoming atmosphere!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },

  businessName: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  category: {
    fontSize: 17,
    marginTop: 5,
  },

  favoriteButton: {
    padding: 10,
  },

  favorite: {
    fontSize: 36,
  },

  rating: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: '600',
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
  },

  reviewCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 12,
  },

  reviewRating: {
    fontSize: 18,
    marginBottom: 8,
  },

  reviewText: {
    fontSize: 16,
  },
});