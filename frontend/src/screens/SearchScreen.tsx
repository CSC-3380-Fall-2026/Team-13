import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchScreenProps {
  onViewBusiness: (businessName: string) => void;
  onNavigate: (screen: string) => void;
  favorites: string[];
  onToggleFavorite: (businessName: string) => void;
}

interface Business {
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
}

export default function SearchScreen({
  onViewBusiness,
  onNavigate,
  favorites,
  onToggleFavorite,
}: SearchScreenProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

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

  const filters = [
    "All",
    "Food",
    "Shopping",
    "Services",
    "Top Rated",
  ];

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    let matchesFilter = true;

    if (selectedFilter === "Food") {
      matchesFilter = business.category === "Food";
    }

    if (selectedFilter === "Shopping") {
      matchesFilter = business.category === "Shopping";
    }

    if (selectedFilter === "Services") {
      matchesFilter = business.category === "Services";
    }

    if (selectedFilter === "Top Rated") {
      matchesFilter = business.rating >= 4.8;
    }

    return matchesSearch && matchesFilter;
  });

  function getBusinessIcon(category: string) {
    if (category === "Food") {
      return "restaurant-outline";
    }

    if (category === "Shopping") {
      return "bag-outline";
    }

    return "sparkles-outline";
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>POPMAP</Text>

        <Text style={styles.heading}>
          Find your new local favorite.
        </Text>

        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search local businesses"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter &&
                  styles.activeFilterButton,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter &&
                    styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Nearby places</Text>

        {filteredBusinesses.map((business) => {
          const isFavorite = favorites.includes(
            business.name
          );

          return (
            <View
              style={styles.businessCard}
              key={business.name}
            >
              <View style={styles.cardTop}>
                <View style={styles.businessInfo}>
                  <View style={styles.iconBox}>
                    <Ionicons
                      name={getBusinessIcon(
                        business.category
                      )}
                      size={23}
                      color="#ff6b21"
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.businessName}>
                      {business.name}
                    </Text>

                    <Text style={styles.businessDetails}>
                      {business.category} •{" "}
                      {business.distance}
                    </Text>

                    <View style={styles.ratingRow}>
                      <Ionicons
                        name="star"
                        size={15}
                        color="#ff6b21"
                      />

                      <Text style={styles.rating}>
                        {business.rating} (
                        {business.reviews})
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
                    name={
                      isFavorite
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color={
                      isFavorite
                        ? "#ff6b21"
                        : "#777"
                    }
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
          );
        })}

        {filteredBusinesses.length === 0 && (
          <Text style={styles.noResults}>
            No businesses found.
          </Text>
        )}

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
          <View style={styles.activeNavIcon}>
            <Ionicons
              name="search"
              size={20}
              color="#ff6b21"
            />
          </View>

          <Text style={styles.activeNavText}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("favorites")}
        >
          <Ionicons
            name="heart-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>
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
    marginBottom: 22,
  },

  searchBar: {
    height: 48,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#222222",
  },

  filterScroll: {
    marginBottom: 25,
  },

  filterButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginRight: 9,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },

  activeFilterButton: {
    backgroundColor: "#ff6b21",
    borderColor: "#ff6b21",
  },

  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666666",
  },

  activeFilterText: {
    color: "#ffffff",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#171717",
    marginBottom: 14,
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

  noResults: {
    textAlign: "center",
    marginTop: 30,
    color: "#777777",
    fontSize: 14,
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