import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SongDetailScreen = ({ route }) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.images[0].url }} style={styles.songImage} />
      <Text style={styles.songTitle}>{song.name}</Text>
      <Text style={styles.songArtist}>{song.artists.map(artist => artist.name).join(', ')}</Text>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(song.external_urls.spotify)}
      >
        <Ionicons name="logo-spotify" size={24} color="white" />
        <Text style={styles.playButtonText}>Reproducir en Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  songImage: { width: 200, height: 200, borderRadius: 10 },
  songTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  songArtist: { fontSize: 16, color: 'gray', marginBottom: 20 },
  playButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'green', padding: 10, borderRadius: 10 },
  playButtonText: { color: 'white', fontSize: 16, marginLeft: 10 },
});

export default SongDetailScreen;
