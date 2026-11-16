import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



interface PopUpEvent {
  id: string;
  day: string;
  date: string;
  category: string;
  name: string;
  location: string;
  dateTimeStr: string;
  price: string;
  isFavorite: boolean;
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

export const INITIAL_EVENTS: PopUpEvent[] = [
  {
    id: '1',
    day: 'FRI',
    date: '13',
    category: 'LIVE MUSIC',
    name: 'Acoustic night',
    location: 'Juniper & Grain • 0.3 mi',
    dateTimeStr: 'Fri, Nov 13 • 6–9 PM',
    price: 'Free',
    isFavorite: false,
  },
  {
    id: '2',
    day: 'SAT',
    date: '14',
    category: 'SHOP LOCAL',
    name: 'The neighborhood pop-up',
    location: 'North & Pine • 0.6 mi',
    dateTimeStr: 'Sat, Nov 14 • 10 AM–4 PM',
    price: 'Free',
    isFavorite: false,
  },
  {
    id: '3',
    day: 'SUN',
    date: '15',
    category: 'WORKSHOP',
    name: 'Sunday pottery club',
    location: 'Common Ground Studio • 0.8 mi',
    dateTimeStr: 'Sun, Nov 15 • 11 AM–1 PM',
    price: '$25',
    isFavorite: false,
  },
];

export default function EventsScreen({onNavigate} : {onNavigate: (screen : string) =>void}) {
  const [activeFilter, setActiveFilter] = useState('All events');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [events, setEvents] = useState<PopUpEvent[]>(INITIAL_EVENTS);
  const [calendarModalVisible, setCalendarModalVisiable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
const [selectedEvent, setSelectedEvent] = useState<any>(null);

  
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();
  const todayDateNum = currentDate.getDate().toString();

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = `${monthNames[currentMonthIndex]} ${currentYear}`;

  const totalDaysInCurrentMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const daysInMonth = Array.from({ length: totalDaysInCurrentMonth }, (_, i) => i + 1);

  const toggleFavorite = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, isFavorite: !ev.isFavorite } : ev));
  };

  const filteredEvents = events.filter(ev => {
    const matchesSearch = ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'Today') {
      return ev.date === todayDateNum;
    } else if (activeFilter === 'This weekend') {
      return ['13', '14', '15', '16', '17'].includes(ev.date); 
    }
    
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.brandTitle}>POPMAP</Text>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => onNavigate('map')}
          activeOpacity={0.8}
        >
          <Ionicons name="location-outline" size={14} color="#666" style={{ marginRight: 3 }} />
          <Text style={styles.locationText}>Near you</Text>
          <Ionicons name="chevron-down" size={12} color="#666" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Good plans.{'\n'}Great neighbors.</Text>
          <Text style={styles.subHeading}>Discover what's happening around you.</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={18} color="#888" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search local events"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
         <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setFilterModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="options-outline" size={18} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsContainer}>
          {['All events', 'Today', 'This weekend'].map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[styles.pill, activeFilter === filter && styles.pillActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.pillText, activeFilter === filter && styles.pillTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={styles.calendarBanner}
          onPress={() => setCalendarModalVisiable(true)}
          activeOpacity={0.9}
        >
          <View style={styles.calendarBannerLeft}>
            <Ionicons name="calendar-outline" size={20} color="#ff6b21" />
            <Text style={styles.calendarBannerText}>Open calendar</Text>
          </View>
          <Text style={styles.calendarBannerDateRange}>Nov 13–15</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby events</Text>
          <Text style={styles.resultsCount}>3 this week</Text>
        </View>

        {filteredEvents.map((item) => (
          <View key={item.id} style={styles.eventCard}>
            <View style={styles.cardHeader}>
              <View style={styles.dateBox}>
                <Text style={styles.dateDay}>{item.day}</Text>
                <Text style={styles.dateNum}>{item.date}</Text>
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventCategory}>{item.category}</Text>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventLocation}>{item.location}</Text>
                <Text style={styles.eventTime}>{item.dateTimeStr}</Text>
              </View>

              <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favButton}>
                <Ionicons 
                  name={item.isFavorite ? "heart" : "heart-outline"} 
                  size={20} 
                  color={item.isFavorite ? "#FF3B30" : "#666"} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.viewEventButton}
                onPress={() => setSelectedEvent(item)}>
                <View style={styles.viewEventRight}>
                <Text style={styles.viewEventText}>View event</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
                </View>
              </TouchableOpacity>
            </View>
           
          </View>
        ))}

        <View style={{ height: 20 }} />
 
        <Modal
        animationType="fade"
        transparent={true}
        visible={calendarModalVisible}
        onRequestClose={() => setCalendarModalVisiable(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Event calendar</Text>
              <TouchableOpacity onPress={() => setCalendarModalVisiable(false)}>
                <Ionicons name="close" size={22} color="#555" />
              </TouchableOpacity>
            </View>

            <View style={styles.monthHeaderRow}>
              <Text style={styles.monthTitle}>{currentMonthName}</Text>
              <View style={styles.eventsPill}>
                <Text style={styles.eventsPillText}>3 events</Text>
              </View>
            </View>

            <View style={styles.weekDaysRow}>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                <Text key={d} style={styles.weekDayText}>{d}</Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>
              {daysInMonth.map((day) => {
                const isSelectedEvent = day >= 13 && day <= 15;

                return (
                  <View 
                    key={day} 
                    style={[
                      styles.dayCell, 
                      isSelectedEvent && styles.highlightedDayCell
                    ]}
                  >
                    <Text 
                      style={[
                        styles.dayText,
                        isSelectedEvent && styles.highlightedDayText
                      ]}
                    >
                      {day}
                    </Text>
                    {isSelectedEvent && <View style={styles.eventDot} />}
                  </View>
                );
              })}
            </View>

            <View style={styles.modalFooterRow}>
              <View style={styles.footerLegendGroup}>
                <View style={styles.legendDot} />
                <Text style={styles.legendText}>Event dates</Text>
              </View>
              <Text style={styles.footerDateRange}>Nov 13–15</Text>
            </View>

            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setCalendarModalVisiable(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>

          </View>
          
        </View>
      </Modal>

        <Modal
        animationType="fade"
        transparent={true}
        visible={selectedEvent !== null}
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Event Details</Text>
              <TouchableOpacity onPress={() => setSelectedEvent(null)}>
                <Ionicons name="close" size={22} color="#555" />
              </TouchableOpacity>
            </View>

            {selectedEvent && (
              <View style={styles.eventDetailBody}>
                <View style={styles.detailBadgeRow}>
                  <Text style={styles.detailCategoryBadge}>{selectedEvent.category.toUpperCase()}</Text>
                  <Text style={styles.detailPriceBadge}>{selectedEvent.price}</Text>
                </View>

                <Text style={styles.detailTitle}>{selectedEvent.title}</Text>
                
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color="#ff6b21" />
                  <Text style={styles.detailText}>{selectedEvent.venue}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#ff6b21" />
                  <Text style={styles.detailText}>{selectedEvent.dateStr}</Text>
                </View>

                <Text style={styles.detailDescriptionLabel}>About this event</Text>
                <Text style={styles.detailDescriptionText}>
                  Join us for {selectedEvent.title}, hosted locally! Experience great community vibes, connect with neighbors, and enjoy a wonderful time.
                </Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.doneButton, { marginTop: 20 }]}
              onPress={() => setSelectedEvent(null)}
            >
              <Text style={styles.doneButtonText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
        </Modal>

      </ScrollView>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("map")}
        >
          <Ionicons name="map-outline" size={22} color="#999" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("search")}
        >
          <Ionicons name="search-outline" size={22} color="#999" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

         <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => onNavigate("favorites")}
                >
            <Ionicons name="heart" size={20} color="#999" />
                  <Text style={styles.navText}>Favorites</Text>
          </TouchableOpacity>

         <TouchableOpacity
          onPress={() => onNavigate("events")}
        >
          <View style={styles.activeNavIcon}>
          <Ionicons name="calendar-outline" size={22} color="#999" />
          </View>
          <Text style={styles.activeNavText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => onNavigate("profile")}
        >
          <Ionicons name="person-outline" size={22} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  calendarBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fbebe2",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f2d6c9",
  },
  calendarBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  calendarBannerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#c24907",
  },
  calendarBannerDateRange: {
    fontSize: 13,
    fontWeight: "700",
    color: "#c24907",
  },
  resultsCount: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 8,
  },
  brandTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#FF6600',
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
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
    activeNavIcon: {
    width: 34,
    height: 28,
    borderRadius: 15,
    backgroundColor: "#fff1e8",
    justifyContent: "center",
    alignItems: "center",
  },

  activeNavText: {
    fontSize: 11,
    color: "#ff6b21",
    fontWeight: "700",
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0ECE4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleSection: {
    marginTop: 12,
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 15,
    color: '#666',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E0DA',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  viewEventPrice: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },
  viewEventRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#151515",
  },
  monthHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#151515",
  },
  eventsPill: {
    backgroundColor: "#fbebe2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventsPillText: {
    color: "#c24907",
    fontSize: 11,
    fontWeight: "700",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#999",
    width: 36,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    borderRadius: 12,
  },
  highlightedDayCell: {
    backgroundColor: "#fbebe2",
  },
  dayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  highlightedDayText: {
    color: "#c24907",
    fontWeight: "800",
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#c24907",
    position: "absolute",
    bottom: 8,
  },
  modalFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 14,
    marginTop: 10,
    marginBottom: 16,
  },
  footerLegendGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#c24907",
  },
  legendText: {
    fontSize: 12,
    color: "#777",
  },
  footerDateRange: {
    fontSize: 12,
    fontWeight: "700",
    color: "#c24907",
  },
  doneButton: {
    backgroundColor: "#191716",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E0DA',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  pillsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E0DA',
    marginRight: 10,
  },
  pillActive: {
    backgroundColor: '#FF6600',
    borderColor: '#FF6600',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  pillTextActive: {
    color: '#fff',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  sectionSubCount: {
    fontSize: 13,
    color: '#777',
    fontWeight: '500',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFECE6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateBox: {
    width: 52,
    height: 62,
    backgroundColor: '#F5EBE0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  dateDay: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B85D23',
    letterSpacing: 0.5,
  },
  dateNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  eventInfo: {
    flex: 1,
  },
  eventCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FF6600',
    letterSpacing: 1,
    marginBottom: 3,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  favButton: {
    padding: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F2EC',
    paddingTop: 12,
  },
  priceBadge: {
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  viewEventButton: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  viewEventText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  eventDetailBody: {
    marginVertical: 10,
  },
  detailBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detailCategoryBadge: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ff6b21",
    backgroundColor: "#fff0e7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
  },
  detailPriceBadge: {
    fontSize: 14,
    fontWeight: "800",
    color: "#151515",
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#151515",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
  detailDescriptionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  detailDescriptionText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});