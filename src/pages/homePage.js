import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import authService from '../services/authService';

export default function HomePage({ navigation }) {
  const handleLogout = async () => {
    await authService.logout();
    navigation.replace('Login'); // Al cerrar sesión, volvemos y limpiamos el historial
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a DuckIndustries!</Text>
      <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.textPrimary },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary, marginVertical: 20 },
  button: { backgroundColor: theme.colors.error, padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});