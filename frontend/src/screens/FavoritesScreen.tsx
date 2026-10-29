import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FavoritesScreenProps {
  favorites: string[];
  onToggleFavorite: (businessName: string) => void;
  onViewBusiness: (businessName: string) => void;
  onNavigate: (screen: string) => void;
}

interface Business {
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
}

export default function FavoritesScreen({
  favorites,
  onToggleFavorite,
  onViewBusiness,
  onNavigate,
}: FavoritesScreenProps) {
  const businesses: Business[] = [
    {
      name: "Juniper & Grain",
      category: "Food",
      distance: "0.3 mi",
      rating: 4.9,
      reviews: 128,
    },
    {
      name: "North & Pine",
      category: "Shopping",
      distance: "0.6 mi",
      rating: 4.8,
      reviews: 94,
    },
    {
      name: "Common Ground Studio",
      category: "Services",
      distance: "0.8 mi",
      rating: 4.7,
      reviews: 76,
    },
    {
      name: "Little Bird Bakery",
      category: "Food",
      distance: "1.1 mi",
      rating: 4.9,
      reviews: 203,
    },
  ];

  const favoriteBusinesses = businesses.filter(
    (business) => favorites.includes(business.name)
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>POPMAP</Text>

        <Text style={styles.heading}>Your favorites.</Text>

        <Text style={styles.subtitle}>
          Keep track of the local places you love.
        </Text>

        {favoriteBusinesses.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="heart-outline"
              size={48}
              color="#ff6b21"
            />

            <Text style={styles.emptyTitle}>
              No favorites yet
            </Text>

            <Text style={styles.emptyText}>
              Tap the heart on a business to save it here.
            </Text>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => onNavigate("search")}
            >
              <Text style={styles.exploreButtonText}>
                Explore Businesses
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {favoriteBusinesses.map((business) => (
          <View
            style={styles.businessCard}
            key={business.name}
          >
            <View style={styles.cardTop}>
              <View style={styles.businessInfo}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name={
                      business.category === "Food"
                        ? "restaurant-outline"
                        : business.category === "Shopping"
                        ? "bag-outline"
                        : "sparkles-outline"
                    }
                    size={23}
                    color="#ff6b21"
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.businessName}>
                    {business.name}
                  </Text>

                  <Text style={styles.businessDetails}>
                    {business.category} • {business.distance}
                  </Text>

                  <View style={styles.ratingRow}>
                    <Ionicons
                      name="star"
                      size={15}
                      color="#ff6b21"
                    />

                    <Text style={styles.rating}>
                      {business.rating} ({business.reviews})
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  onToggleFavorite(business.name)
                }
              >
                <Ionicons
                  name="heart"
                  size={24}
                  color="#ff6b21"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                onViewBusiness(business.name)
              }
            >
              <Text style={styles.viewButtonText}>
                View Business
              </Text>

              <Ionicons
                name="arrow-forward"
                size={16}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("map")}
        >
          <Ionicons
            name="map-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("search")}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("favorites")}
        >
          <View style={styles.activeNavIcon}>
            <Ionicons
              name="heart"
              size={20}
              color="#ff6b21"
            />
          </View>

          <Text style={styles.activeNavText}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("profile")}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fbf8f3",
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  logo: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ff6b21",
    letterSpacing: 2,
    marginBottom: 8,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#171717",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
    marginBottom: 24,
  },

  emptyContainer: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#171717",
    marginTop: 14,
  },

  emptyText: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
  },

  exploreButton: {
    backgroundColor: "#151515",
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginTop: 20,
  },

  exploreButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  businessCard: {
    backgroundColor: "#ffffff",
    borderRadius: 17,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  businessInfo: {
    flexDirection: "row",
    flex: 1,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#fff1e8",
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    marginLeft: 13,
    flex: 1,
  },

  businessName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#171717",
  },

  businessDetails: {
    marginTop: 3,
    fontSize: 13,
    color: "#777777",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  rating: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "#444444",
  },

  viewButton: {
    height: 39,
    backgroundColor: "#151515",
    borderRadius: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  viewButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 6,
  },

  bottomSpace: {
    height: 90,
  },

  nav: {
    height: 78,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },

  navItem: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontSize: 11,
    color: "#999999",
    marginTop: 4,
  },

  activeNavIcon: {
    width: 34,
    height: 28,
    borderRadius: 15,
    backgroundColor: "#fff1e8",
    justifyContent: "center",
    alignItems: "center",
  },

  activeNavText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ff6b21",
    marginTop: 3,
  },
});