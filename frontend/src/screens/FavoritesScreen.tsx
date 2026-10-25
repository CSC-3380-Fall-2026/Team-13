import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, } from 'react-native';

interface FavoritesScreenProps {
    id: string;
    title: string;
}

export default function FavoritesScreen() {
  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Your favorite items will appear here.</Text>
    </View>
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
}); 

