import React, { useState } from 'react';
import {View,Text, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    
      <><View style={styles.container}>
          <Text style={styles.title}>Sign into Popmap</Text>
          <Text style={styles.subtitle}>Welcome back! Please sign in to continue.</Text>
      </View><View style={styles.form} /><View style={styles.input}>

              <View>
              </View>
          </View></>
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 270,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
    textAlign: 'center',
  },
});
