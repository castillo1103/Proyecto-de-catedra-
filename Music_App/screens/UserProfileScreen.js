import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {}
      <Text style={styles.title}>Perfil de Usuario</Text>

      {}
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />

      {}
      <TextInput placeholder="Nombre" value="Juana Perez" style={styles.input} />
      <TextInput placeholder="Correo" value="juanaperez@gmail.com" style={styles.input} />
      <TextInput placeholder="Contraseña" value="************" secureTextEntry style={styles.input} />
      <TextInput placeholder="Teléfono" value="55555555" style={styles.input} />
      <TextInput placeholder="Dirección" value="Universidad Don Bosco" style={styles.input} />

      {}
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
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#1DB954',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5, // Sombra para darle un efecto elevado
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc', // Borde gris claro para inputs
    borderRadius: 8,
    backgroundColor: '#4a4a4a', // Fondo blanco para los inputs
    color: 'gray', // Texto oscuro para un buen contraste
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // Rojo para el botón de cerrar sesión
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
