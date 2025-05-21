import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    setFavorites(favs ? JSON.parse(favs) : []);
  };

  const removeFromFavorites = async (songId) => {
    const newFavorites = favorites.filter(item => item.id !== songId);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const confirmDelete = (songId, songName) => {
    Alert.alert(
      "Eliminar de favoritos",
      `¿Deseas eliminar "${songName}" de tus favoritos?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => removeFromFavorites(songId) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.songCard}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
        onPress={() => navigation.navigate('Detalles', { song: item })}
      >
        <Image source={{ uri: item.images[0]?.url }} style={styles.songImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.songTitle}>{item.name}</Text>
          <Text style={styles.songArtist}>
            {item.artists.map(artist => artist.name).join(', ')}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Botón de eliminar */}
      <TouchableOpacity onPress={() => confirmDelete(item.id, item.name)}>
        <Ionicons name="trash-outline" size={24} color="#FF4D4D" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Canciones Favoritas</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No tienes canciones favoritas aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101111',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  emptyText: {
    color: '#b3b3b3',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default FavoritesScreen;
