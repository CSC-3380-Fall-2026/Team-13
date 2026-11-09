import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface SignUpScreenProps {
  onNavigate: (screen: string) => void;
  onSignUp: (
    firstName: string,
    lastName: string,
    email: string
  ) => void;
}

export default function SignUpScreen({
  onNavigate,
  onSignUp,
}: SignUpScreenProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignUp() {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    onSignUp(firstName, lastName, email);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>POPMAP</Text>

      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.subtitle}>
        Create an account to start discovering local businesses.
      </Text>

      <View style={styles.nameRow}>
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="First Name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="Last Name"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onNavigate("login")}
      >
        <Text style={styles.loginText}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fbf8f3",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ff6b21",
    letterSpacing: 2,
    marginBottom: 14,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#171717",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 7,
    marginBottom: 28,
  },

  nameRow: {
    flexDirection: "row",
    gap: 12,
  },

  nameInput: {
    flex: 1,
  },

  input: {
    height: 52,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 15,
    color: "#171717",
  },

  error: {
    color: "#c62828",
    fontSize: 13,
    marginBottom: 12,
  },

  button: {
    height: 50,
    backgroundColor: "#151515",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  loginText: {
    textAlign: "center",
    color: "#ff6b21",
    marginTop: 18,
    fontSize: 14,
  },
});