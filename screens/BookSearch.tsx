import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
};

export default function BookSearch() {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [wishBooks, setWishBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadBooks('readBooks', setReadBooks);
    loadBooks('wishBooks', setWishBooks);
  }, []);

  const loadBooks = async (type: 'readBooks' | 'wishBooks', setter: React.Dispatch<React.SetStateAction<Book[]>>) => {
    try {
      const data = await AsyncStorage.getItem(type);
      setter(data ? JSON.parse(data) : []);
    } catch (error) {
      console.log('Erreur chargement livres :', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchText)}`
      );
      const items = response.data.items || [];
      const formattedBooks = items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      }));
      setBooks(formattedBooks);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const saveBook = async (book: Book, type: 'readBooks' | 'wishBooks') => {
    try {
      const currentList = type === 'readBooks' ? readBooks : wishBooks;
      const setter = type === 'readBooks' ? setReadBooks : setWishBooks;

      if (currentList.find(b => b.id === book.id)) {
        Alert.alert('Déjà enregistré', 'Ce livre est déjà dans cette liste.');
        return;
      }

      const newList = [...currentList, book];
      setter(newList);
      await AsyncStorage.setItem(type, JSON.stringify(newList));
      Alert.alert('Succès', `"${book.title}" a été ajouté à la liste ${type === 'readBooks' ? 'Déjà lu' : 'Envie'}.`);
    } catch (error) {
      console.log('Erreur sauvegarde livre :', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un livre..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Rechercher" onPress={handleSearch} />

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.book}>
            {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.authors}>{item.authors.join(', ')}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => saveBook(item, 'readBooks')} style={styles.readButton}>
                <Text style={styles.buttonText}>Déjà lu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => saveBook(item, 'wishBooks')} style={styles.wishButton}>
                <Text style={styles.buttonText}>Envie</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 10 },
  book: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  thumbnail: { width: 50, height: 75 },
  title: { fontSize: 16, fontWeight: 'bold' },
  authors: { fontSize: 14, color: '#555' },
  buttonContainer: { flexDirection: 'column', justifyContent: 'space-between' },
  readButton: { backgroundColor: '#4CAF50', padding: 6, borderRadius: 6, marginBottom: 4 },
  wishButton: { backgroundColor: '#2196F3', padding: 6, borderRadius: 6 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});