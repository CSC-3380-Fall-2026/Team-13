import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PopMap</Text>
      <Text style={styles.subtitle}>Find local businesses near you</Text>

      <TextInput
        style={styles.search}
        placeholder="Search local businesses"
      />

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text>Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text>Top Rated</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.map}>
        <Text style={styles.mapText}>Map Area</Text>

        <View style={styles.markerOne}>
          <Text style={styles.markerText}>4.8</Text>
        </View>

        <View style={styles.markerTwo}>
          <Text style={styles.markerText}>4.6</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.businessName}>Local Business</Text>
        <Text style={styles.businessInfo}>Food • 0.5 miles away</Text>
        <Text style={styles.rating}>★★★★☆ 4.6</Text>

        <Text style={styles.description}>
          A local business with good food and friendly service.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Business</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nav}>
        <Text style={styles.activeNav}>Map</Text>
        <Text>Search</Text>
        <Text>Favorites</Text>
        <Text>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2f684b",
    marginLeft: 20,
  },

  subtitle: {
    marginLeft: 20,
    marginBottom: 15,
    color: "#666",
  },

  search: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginTop: 10,
    gap: 8,
  },

  filterButton: {
    backgroundColor: "#dfe9e2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },

  map: {
    flex: 1,
    backgroundColor: "#d8e3d5",
    margin: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  mapText: {
    fontSize: 20,
    color: "#777",
  },

  markerOne: {
    position: "absolute",
    top: 60,
    left: 70,
    backgroundColor: "#2f684b",
    padding: 8,
    borderRadius: 20,
  },

  markerTwo: {
    position: "absolute",
    bottom: 60,
    right: 70,
    backgroundColor: "#2f684b",
    padding: 8,
    borderRadius: 20,
  },

  markerText: {
    color: "white",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },

  businessName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  businessInfo: {
    color: "#777",
    marginTop: 3,
  },

  rating: {
    marginTop: 8,
    color: "#d69a2d",
  },

  description: {
    marginTop: 8,
    color: "#555",
  },

  button: {
    backgroundColor: "#2f684b",
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  activeNav: {
    color: "#2f684b",
    fontWeight: "bold",
  },
});