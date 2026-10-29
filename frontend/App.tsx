import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailsScreen from "./src/screens/BusinessDetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import MapScreen from "./src/screens/MapScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("search");

  const [selectedBusiness, setSelectedBusiness] =
    useState("Juniper & Grain");

  const [favorites, setFavorites] = useState<string[]>([]);

  function openBusiness(businessName: string) {
    setSelectedBusiness(businessName);
    setCurrentScreen("details");
  }

  function toggleFavorite(businessName: string) {
    if (favorites.includes(businessName)) {
      setFavorites(
        favorites.filter((name) => name !== businessName)
      );
    } else {
      setFavorites([...favorites, businessName]);
    }
  }

  if (currentScreen === "details") {
    return (
      <BusinessDetailsScreen
        businessName={selectedBusiness}
        onBack={() => setCurrentScreen("search")}
      />
    );
  }

  if (currentScreen === "favorites") {
    return (
      <FavoritesScreen
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onViewBusiness={openBusiness}
        onNavigate={setCurrentScreen}
      />
    );
  }

  if (currentScreen === "map") {
    return (
      <View style={styles.mapContainer}>
        <MapScreen />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentScreen("search")}
        >
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SearchScreen
      onViewBusiness={openBusiness}
      onNavigate={setCurrentScreen}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },

  backButton: {
    position: "absolute",
    top: 55,
    left: 18,
    backgroundColor: "#151515",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
  },

  backButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    marginLeft: 5,
  },
});