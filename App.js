import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './src/database/firebaseConfig'; 
import authService from './src/services/authService'; // Importamos tu servicio de datos

// Importamos tus páginas existentes
import LoginPage from './src/pages/user/loginPage'; 
import RegisterPage from './src/pages/user/registerPage'; 
import MainTabNavigation from './src/navigation/mainTabNavigation';
import NuevaCitaPage from './src/pages/admin/nuevaCitaPage';
import DashboardPage from './src/pages/admin/dashboardPage';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Nuevo: Para saber si es admin o cliente
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userState) => {
      if (userState) {
        // Buscamos el rol en Firestore antes de dejarlo pasar
        const perfil = await authService.getUserData(userState.uid);
        setUser(userState);
        setRole(perfil?.rol || 'cliente'); // Por defecto cliente si no hay rol
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    
    return unsubscribe; 
  }, []);

  if (loading) return null; 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // --- SI HAY USUARIO: SEPARAMOS POR ROL ---
          role === 'admin' ? (
            <>
              <Stack.Screen name="AdminDashboard" component={DashboardPage} />
              <Stack.Screen name="NuevaCita" component={NuevaCitaPage} />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainTabNavigation} />
          )
        ) : (
          // --- SI NO HAY USUARIO: LOGIN / REGISTER ---
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}