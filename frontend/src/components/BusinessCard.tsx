
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type BusinessCardProps = {
  name: string;
  category: string;
  location: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
};

export default function BusinessCard({
  name,
  category,
  location,
  isFavorite = false,
  onPress,
  onFavoritePress,
}: BusinessCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.businessInfo}
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel={`View ${name}`}
      >
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.category}>
          {category}
        </Text>

        <Text style={styles.location}>
          {location}
        </Text>
      </TouchableOpacity>

      {onFavoritePress && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite
              ? `Remove ${name} from favorites`
              : `Add ${name} to favorites`
          }
        >
          <Text
            style={[
              styles.heart,
              isFavorite && styles.activeHeart,
            ]}
          >
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  businessInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
  },
  category: {
    fontSize: 14,
    color: "#666666",
    marginTop: 6,
  },
  location: {
    fontSize: 13,
    color: "#888888",
    marginTop: 5,
  },
  favoriteButton: {
    padding: 10,
  },
  heart: {
    fontSize: 26,
    color: "#888888",
  },
  activeHeart: {
    color: "#E85D75",
  },
});
