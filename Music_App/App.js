import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import SongDetailScreen from './components/SongDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AudioScreen from './screens/AudioScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#101111', // Color de fondo de la cabecera
            shadowOpacity: 0,
            // Eliminar sombra
          },
          headerTintColor: '#fff', // Color del texto de la cabecera
          headerTitleStyle: {
            fontWeight: 'bold', // Hacer el título más destacado
            fontSize: 24, // Tamaño de la fuente del título
          },
          headerBackTitleVisible: false, // Eliminar el texto "Back" de las cabeceras
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} options={{ title: 'Recuperar contraseña' }} />
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Detalles" component={SongDetailScreen} options={{ title: 'Detalles de la canción' }} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Perfil de usuario' }} />
        <Stack.Screen name="Audio" component={AudioScreen} options={{ title: 'Audio' }} />
        <Stack.Screen name="Favoritos" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;