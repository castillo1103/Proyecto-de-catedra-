# Proyecto-de-catedra-

<h2>📌 Descripción General</h2>

Nuestra aplicación de música, desarrollada con React Native y la Spotify API, permite a los usuarios buscar, explorar y reproducir sus canciones favoritas de manera sencilla. Con una interfaz moderna y responsiva, la aplicación funciona en emuladores y dispositivos reales gracias a Expo Go. Su diseño intuitivo garantiza una navegación fluida para acceder rápidamente a la música.

----------------------------------------------------------------------------------------------------

<h2>👥Integrantes del proyecto</h2>

Caleb Alejandro Peñate Deras       PD230166

Camila Elizabeth Castillo Joya     CJ220498

Manuel Ezequiel Guerrero Granados  GG241501

Lucia Milena Hernández Bonilla     HB221258

Daniel Ernesto Alvarado Roque      AR220441

---------------------------------------------------------------------------------------------------------------------------------------------

<h2>🛠️ Tecnologías Utilizadas</h2>

🎵 React Native: Desarrollo de la interfaz de usuario adaptable y fluida.

🎧 Spotify API: Integración para acceder a una amplia biblioteca de música en streaming.

💻 Visual Studio Code: Entorno de desarrollo flexible y potente.

📱 Android Studio: Emulación y pruebas en dispositivos virtuales.

🚀 Expo Go: Ejecución en dispositivos físicos sin necesidad de configuración compleja.

🔧 Node.js & npm: Gestión de paquetes y dependencias del proyecto.

-------------------------------------------------------------------------------------------------------------------

<h2>🚀Pasos para la instalación de la aplicación</h2>

1. **Clona el repositorio o descarga el proyecto.(el proyecto se encuentra en la rama Test-app)**

```powershell
   git clone https://github.com/castillo1103/Proyecto-de-catedra-
   cd Proyecto-de-catedra-
   git checkout Test-app
   ```

2. **Instala las dependencias del proyecto:**
   ```powershell
   npm install
   ```

3. **Instala Expo CLI globalmente si no lo tienes:**
   ```powershell
   npm install -g expo-cli
   ```

4. **Inicia la aplicación:**
   ```powershell
   npx expo start
   ```

5. **Escanea el código QR con la app Expo Go** en tu dispositivo móvil o ejecuta en un emulador.

---------------------------------------------------------------------------------------------------------------------------------------------

## 📦 Dependencias utilizadas

- **expo**: ^53.0.0
- **react**: 19.0.0
- **react-native**: 0.79.2
- **@expo/vector-icons**: ^14.1.0
- **@react-native-async-storage/async-storage**: 2.1.2
- **@react-navigation/drawer**: ^7.3.12
- **@react-navigation/native**: ^7.1.9
- **@react-navigation/stack**: ^7.2.1
- **expo-av**: ~15.1.4
- **expo-location**: ~18.1.5
- **expo-secure-store**: ~14.0.1
- **expo-status-bar**: ~2.2.3
- **react-native-gesture-handler**: ~2.24.0
- **react-native-reanimated**: ~3.17.4
- **react-native-safe-area-context**: ^5.4.0
- **react-native-screens**: ~4.10.0
- **react-native-vector-icons**: ^10.2.0
- **react-navigation**: ^5.0.0
- **expo-camera**: ~16.1.6

> **Nota:** Si quieres usar la cámara, debes compilar la app con EAS Build, ya que Expo Go no soporta `expo-camera` en SDK 49 o superior.

---------------------------------------------------------------------------------------------------------------------------------------------

## 📱 Funcionamiento

1. **Pantalla de inicio**

!(/Music_App/img/inicio.jpg)

Aquí se puede observar el formulario de registro paraa un usuario.

2. **Pantalla de registro**

!(/Music_App/img/registro.jpg)

Como somos nuevos en la aplicación hay que registrarse rellenando los campos, al completar el registro tenemos que iniciar sesión con el correo y la contraseña.

3. **Recuperación de contraseña**

!(/Music_App/img/recuperacion.jpg)

si hemos perdido nuestra contraseña podemos recuperarla con nuestro correo.


4. **Pantalla principal**

!(/Music_App/img/home.jpg)

Luego nos apareceran una lista de canciones al azar, si queremos mas detalles de una canción presionamos una.

5. **Pantalla de detalles**

!(/Music_App/img/detalles.jpg)
!(/Music_App/img/spotify.jpg)

En los detalles la informacion relacionada a la canción, podemos darle al corazón para agregar a favoritas y tambien al boton de escuchar que nos llevara a la aplicación o a la pagina de Spotify.

6. **pantalla de canciones favoritas**

!(/Music_App/img/favorito.jpg)

Aca estan las canciones agregadas como favoritas.

7. **pantalla de grabación de audio**

!(/Music_App/img/audio.jpg)

Es un apartado para grabar y escuchar lo que se graba.

8. **pantalla de perfil**

!(/Music_App/img/perfil.jpg)

En esta pantalla aparecen nuestros datos ingresados en el principio. ademas podemos tomar una foto nuestro perfil.

9. **Modulos agregados**

!(/Music_App/img/ubicacion.jpg)
!(/Music_App/img/foto.jpg)

Se agregaron estos 2 modulos, en los que al iniciarse por primera vez pide los permisos del dispositivo.