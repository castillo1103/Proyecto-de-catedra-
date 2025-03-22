import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
      <TextInput placeholder="Nombre" value="Juana Perez" style={styles.input} />
      <TextInput placeholder="Correo" value="juanaperez@gmail.com" style={styles.input} />
      <TextInput placeholder="Contraseña" value="************" secureTextEntry style={styles.input} />
      <TextInput placeholder="Teléfono" value="55555555" style={styles.input} />
      <TextInput placeholder="Dirección" value="Universidad Don Bosco" style={styles.input} />
      <Button title="Cerrar Sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  profileImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  input: { width: '100%', padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
});

export default UserProfileScreen;