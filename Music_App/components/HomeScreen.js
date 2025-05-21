import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const SPOTIFY_CLIENT_ID = '1417fc3988b0455e8bac7476bacdcd1b';
const SPOTIFY_CLIENT_SECRET = 'b5fdcedefbfa4801b0031a5ad8d8f525';

const HomeScreen = ({ navigation }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Obtener ubicación actual
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
      {/* Mostrar ubicación actual */}
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} color="#fff" />
        {location ? (
          <Text style={styles.locationText}>
            Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
          </Text>
        ) : (
          <Text style={styles.locationText}>
            {locationError ? locationError : 'Obteniendo ubicación...'}
          </Text>
        )}
      </View>

      {/* Icono de perfil flotante */}
      <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('UserProfile')}>
        <Ionicons name="person-circle-outline" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
          style={{ backgroundColor: '#1DB954', padding: 10, borderRadius: 20, alignSelf: 'center', marginBottom: 10 }}
          onPress={() => navigation.navigate('Audio')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ir al reproductor de audio</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={{
            backgroundColor: '#1DB954',
            padding: 10,
            borderRadius: 20,
            alignSelf: 'center',
            marginBottom: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('Favoritos')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver favoritos</Text>
      </TouchableOpacity>

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
    </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  locationText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  profileIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#30691f',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    zIndex: 10,
  },
  songList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 80,
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
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
  },
});
export default HomeScreen;