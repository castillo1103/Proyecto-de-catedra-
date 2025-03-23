import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  const validUsername = 'caleb.penate@gmail.com';  
  const validPassword = 'calebpenate2003';       

  
  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      navigation.navigate('Inicio');
    } else {
      
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>

      {}
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        placeholderTextColor="#8e8e8e"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#8e8e8e"
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón de Iniciar sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Olvidaste tu contraseña */}
      <TouchableOpacity onPress={() => navigation.navigate('PasswordRecovery')}>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Registro de nuevo usuario */}
      <TouchableOpacity style={styles.signUpContainer} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

      {/* Modal de error */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>Usuario o contraseña incorrectos</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#101111',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    backgroundColor: '#4a4a4a',
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#2e721a',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationColor: 'none',
  },
  forgotPassword: {
    marginTop: 15,
    color: '#d6d6d6',
    fontSize: 14,
    textDecorationLine: 'none',
  },
  signUpContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#d6d6d6',
    fontSize: 14,
  },

  // Estilos para el modal de alerta
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e721a',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#2e721a',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
