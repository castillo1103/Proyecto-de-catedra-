import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Button } from 'react-native';
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
      <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('UserProfile')}>
        <Ionicons name="person-circle-outline" size={40} color="black" />
      </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  profileIcon: { position: 'absolute', top: 10, right: 10 },
  songList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  songCard: { width: '48%', marginVertical: 10, alignItems: 'center' },
  songImage: { width: '95%', height: 190, borderRadius: 10 },
  songTitle: { textAlign: 'center', marginTop: 5, fontSize: 14 },
});

export default HomeScreen;