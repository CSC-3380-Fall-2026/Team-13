import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'; 
import {useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
   const navigation = useNavigation<any>(); 
    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>(''); 
    const[keepSigned,setKeepSigned] =useState(false);
    const [error, setError] = useState<string>('');
    const [pass, setPass] = useState<string>(''); 
 
    const handleLogin = async () => { 
       if (!email || !password) { 
        setError('Please enter both email and password.'); 
        return; 
      } 
    try{
      const response = await fetch ('http://192.168.1.198:8081/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (response.ok){
        setPass('');
        console.log('Login successful:', data)
        navigation.navigate('ProfileScreen', {user: data.user});

      }
      else{
        setError('');
        console.log('Login failed')     
      }
    } 
    catch (err){
      console.error('Network error:', err);
      setError('Unable to connect to server. Check your connection')
    }

    } 

  return ( 
      <View style={styles.container}> 
          <Text style={styles.header}>Popmap</Text>
          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.title}>Sign in to Popmap</Text> 

          <Text style={styles.label}>EMAIL ADDRESS </Text>
          <TextInput style={styles.input}  
          placeholder="Email" value={email}
          placeholderTextColor="#999" 
          autoCapitalize="none" 
          onChangeText={setEmail}
          keyboardType="email-address"
          /> 
          
          <Text style={styles.label}>PASSWORD </Text>
          
          <TextInput style={styles.input}  
          placeholder="Password" value={password}  
          placeholderTextColor="#999" 
          onChangeText={setPassword} secureTextEntry /> 
          <Pressable onPress={() => console.log('Forgot password pressed. Redirect to Forgot Password screen.')}>
            <Text style={styles.clickableText2}>Forgot your password?</Text>
          </Pressable>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
        <TouchableOpacity
        style={styles.checkBox}
        activeOpacity={0.8}
        onPress={()=> setKeepSigned(!keepSigned)
        }

>   </TouchableOpacity>

          <Pressable onPress={() => console.log('Sign up pressed. Redirect to Sign Up screen.')}>
            <Text style={styles.clickableText}>Don't have an account? Sign up</Text>
          </Pressable>
          {error ? <Text style={styles.error}>{error}</Text> : null}  
          </View>
  )
} 
 
const styles = StyleSheet.create({ 

  label:{
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: 1,
    marginBottom: 6, 
  },
  subtitle: { 
    fontSize: 15, 
    fontWeight: '500', 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 5, 
  },  
  error: { 
    color: 'red', 
    fontWeight: '500',
    marginBottom: 12, 
    textAlign: 'center',
  }, 
clickableText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#e35706',
    textAlign: 'center',
    marginBottom: 5,
  },
 clickableText2: {
    fontSize: 15,
    fontWeight: '500',
    color: '#e35706',
    textAlign: 'center',
    marginBottom: 15,
  },
 
  input: { 
    width: 300,
    maxWidth: 800, 
    height: 30, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 100, 
    marginBottom: 12,
   }, 
  button: { 
    backgroundColor: '#e35706', 
    width: 300,
    padding: 12, 
    borderRadius: 4, 
    marginBottom: 12,
    alignItems: 'center', 
  }, 
  buttonText: { 
    color: '#FFF',
    fontSize: 16, 
    fontWeight: '600', 
  }, 
  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  title: { 
    fontSize: 60, 
    fontWeight: '700', 
    color: '#000', 
    marginBottom: 8, 
    letterSpacing: -1,
    textAlign: 'center', 
    fontFamily: 'Times New Roman', 
  }, 
    header: { 
    fontSize: 24, 
    fontWeight: '700',
    marginBottom: 50,
    top: -50,
    textAlign: 'left',
  },  
    welcome: {
    fontSize: 25,
    fontFamily: 'Times New Roman',
    fontWeight: '700',
    color: '#000',
    marginBottom: 100,
    textAlign: 'left',
  },
}); 