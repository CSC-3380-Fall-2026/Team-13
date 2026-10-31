import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer> 
       <StatusBar style ="auto" />
        <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
        name = "LoginScreen"
        component = {LoginScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name = "ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
        />
       

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
