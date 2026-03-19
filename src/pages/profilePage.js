import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '../constants/theme';
import authService from '../services/authService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfilePage() {
  // Obtenemos los datos del usuario actual desde nuestro servicio
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      // El guardián en App.js se encarga de redirigir al Login automáticamente
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Sección de Encabezado / Avatar */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account-circle" size={100} color={theme.colors.brand} />
          </View>
          <Text style={styles.userName}>Hola, {user?.email?.split('@')[0] || 'Usuario'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Bloque de Información/Ajustes */}
        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoItem}>
            <MaterialCommunityIcons name="shield-check-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>Seguridad de la cuenta</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>Notificaciones</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>Centro de ayuda</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versión 1.0.0 - DuckIndustries</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
  infoSection: {
    width: '100%',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 10,
    marginBottom: 30,
    ...theme.shadows.card,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.error, // Usamos el rojo definido en tu theme
    width: '100%',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    marginTop: 30,
    fontSize: 12,
    color: '#ccc',
  }
});