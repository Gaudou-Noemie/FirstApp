import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
};

type MyBooksScreenProp = NativeStackNavigationProp<RootStackParamList, 'MyBooks'>;

export default function MyBooks({ route }: any) {
  const { type } = route.params as { type: 'readBooks' | 'wishBooks' };
  const navigation = useNavigation<MyBooksScreenProp>();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await AsyncStorage.getItem(type);
      setBooks(data ? JSON.parse(data) : []);
    } catch (error) {
      console.log('Erreur chargement livres :', error);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>

      {books.length === 0 ? (
        <Text style={styles.empty}>Aucun livre</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.book}>
              {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.authors}>{item.authors.join(', ')}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { marginBottom: 10 },
  backButtonText: { color: '#4A90E2', fontSize: 16 },
  book: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
  thumbnail: { width: 50, height: 75 },
  title: { fontWeight: 'bold', fontSize: 16 },
  authors: { color: '#555', fontSize: 14 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});