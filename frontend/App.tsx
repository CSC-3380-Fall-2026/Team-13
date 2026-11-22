import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailsScreen from "./src/screens/BusinessDetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import MapScreen from "./src/screens/MapScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SubmitBusinessScreen from "./src/screens/SubmitBusinessScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [screenHistory, setScreenHistory] = useState<string[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState("Juniper & Grain");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  function navigateTo(nextScreen: string) {
    if (nextScreen === currentScreen) return;
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(nextScreen);
  }

  function goBack() {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen("search");
    }
  }

  function openBusiness(businessName: string) {
    setSelectedBusiness(businessName);
    navigateTo("details");
  }

  function toggleFavorite(businessName: string) {
    if (favorites.includes(businessName)) {
      setFavorites(favorites.filter((name) => name !== businessName));
    } else {
      setFavorites([...favorites, businessName]);
    }
  }

  function handleSignUp(firstName: string, lastName: string, email: string) {
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setUserEmail(email);
    setScreenHistory([]);
    setCurrentScreen("search");
  }

  // Screens that should show the shared floating back button
  const showFloatingBackButton = [
    "signup",
    "profile",
    "favorites",
    "submit",
    "map",
  ].includes(currentScreen);

  function renderScreen() {
    if (currentScreen === "login") {
      return <LoginScreen onNavigate={navigateTo} />;
    }

    if (currentScreen === "signup") {
      return <SignUpScreen onNavigate={navigateTo} onSignUp={handleSignUp} />;
    }

    if (currentScreen === "profile") {
      return (
        <ProfileScreen
          firstName={userFirstName}
          lastName={userLastName}
          email={userEmail}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentScreen === "details") {
      return (
        <BusinessDetailsScreen
          businessName={selectedBusiness}
          onBack={goBack}
        />
      );
    }

    if (currentScreen === "favorites") {
      return (
        <FavoritesScreen
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onViewBusiness={openBusiness}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentScreen === "submit") {
      return <SubmitBusinessScreen onNavigate={navigateTo} />;
    }

    if (currentScreen === "map") {
      return <MapScreen />;
    }

    return (
      <SearchScreen
        onViewBusiness={openBusiness}
        onNavigate={navigateTo}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderScreen()}

      {showFloatingBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={20} color="#ffffff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 18,
    zIndex: 999,
    elevation: 5,
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