import React from 'react'; 
import { ScrollView, View, Text, Image,TextInput, StyleSheet, TouchableOpacity,} from 'react-native'; 
 
export default function ProfileScreen() { 
    const [name, setName] = React.useState(''); 
    const [bio, setBio] = React.useState(''); 
 
    const handleSaveProfile = () => { 
        console.log('Saving profile with', name, bio); 
        // Handle save profile logic here 
    }; 
     
    return ( 
        <ScrollView contentContainerStyle={styles.container}> 
            <Text style={styles.title}>Profile</Text> 
            <TextInput style={styles.input} 
                placeholder="Name"
                value={name} 
                onChangeText={setName} 
            /> 
            <TextInput style={styles.input} 
                placeholder="Bio" 
                value={bio} 
                onChangeText={setBio} 
                multiline={true} 
            /> 
            <TouchableOpacity style={styles.button} 
            onPress={handleSaveProfile}>
            </TouchableOpacity>
             <Text style={styles.buttonText}>Save Profile
             </Text>
        </ScrollView> 
    ); 
} 
 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 24, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    title: { 
        fontSize: 27, 
        fontWeight: '700', 
        color: '#000', 
        marginBottom: 15, 
        textAlign: 'center', 
    }, 
    input: { 
        width: '100%', 
        height: 40, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingHorizontal: 8, 
        marginBottom: 12, 
    }, 
    button: { 
        width: '100%', 
        height: 40, 
        backgroundColor: '#007BFF', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 4, 
        marginTop: 12, 
    }, 
    buttonText: { 
        color: '#fff', 
        fontWeight: '600', 
    }, 
}); 