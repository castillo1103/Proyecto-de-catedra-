import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const SPOTIFY_CLIENT_ID = '1417fc3988b0455e8bac7476bacdcd1b';
const SPOTIFY_CLIENT_SECRET = 'b5fdcedefbfa4801b0031a5ad8d8f525';

const HomeScreen = ({ navigation, route }) => {
  const { name, email } = route.params || {};
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permiso denegado para acceder a la ubicación');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

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
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyMusic();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Lista de canciones */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando canciones...</Text>
      ) : songs.length === 0 ? (
        <Text style={styles.loadingText}>No se encontraron canciones.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.songList}>
          {songs.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.songCard}
              onPress={() => navigation.navigate('Detalles', { song })}
            >
              <Image source={{ uri: song.images[0].url }} style={styles.songImage} />
              <Text style={styles.songTitle}>{song.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Audio')}
        >
          <Ionicons name="musical-notes-outline" size={28} color="white" />
          <Text style={styles.iconLabel}>Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Favoritos')}
        >
          <Ionicons name="heart-outline" size={28} color="white" />
          <Text style={styles.iconLabel}>Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('UserProfile', { name, email })}
        >
          <Ionicons name="person-outline" size={28} color="white" />
          <Text style={styles.iconLabel}>Perfil</Text>
        </TouchableOpacity>

        <View style={styles.iconButton}>
          <Ionicons name="location-outline" size={28} color="white" />
          <Text style={styles.iconLabel}>
            {location
              ? `Lat: ${location.latitude.toFixed(2)}`
              : locationError
              ? 'Error'
              : 'Ubicación'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 70, // espacio para la barra inferior
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
  },
  songList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  songCard: {
    width: '48%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  songImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  songTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1b1c1b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLabel: {
    fontSize: 10,
    color: 'white',
    marginTop: 2,
  },
});

export default HomeScreen;
