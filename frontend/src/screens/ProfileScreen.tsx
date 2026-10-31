import React from 'react'; 
import { ScrollView, View, Text, Image,TextInput, StyleSheet, TouchableOpacity,} from 'react-native'; 
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';
 
export default function ProfileScreen() { 
    const navigation = useNavigation<any>();
    const profile={
        name: 'Darren Walker',
        email: 'DWalker21@lsu.edu',
        location: "Baton Rouge, Louisiana",
        role: 'Business',
        about: "Experienced in doing hair for 5 years, versatilie with many hairstyles. "
    };
     
    return ( 
        <View style ={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>       <View style={styles.headerSpace}>
        <TouchableOpacity 
             style={styles.editButton} onPress={() => console.log('Edit profile button')}>  
             <Text style = {styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity> 
        </View>  
       

       <View style ={styles.upperRight}>    
        <Text style={styles.upperRightText}> "Discover. Explore. Create."   
            
            </Text>
        <View style={styles.profileRow}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {profile.name.charAt(0)}
              </Text> 
              </View>
            </View>

       <View style={styles.user}>
        <View style={styles.nameTag}>
          <Text style={styles.userName}>{profile.name}</Text>
            <View style={styles.businessID}>  
                <Text style={styles.idText}>{profile.role}</Text>
           
                </View>
              </View>

             </View>
          </View>
          </View>


        <View style={styles.detailsD}>  
           <Text style={styles.detailsTitle}> Personal Details </Text> 
           <Text style={styles.detailsSubtitle}>How you appear across Popmap</Text>

        

         <View style={styles.detailsFunc}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>FULL NAME</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{profile.name}</Text>
            </View>
          </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{profile.email}</Text>
            </View>
          </View>

             <View style={styles.aboutFunc}>
            <Text style={styles.inputLabel}>ABOUT</Text>
            <View style={styles.aboutBox}>
              <Text style={styles.inputText}>{profile.about}</Text>
            </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>ROLE</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{profile.role}</Text>
            </View>
          </View>
           <View style={styles.input}>
            <Text style={styles.inputLabel}>LOCATION</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{profile.location}</Text>
            </View>
        </View>
          </View>
       </ScrollView>
    
    <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map-outline" size={22} color="#aaa" />
          <Text style={styles.navText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={22} color="#aaa" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Favorites')}>
          <Ionicons name="heart-outline" size={22} color="#aaa" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.activeNavIcon}>
            <Ionicons name="person" size={20} color="#ff6b21" />
          </View>
          <Text style={styles.activeNavText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
        
            
    );
 }

    const styles = StyleSheet.create({
        container:{
        backgroundColor:'#F9F6F0',
        flexGrow:1,
         } ,
        scrollContent:{
        paddingTop: 80,
        paddingHorizontal: 18,
        paddingBottom: 100,
        },
        headerSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
         },
        user:{
        flex: 1,
        },
        profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        },
        avatarContainer: {
        marginRight: 16,
        },
        avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#2D3748',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        marginBottom: 8,
        },
        avatarInitials: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '700',
        },
        editButton: {
        width: 102,
        height: 30,
        backgroundColor: '#ff6b21',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 250,
        },
        editButtonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14,
        },
        upperRight:{ 
        backgroundColor: '#ff6b21',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        },
        upperRightText:{
        color: '#FED7D7',
        fontStyle: 'italic',
        fontSize : 14,
        textAlign:'right',
        marginBottom: 10,
        },
        nameTag:{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: -100,
        },
        userName:{
        fontSize:20,
        fontWeight: '700',
        color: '#f9f9f9',
        marginRight: 10,
        },
        businessID:{
        backgroundColor: '#FEB2B2',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        },
        idText:{
        fontSize: 10,
        fontWeight: '700',
        color: '#7F1D1D',
        },
        detailsD:{
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        },
        detailsTitle:{
        fontSize: 18,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 6,
        },
        detailsSubtitle:{
        fontSize: 12,
        color: '#1A202C',
        marginBottom: 15,
        },
        detailsFunc:{
        gap: 12,
        },
        input:{
        marginBottom: 8,
        },
        inputBox:{
        backgroundColor:'#F7FAFC',
        borderWidth:1,
        borderRadius:8,
        borderColor: '#E2E8F8',
        paddingHorizontal: 12,
        paddingVertical: 10,
        },
        inputLabel:{
        fontSize: 10,
        fontWeight: '700',
        color: '#A0AEC0',
        letterSpacing:1,
        marginBottom: 7,
        },
        inputText: {
        fontSize: 14,
        color: '#2D3748',
        },
        aboutFunc:{
        marginTop: 8,
        },
        aboutBox:{
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        minHeight:50,
        marginBottom: 7,
        },
        nav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 22,
        },
        navItem: {
        alignItems: 'center',
        minWidth: 60,
        },
        navText: {
        fontSize: 10,
        color: '#999',
        marginTop: 3,
        },
        activeNavIcon: {
        backgroundColor: '#fff0e7',
        width: 34,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        },
        activeNavText: {
        fontSize: 10,
        color: '#ff6b21',
        fontWeight: '700',
        marginTop: 3,
        },
    });