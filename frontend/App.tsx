import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen Imports (Only the ones that actually exist on this branch!)
import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailsScreen from './src/screens/BusinessDetailsScreen';
import SubmitBusinessScreen from './src/screens/SubmitBusinessScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer> 
       <StatusBar style="auto" />
        {/* Set initialRouteName directly to your new screen to test it */}
        <Stack.Navigator initialRouteName="SubmitBusinessScreen">
          
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          
          <Stack.Screen 
            name="BusinessProfile" 
            component={BusinessDetailsScreen} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen
            name="SubmitBusinessScreen"
            component={SubmitBusinessScreen}
            options={{ headerShown: true, title: "Add Business" }}
          />

        </Stack.Navigator>
      </NavigationContainer>
  );
}