import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
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
import { apiRequest } from "./src/api";
import type { Business } from "./src/api";
import EventsScreen from "./src/screens/EventsScreen";
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const handleLogout = () => {
    setCurrentScreen("login");
  };

  const [selectedBusiness, setSelectedBusiness] =
  useState<Business | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function openBusiness(selection: Business | string) {
  try {
    let business: Business;

    if (typeof selection === "string") {
      // Compatibility with the existing Favorites screen,
      // which still passes a business name.
      const businesses = await apiRequest<Business[]>("/businesses");

      const matches = businesses.filter(
        (item) => item.name === selection
      );

      if (matches.length !== 1) {
        throw new Error(
          "Please open this business from Search so the correct record is selected."
        );
      }

      business = matches[0];
    } else {
      business = selection;
    }

    setSelectedBusiness(business);
    setCurrentScreen("details");
  } catch (error) {
    Alert.alert(
      "Could not open business",
      error instanceof Error ? error.message : "Please try again."
    );
  }
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
        onLogout={handleLogout}
      />
    );
  }

  if (currentScreen === "details" && selectedBusiness) {
  return (
    <BusinessDetailsScreen
      business={selectedBusiness}
      onBack={() => setCurrentScreen("search")}
      onViewReviews={() => setCurrentScreen("reviews")}
    />
  );
}

    if (currentScreen === "reviews" && selectedBusiness) {
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
            {selectedBusiness.name}
          </Text>
        </View>

        <ReviewsScreen
  key={selectedBusiness.id}
  businessId={selectedBusiness.id}
/>
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
if (currentScreen === "events") {
  return (
    <EventsScreen
      onNavigate={setCurrentScreen }
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