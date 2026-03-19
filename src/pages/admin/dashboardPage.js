import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Verifica que esta ruta sea exacta. Si tu archivo está en src/services/authService.js, esta ruta es correcta.
import authService from '../../services/authService'; 

export default function DashboardPage() {
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.userName}>Panel DuckIndustries</Text>
          <Text style={styles.userEmail}>Admin: {user?.email}</Text>
        </View>

        <View style={styles.grid}>
          <StatCard title="Agenda y Horas" value="Configurar" icon="calendar-clock" color="#4F46E5" />
          <StatCard title="Promociones" value="3 Activas" icon="tag-multiple" color="#10B981" />
          <StatCard title="Precios" value="Editar Lista" icon="currency-usd" color="#F59E0B" />
          <StatCard title="Clientes" value="12 Registrados" icon="account-group" color="#06B6D4" />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { padding: 20 },
  header: { marginTop: 40, marginBottom: 30 },
  userName: { fontSize: 26, fontWeight: 'bold', color: '#1F2937' },
  userEmail: { fontSize: 14, color: '#6B7280' },
  grid: { width: '100%', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    // Sombras básicas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: { padding: 10, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  cardValue: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  cardTitle: { fontSize: 12, color: '#6B7280' },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#EF4444', 
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
});