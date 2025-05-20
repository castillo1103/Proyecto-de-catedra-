import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

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
    <View style={styles.container}>
      <Text style={styles.title}>Grabar y Reproducir Audio</Text>
      {isRecording && <Text style={{ color: 'red', marginBottom: 10 }}>Grabando...</Text>}
      <Button
        title={isRecording ? "Detener grabación" : "Grabar voz"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <View style={{ height: 20 }} />
      <Button
        title={isPlaying ? "Detener reproducción" : "Reproducir grabación"}
        onPress={isPlaying ? stopAudio : playAudio}
        disabled={!audioUri}
      />
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