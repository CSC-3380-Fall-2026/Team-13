import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface BusinessDetailsProps {
  businessName: string;
  onBack: () => void;
}

export default function BusinessDetailsScreen({
  businessName,
  onBack,
}: BusinessDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const businessData = {
    "Juniper & Grain": {
      name: "Juniper & Grain",
      category: "Food",
      rating: "4.9 / 5.0",
      description:
        "A local favorite serving fresh food in a relaxed and welcoming atmosphere.",
      hoursWeek: "Monday - Friday: 7:00 AM - 6:00 PM",
      hoursWeekend: "Saturday - Sunday: 8:00 AM - 5:00 PM",
      location: "Baton Rouge, Louisiana",
    },

    "North & Pine": {
      name: "North & Pine",
      category: "Shopping",
      rating: "4.8 / 5.0",
      description:
        "A local shop offering unique products and a friendly shopping experience.",
      hoursWeek: "Monday - Friday: 10:00 AM - 7:00 PM",
      hoursWeekend: "Saturday - Sunday: 11:00 AM - 6:00 PM",
      location: "Baton Rouge, Louisiana",
    },

    "Common Ground Studio": {
      name: "Common Ground Studio",
      category: "Services",
      rating: "4.7 / 5.0",
      description:
        "A community-focused studio providing creative services in a welcoming environment.",
      hoursWeek: "Monday - Friday: 9:00 AM - 6:00 PM",
      hoursWeekend: "Saturday: 10:00 AM - 4:00 PM",
      location: "Baton Rouge, Louisiana",
    },

    "Little Bird Bakery": {
      name: "Little Bird Bakery",
      category: "Food",
      rating: "4.9 / 5.0",
      description:
        "A neighborhood bakery serving fresh baked goods and local favorites.",
      hoursWeek: "Monday - Friday: 7:00 AM - 5:00 PM",
      hoursWeekend: "Saturday - Sunday: 8:00 AM - 3:00 PM",
      location: "Baton Rouge, Louisiana",
    },
  };

  const business =
    businessData[businessName as keyof typeof businessData] ||
    businessData["Juniper & Grain"];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Business Header */}
      <View style={styles.header}>
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>
            {business.name}
          </Text>

          <Text style={styles.category}>
            {business.category}
          </Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Text style={styles.favorite}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Business Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStar}>★</Text>

        <Text style={styles.rating}>
          {business.rating}
        </Text>
      </View>

      {/* Business Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <Text style={styles.text}>
          {business.description}
        </Text>
      </View>

      {/* Business Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Business Hours
        </Text>

        <Text style={styles.text}>
          {business.hoursWeek}
        </Text>

        <Text style={styles.text}>
          {business.hoursWeekend}
        </Text>
      </View>

      {/* Business Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Location
        </Text>

        <Text style={styles.text}>
          {business.location}
        </Text>
      </View>

      {/* Customer Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Customer Reviews
        </Text>

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
    backgroundColor: "#fbf8f3",
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  backButton: {
    marginTop: 25,
    marginBottom: 10,
  },

  backText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ff6b21",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  businessInfo: {
    flex: 1,
    marginRight: 12,
  },

  businessName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#151515",
  },

  category: {
    fontSize: 17,
    color: "#666666",
    marginTop: 5,
  },

  favoriteButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  favorite: {
    fontSize: 36,
    color: "#E63946",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  ratingStar: {
    fontSize: 24,
    color: "#F4B400",
    marginRight: 8,
  },

  rating: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },

  section: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 18,
    borderRadius: 17,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 10,
  },

  text: {
    fontSize: 15,
    lineHeight: 23,
    color: "#555555",
  },

  reviewCard: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },

  reviewRating: {
    fontSize: 17,
    color: "#F4B400",
  },

  reviewText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#444444",
  },
});