import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  AuthUser,
  updateProfile,
} from "../services/authApi";

interface EditProfileScreenProps {
  user: AuthUser;
  onSave: (user: AuthUser) => void;
  onCancel: () => void;
}

export default function EditProfileScreen({
  user,
  onSave,
  onCancel,
}: EditProfileScreenProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError("");

      const updatedUser = await updateProfile(
        user.id,
        firstName,
        lastName,
        email
      );

      onSave(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to update profile.");
      }
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>POPMAP</Text>

      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.subtitle}>
        Update your personal information.
      </Text>

      <Text style={styles.label}>First Name</Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Last Name</Text>

      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          Save Changes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onCancel}
      >
        <Text style={styles.cancelButtonText}>
          Cancel
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

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
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

  saveButton: {
    height: 50,
    backgroundColor: "#151515",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  cancelButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ff6b21",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  cancelButtonText: {
    color: "#ff6b21",
    fontSize: 15,
    fontWeight: "700",
  },
});