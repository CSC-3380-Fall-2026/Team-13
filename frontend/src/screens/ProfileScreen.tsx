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

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.detailBox}>
        <Text style={styles.detailText}>{value}</Text>
      </View>
    </View>
  );
}

interface NavButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onPress?: () => void;
}

function NavButton({
  label,
  icon,
  active = false,
  onPress,
}: NavButtonProps) {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      disabled={active}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#ff6b21" : "#999"}
      />

      <Text
        style={
          active
            ? styles.activeNavText
            : styles.navText
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
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

            <Text style={styles.role}>User</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>
            Personal Details
          </Text>

          <Text style={styles.subtitle}>
            How you appear across PopMap
          </Text>

          <DetailRow
            label="Full Name"
            value={fullName}
          />

          <DetailRow
            label="Email Address"
            value={email}
          />

          <DetailRow
            label="Account Type"
            value="User"
          />
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
        <NavButton
          label="Map"
          icon="map-outline"
          onPress={() => onNavigate("map")}
        />

        <NavButton
          label="Search"
          icon="search-outline"
          onPress={() => onNavigate("search")}
        />

        <NavButton
          label="Favorites"
          icon="heart-outline"
          onPress={() => onNavigate("favorites")}
        />

        <NavButton
          label="Profile"
          icon="person"
          active
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fbf8f3",
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
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
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
    color: "#fff",
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

  role: {
    alignSelf: "flex-start",
    backgroundColor: "#fff1e8",
    color: "#ff6b21",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 6,
  },

  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#171717",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    marginBottom: 18,
  },

  detailGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#777",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  detailBox: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
  },

  detailText: {
    fontSize: 14,
    color: "#333",
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
    fontWeight: "700",
  },

  bottomSpace: {
    height: 95,
  },

  nav: {
    height: 78,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },

  navItem: {
    width: 70,
    alignItems: "center",
  },

  navText: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },

  activeNavText: {
    fontSize: 11,
    color: "#ff6b21",
    fontWeight: "700",
    marginTop: 4,
  },
});