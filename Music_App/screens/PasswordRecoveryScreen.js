import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PasswordRecoveryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperación de contraseña</Text>
      <TextInput placeholder="Correo electrónico" style={styles.input} />
      <Button title="Enviar" onPress={() => {}} />
      <Button title="Sign up" onPress={() => navigation.navigate('Register')} />
      <Button title="Volver al inicio de sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: '100%', padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
});

export default PasswordRecoveryScreen;