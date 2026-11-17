
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WelcomeScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export default function WelcomeScreen({
  onLogin,
  onSignUp,
}: WelcomeScreenProps) {
  return (
    <ImageBackground
      source={require('../../assets/popmap-welcome.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onLogin}
            accessibilityRole="button"
            accessibilityLabel="Log in to PopMap"
          >
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onSignUp}
            accessibilityRole="button"
            accessibilityLabel="Sign up for PopMap"
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    paddingHorizontal: 28,
    paddingBottom: 35,
    gap: 14,
  },
  loginButton: {
    backgroundColor: '#FF7900',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  signUpButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF7900',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
  },
  signUpText: {
    color: '#FF7900',
    fontSize: 17,
    fontWeight: '700',
  },
});
