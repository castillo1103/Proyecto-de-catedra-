import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const SongDetailScreen = ({ route }) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      {}
      <Image source={{ uri: song.images[0].url }} style={styles.songImage} />

      {}
      <Text style={styles.songTitle}>{song.name}</Text>

      {}
      <Text style={styles.songArtist}>{song.artists.map(artist => artist.name).join(', ')}</Text>

      {}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(song.external_urls.spotify)}
      >
        {}
        
        <Text style={styles.playButtonText}>Reproducir en Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212', 
    padding: 20
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
    marginTop: 10
  },
  songArtist: {
    fontSize: 16,
    color: '#b3b3b3',
    marginBottom: 20
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954', 
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    elevation: 5 // Sombra para hacer el botón más atractivo
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  spotifyIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  }
});

export default SongDetailScreen;
