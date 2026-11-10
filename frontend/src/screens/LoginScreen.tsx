import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export default function LoginScreen({
  onNavigate,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!email || !password) {
      setError("Please enter both email and password.");
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

    setError("");
    onNavigate("submit");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>POPMAP</Text>

      <Text style={styles.title}>Welcome back</Text>

      <Text style={styles.subtitle}>
        Sign in to continue exploring local businesses.
      </Text>

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onNavigate("forgotPassword")}
      >
        <Text style={styles.forgotText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onNavigate("signup")}
      >
        <Text style={styles.signupText}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf8f3",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logo: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ff6b21",
    letterSpacing: 2,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#171717",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
    marginBottom: 28,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
  },

  input: {
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 12,
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
    height: 48,
    backgroundColor: "#151515",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  forgotText: {
    textAlign: "center",
    color: "#ff6b21",
    marginTop: 18,
    fontSize: 14,
  },

  signupText: {
    textAlign: "center",
    color: "#ff6b21",
    marginTop: 12,
    fontSize: 14,
  },
});