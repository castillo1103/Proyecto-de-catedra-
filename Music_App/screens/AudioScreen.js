import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

const AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const AudioScreen = () => {
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Manejo de permisos para audio
  const requestAudioPermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita permiso para reproducir audio.');
      return false;
    }
    return true;
  };

  const playAudio = async () => {
    const granted = await requestAudioPermission();
    if (!granted) return;

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
      setPlaying(false);
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: AUDIO_URL });
    setSound(newSound);
    await newSound.playAsync();
    setPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setPlaying(false);
        setSound(null);
      }
    });
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproductor de Audio</Text>
      <Button title={playing ? "Detener" : "Reproducir"} onPress={playing ? stopAudio : playAudio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default AudioScreen;