import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>POPMAP</Text>

      <Text style={styles.title}>
        Find your new{"\n"}local favorite.
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search businesses"
      />

      <View style={styles.filters}>
        <TouchableOpacity style={styles.activeFilter}>
          <Text style={styles.activeFilterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text>Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text>Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filter}>
          <Text>Top Rated</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.nearbyText}>Nearby places</Text>
        <Text style={styles.resultText}>4 results</Text>
      </View>

      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.businessName}>Juniper & Grain</Text>
              <Text style={styles.businessInfo}>Food • 0.3 mi</Text>
              <Text style={styles.rating}>★ 4.9</Text>
            </View>

            <Text style={styles.heart}>♡</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Business</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.businessName}>North & Pine</Text>
              <Text style={styles.businessInfo}>Shopping • 0.6 mi</Text>
              <Text style={styles.rating}>★ 4.8</Text>
            </View>

            <Text style={styles.heart}>♥</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Business</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.businessName}>Common Ground Studio</Text>
              <Text style={styles.businessInfo}>Services • 0.8 mi</Text>
              <Text style={styles.rating}>★ 4.7</Text>
            </View>

            <Text style={styles.heart}>♡</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Business</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.businessName}>Little Bird Bakery</Text>
              <Text style={styles.businessInfo}>Food • 1.1 mi</Text>
              <Text style={styles.rating}>★ 4.9</Text>
            </View>

            <Text style={styles.heart}>♡</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Business</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.nav}>
        <Text style={styles.navText}>Map</Text>
        <Text style={styles.activeNav}>Search</Text>
        <Text style={styles.navText}>Favorites</Text>
        <Text style={styles.navText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f2",
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ff6b2c",
    letterSpacing: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 18,
    lineHeight: 31,
  },

  searchBar: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 12,
    marginBottom: 18,
  },

  filter: {
    backgroundColor: "#eeeeee",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
  },

  activeFilter: {
    backgroundColor: "#ff6b2c",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 18,
  },

  activeFilterText: {
    color: "white",
    fontWeight: "bold",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  nearbyText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  resultText: {
    fontSize: 12,
    color: "#888",
  },

  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  businessName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  businessInfo: {
    color: "#777",
    marginTop: 3,
  },

  rating: {
    color: "#d69a00",
    marginTop: 6,
  },

  heart: {
    fontSize: 22,
    color: "#ff4d73",
  },

  button: {
    backgroundColor: "#222",
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  navText: {
    color: "#777",
  },

  activeNav: {
    color: "#ff6b2c",
    fontWeight: "bold",
  },
});