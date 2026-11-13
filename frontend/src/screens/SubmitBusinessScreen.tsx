import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SubmitBusinessScreen({ onNavigate }: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [products, setProducts] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !location.trim()) {
      Alert.alert(
        "Validation Error",
        "Business Name and Location are required!"
      );
      return;
    }

    Alert.alert("Success", "Business submitted successfully!", [
      {
        text: "OK",
        onPress: () => {
          setName("");
          setCategory("");
          setDescription("");
          setLocation("");
          setHours("");
          setProducts("");
          
          onNavigate("search");
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => onNavigate("search")}
        >
          <Ionicons name="arrow-back" size={20} color="#151515" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>POPMAP</Text>
        <Text style={styles.heading}>Add a Business</Text>
        <Text style={styles.subtitle}>
          Help us discover new local favorites.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Business Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g., Pop's Coffee Shop"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="e.g., Food, Shopping, Services"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Location / Address *</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="123 Main St, Baton Rouge, LA"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Hours</Text>
          <TextInput
            style={styles.input}
            value={hours}
            onChangeText={setHours}
            placeholder="e.g., Mon-Fri 8am-5pm"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us about this place..."
            placeholderTextColor="#999"
            multiline={true}
          />

          <Text style={styles.label}>Products / Services</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={products}
            onChangeText={setProducts}
            placeholder="Coffee, Pastries, Free Wi-Fi..."
            placeholderTextColor="#999"
            multiline={true}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Business</Text>
          <Ionicons name="checkmark-circle" size={18} color="#ffffff" style={{marginLeft: 8}} />
        </TouchableOpacity>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fbf8f3",
  },
  content: {
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#151515",
    fontWeight: "700",
    marginLeft: 5,
    fontSize: 15,
  },
  logo: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ff6b21",
    letterSpacing: 2,
    marginBottom: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#151515",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ece8e2",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fbf8f3",
    borderWidth: 1,
    borderColor: "#ece8e2",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: "#151515",
    paddingVertical: 16,
    borderRadius: 24,
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  bottomSpace: {
    height: 60,
  },
});