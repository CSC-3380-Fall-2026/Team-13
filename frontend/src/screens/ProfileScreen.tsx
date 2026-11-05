import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileScreenProps {
  firstName: string;
  lastName: string;
  email: string;
  onNavigate: (screen: string) => void;
}

export default function ProfileScreen({
  firstName,
  lastName,
  email,
  onNavigate,
}: ProfileScreenProps) {
  const fullName = `${firstName} ${lastName}`;

  const initials =
    firstName.charAt(0).toUpperCase() +
    lastName.charAt(0).toUpperCase();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.logo}>POPMAP</Text>
            <Text style={styles.heading}>Profile</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initials}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {fullName}
            </Text>

            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>User</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>
            Personal Details
          </Text>

          <Text style={styles.sectionSubtitle}>
            How you appear across PopMap
          </Text>

          <View style={styles.detailGroup}>
            <Text style={styles.label}>
              Full Name
            </Text>

            <View style={styles.detailBox}>
              <Text style={styles.detailText}>
                {fullName}
              </Text>
            </View>
          </View>

          <View style={styles.detailGroup}>
            <Text style={styles.label}>
              Email Address
            </Text>

            <View style={styles.detailBox}>
              <Text style={styles.detailText}>
                {email}
              </Text>
            </View>
          </View>

          <View style={styles.detailGroup}>
            <Text style={styles.label}>
              Account Type
            </Text>

            <View style={styles.detailBox}>
              <Text style={styles.detailText}>
                User
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onNavigate("login")}
        >
          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("map")}
        >
          <Ionicons
            name="map-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("search")}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("favorites")}
        >
          <Ionicons
            name="heart-outline"
            size={22}
            color="#999"
          />
          <Text style={styles.navText}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.activeNavIcon}>
            <Ionicons
              name="person"
              size={20}
              color="#ff6b21"
            />
          </View>

          <Text style={styles.activeNavText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fbf8f3",
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  logo: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ff6b21",
    letterSpacing: 2,
    marginBottom: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#171717",
  },

  editButton: {
    backgroundColor: "#ff6b21",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
  },

  editButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },

  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },

  profileInfo: {
    marginLeft: 14,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#171717",
  },

  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#fff1e8",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },

  roleText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ff6b21",
  },

  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#171717",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
    marginBottom: 18,
  },

  detailGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#777777",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  detailBox: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  detailText: {
    fontSize: 14,
    color: "#333333",
  },

  logoutButton: {
    height: 46,
    borderWidth: 1,
    borderColor: "#ff6b21",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    color: "#ff6b21",
    fontSize: 14,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 95,
  },

  nav: {
    height: 78,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },

  navItem: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontSize: 11,
    color: "#999999",
    marginTop: 4,
  },

  activeNavIcon: {
    width: 34,
    height: 28,
    borderRadius: 15,
    backgroundColor: "#fff1e8",
    justifyContent: "center",
    alignItems: "center",
  },

  activeNavText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ff6b21",
    marginTop: 3,
  },
});