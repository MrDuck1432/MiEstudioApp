import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth'; // Escucha el estado del usuario
import { auth } from './src/database/firebaseConfig'; // Tu config de Firebase

// Importamos tus páginas y el Navegador de pestañas
import LoginPage from './src/pages/user/loginPage'; 
import RegisterPage from './src/pages/user/registerPage'; 
import MainTabNavigation from './src/navigation/mainTabNavigation';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // El "Guardián": Verifica si hay un usuario logueado al abrir la app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userState) => {
      setUser(userState);
      setLoading(false);
    });
    return unsubscribe; // Limpia el listener
  }, []);

  if (loading) return null; // Aquí podrías poner un Splash Screen o Spinner

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // SI HAY USUARIO: Solo mostramos la barra de 5 bloques
          // El nombre "Main" es el que usarás para referirte a todo el Tab
          <Stack.Screen name="Main" component={MainTabNavigation} />
        ) : (
          // SI NO HAY USUARIO: Mostramos Login y Registro
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}