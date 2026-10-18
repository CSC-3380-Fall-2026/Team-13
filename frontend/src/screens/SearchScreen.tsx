import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(["North & Pine"]);

  const businesses = [
    {
      name: "Juniper & Grain",
      category: "Food",
      distance: "0.3 mi",
      rating: 4.9,
      reviews: 128,
      icon: "restaurant-outline",
      iconColor: "#ff6b21",
      iconBackground: "#fff1e7",
    },
    {
      name: "North & Pine",
      category: "Shopping",
      distance: "0.6 mi",
      rating: 4.8,
      reviews: 94,
      icon: "bag-handle-outline",
      iconColor: "#1d9b73",
      iconBackground: "#e6f8f1",
    },
    {
      name: "Common Ground Studio",
      category: "Services",
      distance: "0.8 mi",
      rating: 4.7,
      reviews: 76,
      icon: "sparkles-outline",
      iconColor: "#7a4cff",
      iconBackground: "#f0ebff",
    },
    {
      name: "Little Bird Bakery",
      category: "Food",
      distance: "1.1 mi",
      rating: 4.9,
      reviews: 203,
      icon: "restaurant-outline",
      iconColor: "#cf651c",
      iconBackground: "#fff5d9",
    },
  ];

  const filters = ["All", "Food", "Shopping", "Services", "Top Rated"];

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
      matchesFilter = business.rating >= 4.9;
    }

    return matchesSearch && matchesFilter;
  });

  function toggleFavorite(name: string) {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((favorite) => favorite !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>POPMAP</Text>

            <Text style={styles.title}>
              Find your new{"\n"}local favorite.
            </Text>
          </View>

          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map-outline" size={21} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={19} color="#a8a8a8" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filter,
                selectedFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Nearby heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby places</Text>

          <Text style={styles.results}>
            {filteredBusinesses.length} results
          </Text>
        </View>

        {/* Business cards */}
        {filteredBusinesses.map((business) => {
          const isFavorite = favorites.includes(business.name);

          return (
            <View style={styles.card} key={business.name}>
              <View
                style={[
                  styles.businessIcon,
                  { backgroundColor: business.iconBackground },
                ]}
              >
                <Ionicons
                  name={business.icon as any}
                  size={22}
                  color={business.iconColor}
                />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.businessName}>{business.name}</Text>

                <Text style={styles.businessDetails}>
                  {business.category} • {business.distance}
                </Text>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={15} color="#ffb000" />

                  <Text style={styles.rating}>{business.rating}</Text>

                  <Text style={styles.reviewCount}>
                    ({business.reviews})
                  </Text>
                </View>
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => toggleFavorite(business.name)}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={22}
                    color={isFavorite ? "#ff3b67" : "#aaa"}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Business</Text>

                  <Ionicons
                    name="arrow-forward"
                    size={13}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {filteredBusinesses.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={35}
              color="#b7b7b7"
            />

            <Text style={styles.emptyTitle}>No businesses found</Text>

            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="map-outline" size={22} color="#aaa" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.activeNavIcon}>
            <Ionicons name="search" size={20} color="#ff6b21" />
          </View>
          <Text style={styles.activeNavText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={22} color="#aaa" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#aaa" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf8f3",
  },

  scrollContent: {
    paddingTop: 55,
    paddingHorizontal: 18,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ff6b21",
    letterSpacing: 2,
    marginBottom: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#151515",
    lineHeight: 27,
  },

  mapButton: {
    width: 44,
    height: 44,
    backgroundColor: "#ff6b21",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ece8e2",
    borderRadius: 14,
    marginTop: 20,
    paddingHorizontal: 14,
    height: 52,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 9,
    color: "#222",
  },

  filters: {
    gap: 8,
    paddingTop: 13,
    paddingBottom: 18,
  },

  filter: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e9e4dd",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 22,
  },

  activeFilter: {
    backgroundColor: "#ff6b21",
    borderColor: "#ff6b21",
  },

  filterText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },

  activeFilterText: {
    color: "white",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  results: {
    color: "#999",
    fontSize: 12,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 14,
    marginBottom: 11,
    flexDirection: "row",
    minHeight: 110,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  businessIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },

  businessName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222",
  },

  businessDetails: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 4,
  },

  rating: {
    fontWeight: "700",
    fontSize: 13,
  },

  reviewCount: {
    color: "#aaa",
    fontSize: 11,
  },

  cardActions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  heartButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#191716",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 13,
  },

  viewButtonText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 12,
  },

  emptyText: {
    color: "#999",
    marginTop: 5,
  },

  nav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 22,
  },

  navItem: {
    alignItems: "center",
    minWidth: 60,
  },

  navText: {
    fontSize: 10,
    color: "#999",
    marginTop: 3,
  },

  activeNavIcon: {
    backgroundColor: "#fff0e7",
    width: 34,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  activeNavText: {
    fontSize: 10,
    color: "#ff6b21",
    fontWeight: "700",
    marginTop: 3,
  },
});