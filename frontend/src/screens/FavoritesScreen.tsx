import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, } from 'react-native';

interface FavoritesScreenProps {
    businesses: {
        name: string;
        category: string;
        distance: string;
    }[];
    onRemove: (name: string) => void;
}

export default function FavoritesScreen({ businesses, onRemove }: FavoritesScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Favorites</Text>
            {businesses.length === 0 ? (
        <Text style={styles.subtitle}>Your favorite items will appear here.</Text>
      ) : (
        businesses.map((business) => (
          <View key={business.name} style={styles.business}>
            <Text style={styles.businessName}>{business.name}</Text>
            <Text style={styles.subtitle}>
              {business.category} • {business.distance}
            </Text>
            <TouchableOpacity onPress={() => onRemove(business.name)}>
              <Text style={styles.remove}>Remove favorite</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    },
    title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
    textAlign: 'center',
    },
    subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    },
  business: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 17,
    padding: 14,
    marginBottom: 11,
    },
    businessName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222',
    marginBottom: 6,
    },
    remove: {
    color: '#ff3b67',
    fontWeight: '600',
    paddingVertical: 8,
    },
  });

