import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { theme } from '../constants/theme';

// Configuración en español para el calendario
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
};
LocaleConfig.defaultLocale = 'es';

export default function AgendaPage() {
  const [selectedDay, setSelectedDay] = useState('');
  const [availableHours, setAvailableHours] = useState([]);

  // Datos simulados (Esto vendrá de Firebase luego)
  const markedDates = {
    '2026-03-25': { marked: true, dotColor: 'red', activeOpacity: 0 }, // Ocupado
    [selectedDay]: { selected: true, selectedColor: theme.colors.brand } // Seleccionado
  };

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    // Simulación: Si es el día 25 (rojo), no damos horas
    if (day.dateString === '2026-03-25') {
      setAvailableHours([]);
    } else {
      // Horas ordenadas para la grilla
      setAvailableHours(['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00']);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservar Hora</Text>
      
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        minDate={new Date().toISOString().split('T')[0]} // Bloquea días pasados
        theme={{
          selectedDayBackgroundColor: theme.colors.brand,
          todayTextColor: theme.colors.brand,
          arrowColor: theme.colors.brand,
          textDayFontWeight: '500',
        }}
        style={styles.calendar}
      />

      <View style={styles.hoursWrapper}>
        <Text style={styles.sectionTitle}>
          {selectedDay ? `Horas disponibles:` : 'Selecciona una fecha'}
        </Text>

        {availableHours.length > 0 ? (
          <FlatList
            data={availableHours}
            numColumns={3} // AQUÍ: Orden en 3 bloques hacia el lado
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.hourBlock}>
                <Text style={styles.hourText}>{item}</Text>
              </TouchableOpacity>
            )}
            columnWrapperStyle={styles.row} // Espaciado entre bloques
          />
        ) : (
          selectedDay && (
            <View style={styles.noHoursContainer}>
              <Text style={styles.noHoursText}>No hay horas disponibles para este día.</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 15 },
  calendar: { borderRadius: 12, paddingBottom: 10, elevation: 2 },
  hoursWrapper: { flex: 1, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.textSecondary, marginBottom: 15 },
  row: { justifyContent: 'space-between', marginBottom: 10 },
  hourBlock: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.brand,
    width: '31%', // Para que quepan 3 con espacio
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  hourText: { color: theme.colors.brand, fontWeight: '700', fontSize: 16 },
  noHoursContainer: { padding: 20, alignItems: 'center', backgroundColor: '#fee2e2', borderRadius: 10 },
  noHoursText: { color: theme.colors.error, fontWeight: '500' }
});