import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
};

type RootStackParamList = {
  Home: undefined;
  MyBooks: { type: 'readBooks' | 'wishBooks' };
};

type BookSearchScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function BookSearch() {
  const navigation = useNavigation<BookSearchScreenProp>();
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [wishBooks, setWishBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadBooks('readBooks', setReadBooks);
    loadBooks('wishBooks', setWishBooks);
  }, []);

  const loadBooks = async (type: 'readBooks' | 'wishBooks', setter: React.Dispatch<React.SetStateAction<Book[]>>) => {
    const data = await AsyncStorage.getItem(type);
    setter(data ? JSON.parse(data) : []);
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

  const toggleBook = async (book: Book, type: 'readBooks' | 'wishBooks') => {
    const currentList = type === 'readBooks' ? readBooks : wishBooks;
    const setter = type === 'readBooks' ? setReadBooks : setWishBooks;

    const exists = currentList.find(b => b.id === book.id);
    let newList: Book[];
    if (exists) {
      newList = currentList.filter(b => b.id !== book.id);
    } else {
      newList = [...currentList, book];
    }
    setter(newList);
    await AsyncStorage.setItem(type, JSON.stringify(newList));
  };

  const isRead = (bookId: string) => readBooks.some(b => b.id === bookId);
  const isWish = (bookId: string) => wishBooks.some(b => b.id === bookId);

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un livre..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.searchButtonWrapper}>
          <Button title="Rechercher" onPress={handleSearch} color="#9c177fff" />
        </View>
      </View>


      <FlatList
        style={styles.list}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.book}>
            {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.authors}>{item.authors.join(', ')}</Text>
            </View>


            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => toggleBook(item, 'readBooks')}>
                <Ionicons
                  name={isRead(item.id) ? 'book' : 'book-outline'}
                  size={28}
                  color={isRead(item.id) ? '#7e0874ff' : '#555'}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleBook(item, 'wishBooks')} style={{ marginTop: 10 }}>
                <Ionicons
                  name={isWish(item.id) ? 'heart' : 'heart-outline'}
                  size={28}
                  color={isWish(item.id) ? '#E91E63' : '#555'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Footer fixe */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('MyBooks', { type: 'readBooks' })}>
          <Ionicons name="book" size={28} color="#7e0874ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyBooks', { type: 'wishBooks' })}>
          <Ionicons name="heart" size={28} color="#E91E63" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchContainer: { padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, height: 40 },
  searchButtonWrapper: { marginLeft: 10, borderRadius: 8, overflow: 'hidden' },
  list: { flex: 1, paddingHorizontal: 10, marginTop: 10 },
  book: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  thumbnail: { width: 50, height: 75 },
  title: { fontWeight: 'bold', fontSize: 16 },
  authors: { color: '#555' },
  iconContainer: { marginLeft: 10, flexDirection: 'column', alignItems: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#f9f9f9' },
});