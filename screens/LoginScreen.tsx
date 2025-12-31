import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (email === storedEmail && password === storedPassword) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se connecter.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>NowBooks</Text>
      <Text style={styles.subtitle}>Lire. Noter. Partager.</Text>

      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  input: { width: '100%', height: 50, borderWidth: 1, borderRadius: 8, padding: 15, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#be14e0ff', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { color: '#d224e9ff', marginTop: 15 },
});