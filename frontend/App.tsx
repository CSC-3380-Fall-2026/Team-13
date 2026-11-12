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
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SubmitBusinessScreen from "./src/screens/SubmitBusinessScreen";
import {ReviewsScreen} from "./src/ReviewsScreen";
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  const [selectedBusiness, setSelectedBusiness] =
    useState("Juniper & Grain");

  const [favorites, setFavorites] = useState<string[]>([]);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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

  function handleSignUp(
    firstName: string,
    lastName: string,
    email: string
  ) {
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setUserEmail(email);

    setCurrentScreen("submit");
  }

  if (currentScreen === "login") {
    return (
      <LoginScreen
        onNavigate={setCurrentScreen}
      />
    );
  }

  if (currentScreen === "signup") {
    return (
      <SignUpScreen
        onNavigate={setCurrentScreen}
        onSignUp={handleSignUp}
      />
    );
  }

  if (currentScreen === "profile") {
    return (
      <ProfileScreen
        firstName={userFirstName}
        lastName={userLastName}
        email={userEmail}
        onNavigate={setCurrentScreen}
      />
    );
  }

  if (currentScreen === "details") {
    return (
            <BusinessDetailsScreen
        businessName={selectedBusiness}
        onBack={() => setCurrentScreen("search")}
        onViewReviews={() => setCurrentScreen("reviews")}
      />
    );
  }

    if (currentScreen === "reviews") {
    return (
      <View style={styles.mapContainer}>
        <View style={styles.reviewsHeader}>
          <TouchableOpacity
            onPress={() => setCurrentScreen("details")}
            accessibilityRole="button"
          >
            <Text style={styles.reviewsBackText}>
              ← Back to Business
            </Text>
          </TouchableOpacity>

          <Text style={styles.reviewsBusinessName}>
            {selectedBusiness}
          </Text>
        </View>

        <ReviewsScreen key={selectedBusiness} />
      </View>
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

  if (currentScreen === "submit") {
    return (
      <SubmitBusinessScreen 
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
          <Ionicons
            name="arrow-back"
            size={20}
            color="#ffffff"
          />

          <Text style={styles.backButtonText}>
            Search
          </Text>
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

    reviewsHeader: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#fbf8f3",
  },

  reviewsBackText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ff6b21",
  },

  reviewsBusinessName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#151515",
    marginTop: 12,
  },
});