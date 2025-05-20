import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SongDetailScreen = ({ route }) => {
  const { song } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    const favorites = favs ? JSON.parse(favs) : [];
    setIsFavorite(favorites.some(fav => fav.id === song.id));
  };

  const toggleFavorite = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    let favorites = favs ? JSON.parse(favs) : [];
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== song.id);
      Alert.alert('Eliminado', 'Canción eliminada de favoritos');
    } else {
      favorites.push(song);
      Alert.alert('Guardado', 'Canción agregada a favoritos');
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: song.images[0]?.url }} style={styles.songImage} />
      <Text style={styles.songTitle}>{song.name}</Text>
      <Text style={styles.songArtist}>
        {song.artists.map(artist => artist.name).join(', ')}
      </Text>
      <Text style={styles.songDate}>Lanzado: {song.release_date}</Text>
      <Text style={styles.songInfo}>
        Total de canciones: {song.total_tracks}
      </Text>
      <Text style={styles.songInfo}>
        Tipo: {song.album_type === 'single' ? 'Sencillo' : 'Álbum'}
      </Text>
      {/* Botón de favorito */}
      <TouchableOpacity onPress={toggleFavorite} style={{ marginVertical: 10 }}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={32} color="#1DB954" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.spotifyButton}
        onPress={() => Linking.openURL(song.external_urls.spotify)}
      >
        <Ionicons name="logo-spotify" size={24} color="#fff" />
        <Text style={styles.spotifyButtonText}>Escuchar en Spotify</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#121212',
    flexGrow: 1,
  },
  songImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#1DB954',
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 16,
    color: '#b3b3b3',
    marginBottom: 10,
    textAlign: 'center',
  },
  songDate: {
    fontSize: 14,
    color: '#8f8f8f',
    marginBottom: 5,
    textAlign: 'center',
  },
  songInfo: {
    fontSize: 14,
    color: '#b3b3b3',
    marginBottom: 5,
    textAlign: 'center',
  },
  spotifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 30,
    elevation: 5,
  },
  spotifyButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default SongDetailScreen;