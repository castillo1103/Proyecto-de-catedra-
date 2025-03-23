import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SPOTIFY_CLIENT_ID = '1417fc3988b0455e8bac7476bacdcd1b';
const SPOTIFY_CLIENT_SECRET = 'b5fdcedefbfa4801b0031a5ad8d8f525';

const HomeScreen = ({ navigation }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSpotifyMusic = async () => {
      try {
        const authResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
        });
        const authData = await authResponse.json();
        const token = authData.access_token;

        const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setSongs(data.albums.items);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    };

    fetchSpotifyMusic();
  }, []);

  return (
    <View style={styles.container}>
      {/* Icono de perfil flotante */}
      <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('UserProfile')}>
        <Ionicons name="person-circle-outline" size={40} color="white" />
      </TouchableOpacity>

      {/* Lista de canciones */}
      <ScrollView contentContainerStyle={styles.songList}>
        {songs.map((song, index) => (
          <TouchableOpacity
            key={index}
            style={styles.songCard}
            onPress={() => navigation.navigate('Detalles', { song })}
          >
            <Image source={{ uri: song.images[0].url }} style={styles.songImage} />
            <Text style={styles.songTitle}>{song.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    paddingTop: 40,
    paddingHorizontal: 10
  },
  profileIcon: {
    position: 'absolute',
    top: 20, // Mover el icono más abajo para que no se superponga
    right: 20,
    backgroundColor: '#30691f', // Fondo azul para el icono
    padding: 10,
    borderRadius: 30,
    elevation: 5, // Sombra para el icono
  },
  songList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 80, // Empujar las tarjetas hacia abajo para no cubrir el icono
  },
  songCard: {
    width: '48%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Fondo oscuro para las tarjetas
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Sombra suave para las tarjetas
  },
  songImage: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    marginBottom: 10,
  },
  songTitle: {
    color: '#fff', // Título en blanco para buen contraste
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
