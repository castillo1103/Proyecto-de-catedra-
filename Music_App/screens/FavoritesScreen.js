import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.songCard}
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