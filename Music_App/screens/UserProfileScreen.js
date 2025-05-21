import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Camera } from 'expo-camera';

const UserProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const { name = '', email = '', password = '', phone = '', address = 'Universidad Don Bosco' } = route.params || {};

  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPassword, setEditPassword] = useState(password);
  const [editPhone, setEditPhone] = useState(phone);
  const [editAddress, setEditAddress] = useState(address);

  // foto de perfil
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  // Solicitar permisos de cámara
  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    setModalVisible(true);
  };

  // Tomar foto
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setProfileImage(photo.uri);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <TouchableOpacity onPress={openCamera}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.cameraText}>Cambiar foto</Text>
      </TouchableOpacity>

      {/* Modal de cámara */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {hasPermission ? (
            <Camera style={{ flex: 1 }} ref={cameraRef}>
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                  <Text style={{ color: '#fff', fontSize: 18 }}>Tomar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cameraButton} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#fff', fontSize: 18 }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <View style={styles.permissionContainer}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>No se ha concedido permiso para la cámara.</Text>
              <TouchableOpacity style={styles.cameraButton} onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      <TextInput
        placeholder="Nombre"
        value={editName}
        style={styles.input}
        onChangeText={setEditName}
      />
      <TextInput
        placeholder="Correo"
        value={editEmail}
        style={styles.input}
        onChangeText={setEditEmail}
      />
      <TextInput
        placeholder="Contraseña"
        value={editPassword}
        secureTextEntry
        style={styles.input}
        onChangeText={setEditPassword}
      />
      <TextInput
        placeholder="Teléfono"
        value={editPhone}
        style={styles.input}
        onChangeText={setEditPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Dirección"
        value={editAddress}
        style={styles.input}
        onChangeText={setEditAddress}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#1DB954',
    alignSelf: 'center',
  },
  cameraText: {
    color: '#1DB954',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#4a4a4a',
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 40,
    flex: 1,
  },
  cameraButton: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default UserProfileScreen;
