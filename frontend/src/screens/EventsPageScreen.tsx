import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Modal,
  TextInput, 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface PopUpEvent {
  id: string | number;
  name: string;
  date_time: string;
  location: string;
  description: string;
  category: string;
}

const CATEGORIES = ['All', 'Food', 'Shopping', 'Services', 'Top Rated'];

export default function EventsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  // Live database state
  const [events, setEvents] = useState<PopUpEvent[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states for adding a new event
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food'); // Default category

  // 1. Fetch events from your Node.js/Express backend API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Replace with your local machine IP if testing on a physical device
      const response = await fetch('http://192.168.1.198:8081/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events from database:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 2. Submit new event to PostgreSQL via backend POST route
  const handlePublishEvent = async () => {
    if (!name || !dateTime || !location) {
      alert('Please fill out the required fields.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.198:8081/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          date_time: dateTime,
          location,
          description,
          category,
        }),
      });

      if (response.ok) {
        // Clear form inputs, close modal, and refresh list
        setModalVisible(false);
        setName('');
        setDateTime('');
        setLocation('');
        setDescription('');
        fetchEvents(); 
      } else {
        alert('Failed to publish event to database.');
      }
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  // Filter events based on selected category pill
  const filteredEvents = events.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const renderEventCard = ({ item }: { item: PopUpEvent }) => {
    const getCategoryBg = (cat: string) => {
      switch(cat) {
        case 'Food': return '#FFF2E8';
        case 'Shopping': return '#E8F5E9';
        case 'Services': return '#EFEBF8';
        default: return '#F3F4F6';
      }
    };

    const getCategoryIcon = (cat: string) => {
      switch(cat) {
        case 'Food': return 'restaurant-outline';
        case 'Shopping': return 'bag-outline';
        case 'Services': return 'brush-outline';
        default: return 'storefront-outline';
      }
    };

    return (
      <View style={styles.eventCard}>
        <View style={styles.cardLeftSection}>
          <View style={[styles.iconCircle, { backgroundColor: getCategoryBg(item.category) }]}>
            <Ionicons name={getCategoryIcon(item.category)} size={22} color="#D93838" />
          </View>
        </View>
        
        <View style={styles.cardMainContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.eventName} numberOfLines={1}>{item.name}</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.metaText}>{item.date_time}</Text>
          <Text style={styles.locationText}>{item.location}</Text>

          <TouchableOpacity style={styles.viewBusinessButton}>
            <Text style={styles.viewBusinessButtonText}>View Event</Text>
            <Ionicons name="arrow-forward" size={14} color="#fff" style={styles.iconSpacing} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const HeaderSection = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <Text style={styles.popMapLogo}>POPMAP</Text>
        <TouchableOpacity style={styles.mapIconButton}>
          <MaterialCommunityIcons name="map-marker-outline" size={20} color="#D93838" />
        </TouchableOpacity>
      </View>

      <Text style={styles.headline}>Find your new local events here.</Text>

      <View style={styles.categoriesScroll}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity 
            key={cat}
            style={[styles.categoryPill, activeCategory === cat && styles.categoryPillActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.categoryPillText, activeCategory === cat && styles.categoryPillTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      <View style={styles.nearbyHeaderRow}>
        <Text style={styles.nearbyHeaderTitle}>Nearby places</Text>
        <Text style={styles.nearbyResultsCount}>{filteredEvents.length} results</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList 
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderSection}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingAddButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Add Event Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Event</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={22} color="#111" />
                </TouchableOpacity>
              </View>
              
              <TextInput 
                style={styles.modalInput} 
                placeholder="Event Name" 
                value={name} 
                onChangeText={setName} 
                placeholderTextColor="#9ca3af" 
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Date & Time / Info (e.g. Food • 0.3 mi)" 
                value={dateTime} 
                onChangeText={setDateTime} 
                placeholderTextColor="#9ca3af" 
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Location" 
                value={location} 
                onChangeText={setLocation} 
                placeholderTextColor="#9ca3af" 
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Category (Food, Shopping, Services)" 
                value={category} 
                onChangeText={setCategory} 
                placeholderTextColor="#9ca3af" 
              />
              <TextInput 
                style={[styles.modalInput, styles.textArea]} 
                placeholder="Description" 
                value={description} 
                onChangeText={setDescription} 
                multiline 
                placeholderTextColor="#9ca3af" 
              />

              <TouchableOpacity style={styles.modalSubmitButton} onPress={handlePublishEvent}>
                <Text style={styles.modalSubmitButtonText}>Publish Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FBFBFA',
  },
  headerContainer: {
    backgroundColor: '#FBFBFA',
    paddingTop: 44,
    paddingBottom: 8,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  popMapLogo: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#D93838',
  },
  mapIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FDF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F9D8D8',
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    letterSpacing: -1,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryPillActive: {
    backgroundColor: '#111111',
  },
  categoryPillText: {
    fontSize: 13,
    color: '#111',
    fontWeight: '500',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  nearbyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  nearbyHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  nearbyResultsCount: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeftSection: {
    marginRight: 14,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMainContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    flex: 1,
    marginRight: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 10,
  },
  viewBusinessButton: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  viewBusinessButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  iconSpacing: {
    marginLeft: 4,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    height: 65,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
    fontWeight: '500',
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 105,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D93838',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D93838',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContentWrapper: {
    maxHeight: '85%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  modalInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 12,
    fontSize: 14,
    color: '#111',
  },
  textArea: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  modalSubmitButton: {
    backgroundColor: '#D93838',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  modalSubmitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});