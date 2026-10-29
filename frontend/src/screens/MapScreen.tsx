import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const BATON_ROUGE: Region = {
  latitude: 30.4515,
  longitude: -91.1871,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>(BATON_ROUGE);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locationMessage, setLocationMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLocation() {
      try {
        const permission =
          await Location.requestForegroundPermissionsAsync();

        if (!active) return;

        if (permission.status !== 'granted') {
          setLocationMessage(
            'Location access is off. Showing Baton Rouge.'
          );
          return;
        }

        setLocationAllowed(true);

        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (!active) return;

        const userRegion: Region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };

        setRegion(userRegion);
        mapRef.current?.animateToRegion(userRegion, 700);
      } catch (error) {
        if (active) {
          setLocationMessage(
            'Unable to get your location. Showing Baton Rouge.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadLocation();

    return () => {
      active = false;
    };
  }, []);

  async function recenterMap() {
    try {
      const permission =
        await Location.getForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Location Permission Needed',
          'Enable location access in your device settings.'
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const newRegion: Region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      setRegion(newRegion);
      setLocationMessage('');
      mapRef.current?.animateToRegion(newRegion, 700);
    } catch (error) {
      Alert.alert(
        'Location Unavailable',
        'Could not retrieve your current location.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        showsUserLocation={locationAllowed}
        showsCompass
        showsScale
        zoomEnabled
        scrollEnabled
        rotateEnabled
        pitchEnabled
        showsBuildings
        onMapReady={() => console.log('Map ready')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Explore PopMap</Text>
        <Text style={styles.subtitle}>
          Discover businesses around you
        </Text>
      </View>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={recenterMap}
        accessibilityLabel="Recenter map to my location"
      >
        <Ionicons name="locate" size={25} color="#2563EB" />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.loadingText}>
            Finding your location...
          </Text>
        </View>
      )}

      {!!locationMessage && !loading && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            {locationMessage}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
  header: {
    position: 'absolute',
    top: 55,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 110,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  loadingBox: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
  },
  loadingText: {
    marginLeft: 8,
    color: '#374151',
  },
  messageBox: {
    position: 'absolute',
    bottom: 35,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
  },
  messageText: {
    color: '#374151',
    textAlign: 'center',
  },

});
