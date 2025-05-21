import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const AudioScreen = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Solicitar permisos
  const requestRecordingPermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita permiso para grabar audio.');
      return false;
    }
    return true;
  };

  // Iniciar grabación
  const startRecording = async () => {
    const granted = await requestRecordingPermission();
    if (!granted) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      Alert.alert('Error', 'No se pudo iniciar la grabación');
    }
  };

  // Detener grabación
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      Alert.alert('Error', 'No se pudo detener la grabación');
    }
  };

  // Reproducir grabación
  const playAudio = async () => {
    if (!audioUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setSound(null);
        }
      });
    } catch (err) {
      Alert.alert('Error', 'No se pudo reproducir el audio');
    }
  };

  // Detener reproducción
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Graba tu voz</Text>
      <Text style={styles.subtitle}>Puedes grabar y escuchar tu grabación aquí</Text>

      <View style={styles.recordSection}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording ? styles.recording : styles.notRecording,
          ]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Ionicons name={isRecording ? "stop-circle" : "mic-circle"} size={70} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {isRecording ? "Grabando..." : audioUri ? "Grabación lista" : "Presiona para grabar"}
        </Text>
      </View>

      {audioUri && (
        <View style={styles.playSection}>
          <TouchableOpacity
            style={[
              styles.playButton,
              isPlaying ? styles.playing : styles.notPlaying,
            ]}
            onPress={isPlaying ? stopAudio : playAudio}
          >
            <Ionicons name={isPlaying ? "stop" : "play"} size={40} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.statusText}>
            {isPlaying ? "Reproduciendo..." : "Presiona para escuchar tu grabación"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  recordSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  recordButton: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#e53935',
  },
  notRecording: {
    backgroundColor: '#1DB954',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  playSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  playButton: {
    backgroundColor: '#1DB954',
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
  },
  playing: {
    backgroundColor: '#fbc02d',
  },
  notPlaying: {
    backgroundColor: '#1DB954',
  },
});

export default AudioScreen;