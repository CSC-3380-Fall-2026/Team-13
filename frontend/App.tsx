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
import EditProfileScreen from "./src/screens/EditProfileScreen";
import { AuthUser } from "./src/services/authApi";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  const [selectedBusiness, setSelectedBusiness] =
    useState("Juniper & Grain");

  const [favorites, setFavorites] = useState<string[]>([]);

  const [currentUser, setCurrentUser] =
    useState<AuthUser | null>(null);

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

  function handleAuth(user: AuthUser) {
    setCurrentUser(user);
    setCurrentScreen("search");
  }

  function handleProfileUpdate(user: AuthUser) {
    setCurrentUser(user);
    setCurrentScreen("profile");
  }

  function handleLogout() {
    setCurrentUser(null);
    setFavorites([]);
    setCurrentScreen("login");
  }

  if (currentScreen === "login") {
    return (
      <LoginScreen
        onNavigate={setCurrentScreen}
        onLogin={handleAuth}
      />
    );
  }

  if (currentScreen === "signup") {
    return (
      <SignUpScreen
        onNavigate={setCurrentScreen}
        onSignUp={handleAuth}
      />
    );
  }

  if (currentScreen === "editProfile") {
    if (!currentUser) {
      return (
        <LoginScreen
          onNavigate={setCurrentScreen}
          onLogin={handleAuth}
        />
      );
    }

    return (
      <EditProfileScreen
        user={currentUser}
        onSave={handleProfileUpdate}
        onCancel={() => setCurrentScreen("profile")}
      />
    );
  }

  if (currentScreen === "profile") {
    if (!currentUser) {
      return (
        <LoginScreen
          onNavigate={setCurrentScreen}
          onLogin={handleAuth}
        />
      );
    }

    return (
      <ProfileScreen
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        email={currentUser.email}
        onNavigate={(screen) => {
          if (screen === "login") {
            handleLogout();
          } else {
            setCurrentScreen(screen);
          }
        }}
      />
    );
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
});