import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function NuevaCitaPage() {
  const [horaAgendada, setHoraAgendada] = useState('12:00');
  const [duracion, setDuracion] = useState(120); // Minutos (2 horas por defecto)
  const [bloquesOcupados, setBloquesOcupados] = useState([]);

  // Horas base de 30 min (Esto se filtrará con Firebase luego)
  const horasDisponibles = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];
  const opcionesDuracion = [
    { label: '30 min', value: 30 },
    { label: '1 hora', value: 60 },
    { label: '1.5 horas', value: 90 },
    { label: '2 horas', value: 120 },
    { label: '2.5 horas', value: 150 },
  ];

  // EFECTO: Calcula qué bloques se ocuparán automáticamente
  useEffect(() => {
    generarVistaPrevia(horaAgendada, duracion);
  }, [horaAgendada, duracion]);

  const generarVistaPrevia = (inicio, mins) => {
    let bloques = [];
    let [h, m] = inicio.split(':').map(Number);
    let totalBloques = mins / 30;

    for (let i = 0; i < totalBloques; i++) {
      let hh = String(h).padStart(2, '0');
      let mm = String(m).padStart(2, '0');
      bloques.push(`${hh}:${mm}`);
      
      m += 30;
      if (m >= 60) {
        h += 1;
        m = 0;
      }
    }
    setBloquesOcupados(bloques);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva Cita</Text>

      {/* SECCIÓN 1: HORA DE INICIO */}
      <View style={styles.section}>
        <Text style={styles.label}>1. Selecciona Hora Agendada</Text>
        <FlatList
          data={horasDisponibles}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.timeChip, horaAgendada === item && styles.activeChip]}
              onPress={() => setHoraAgendada(item)}
            >
              <Text style={[styles.timeText, horaAgendada === item && styles.activeText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* SECCIÓN 2: DURACIÓN */}
      <View style={styles.section}>
        <Text style={styles.label}>2. Duración del Trabajo</Text>
        <View style={styles.durationGrid}>
          {opcionesDuracion.map((opt) => (
            <TouchableOpacity 
              key={opt.value}
              style={[styles.durationBtn, duracion === opt.value && styles.activeDuration]}
              onPress={() => setDuracion(opt.value)}
            >
              <Text style={[styles.durationText, duracion === opt.value && styles.activeText]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SECCIÓN 3: IMPACTO VISUAL (Resumen) */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <MaterialCommunityIcons name="clock-check-outline" size={24} color={theme.colors.brand} />
          <Text style={styles.summaryTitle}>Resumen del Bloque</Text>
        </View>
        
        <Text style={styles.summaryInfo}>
          Inicia: <Text style={{fontWeight: 'bold'}}>{horaAgendada}</Text> | 
          Termina: <Text style={{fontWeight: 'bold'}}>{bloquesOcupados[bloquesOcupados.length - 1]}</Text>
        </Text>

        <View style={styles.blocksContainer}>
          {bloquesOcupados.map((b, index) => (
            <View key={index} style={styles.miniBlock}>
              <Text style={styles.miniBlockText}>{b}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.hint}>Estos {bloquesOcupados.length} bloques quedarán inhabilitados.</Text>
      </View>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Confirmar Reservación</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  section: { marginBottom: 25 },
  label: { fontSize: 16, fontWeight: '600', color: '#4B5563', marginBottom: 12 },
  timeChip: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, marginRight: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  activeChip: { backgroundColor: theme.colors.brand, borderColor: theme.colors.brand },
  timeText: { fontWeight: '600', color: '#4B5563' },
  activeText: { color: '#fff' },
  durationGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  durationBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 10, width: '31%', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  activeDuration: { backgroundColor: '#4B5563', borderColor: '#4B5563' },
  durationText: { fontSize: 13, fontWeight: '500' },
  summaryCard: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 2 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 10 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold' },
  summaryInfo: { fontSize: 15, color: '#374151', marginBottom: 15 },
  blocksContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  miniBlock: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderLeftWidth: 3, borderLeftColor: '#EF4444' },
  miniBlockText: { fontSize: 12, color: '#991B1B', fontWeight: '700' },
  hint: { fontSize: 12, color: '#9CA3AF', marginTop: 15, fontStyle: 'italic' },
  saveBtn: { backgroundColor: theme.colors.brand, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});