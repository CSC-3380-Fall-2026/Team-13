import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function SubmitBusinessScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [hours, setHours] = useState('');
  const [products, setProducts] = useState('');

  const handleSubmit = () => {
    // 1. Check for errors FIRST
    if (!name.trim() || !location.trim()) {
      Alert.alert('Validation Error', 'Business Name and Location are required!');
      return; // This stops the code here so the success alert doesn't run
    }

    // 2. If no errors, show Success and Navigate
    Alert.alert('Success', 'Business submitted successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Clear the form
          setName('');
          setCategory('');
          setDescription('');
          setLocation('');
          setHours('');
          setProducts('');
          
          // Route the user back to the Search Screen
          navigation.navigate('SearchScreen');
        }
      }
    ]);
  }; // <-- You were missing this closing bracket!

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Add a New Business</Text>

      <Text style={styles.label}>Business Name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g., Pop's Coffee Shop" />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="e.g., Cafe, Retail, Service" />

      <Text style={styles.label}>Location / Address *</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="123 Main St, Baton Rouge, LA" />

      <Text style={styles.label}>Hours</Text>
      <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholder="e.g., Mon-Fri 8am-5pm" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Tell us about this place..." multiline={true} />

      <Text style={styles.label}>Products / Services</Text>
      <TextInput style={[styles.input, styles.textArea]} value={products} onChangeText={setProducts} placeholder="Coffee, Pastries, Free Wi-Fi..." multiline={true} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Business</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});