import * as React from 'react';
import { View, Text } from 'react-native'; // Para el componente temporal
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORTANTE: Importamos con el nombre exacto de tus archivos
import LoginPage from './src/pages/loginPage'; 
import RegisterPage from './src/pages/registerPage'; // <--- Ojo aquí, todo en minúsculas
import HomePage from './src/pages/homePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} 
      >
        {/* El "name" es el alias que usas en navigation.navigate('...') */}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}