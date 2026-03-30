import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

// --- RUTAS CORREGIDAS SEGÚN TU ESTRUCTURA ---
import { db, auth } from '../../database/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { AgendaModel } from '../../models/agendaModel';

export default function NuevaCitaPage({ navigation }) {
  const [horaAgendada, setHoraAgendada] = useState('12:00');
  const [duracion, setDuracion] = useState(120);
  const [bloquesOcupados, setBloquesOcupados] = useState([]);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState('S1: 23-29 de marzo');
  const [loading, setLoading] = useState(false);

  const [showHoraModal, setShowHoraModal] = useState(false);
  const [showDuracionModal, setShowDuracionModal] = useState(false);
  const [showSemanaModal, setShowSemanaModal] = useState(false);

  const horasDisponibles = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
  const opcionesDuracion = [{ label: '2 horas', value: 120 }, { label: '2.5 horas', value: 150 }, { label: '3 horas', value: 180 }];
  const opcionesSemanas = ['S1: 23-29 de marzo', 'S2: 30-05 de abril', 'S3: 06-12 de abril', 'S4: 13-19 de abril', 'S5: 27-04 de mayo'];
  const diasSemana = [{ id: 'L', nombre: 'L' }, { id: 'M1', nombre: 'M' }, { id: 'M2', nombre: 'M' }, { id: 'J', nombre: 'J' }, { id: 'V', nombre: 'V' }, { id: 'S', nombre: 'S' }, { id: 'D', nombre: 'D' }];

  useEffect(() => { generarVistaPrevia(horaAgendada, duracion); }, [horaAgendada, duracion]);

  const generarVistaPrevia = (inicio, mins) => {
    let bloques = [];
    let [h, m] = inicio.split(':').map(Number);
    for (let i = 0; i < mins / 30; i++) {
      bloques.push(`${String(h % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      m += 30; if (m >= 60) { h += 1; m = 0; }
    }
    setBloquesOcupados(bloques);
  };

  const calcularHoraTermino = () => {
    let [h, m] = horaAgendada.split(':').map(Number);
    let totalMinutos = h * 60 + m + duracion;
    return `${String(Math.floor(totalMinutos / 60) % 24).padStart(2, '0')}:${String(totalMinutos % 60).padStart(2, '0')}`;
  };

  const toggleDia = (id) => {
    setDiasSeleccionados(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const handleGuardarConfiguracion = async () => {
    if (diasSeleccionados.length === 0) return Alert.alert("Atención", "Selecciona al menos un día.");
    
    setLoading(true);
    try {
      const adminId = auth.currentUser?.uid || "admin_manual";
      const horaFin = calcularHoraTermino();

      const batchPromises = diasSeleccionados.map(diaId => {
        // Invocamos el modelo tal cual lo definiste
        const data = AgendaModel(
          adminId,
          semanaSeleccionada,
          diaId,
          horaAgendada,
          horaFin,
          bloquesOcupados
        );
        return addDoc(collection(db, "agenda"), data);
      });

      await Promise.all(batchPromises);

      Alert.alert("Éxito", "Configuración de agenda guardada.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Error Firebase:", error);
      Alert.alert("Error", "No se pudo guardar. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  const PickerModal = ({ visible, data, onSelect, onClose, title, currentVal }) => (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={styles.scrollArea}>
            {data.map((item, index) => {
              const val = item.value || item;
              return (
                <TouchableOpacity key={index} style={styles.modalOption} onPress={() => { onSelect(val); onClose(); }}>
                  <Text style={styles.optionText}>{item.label || item}</Text>
                  {val === currentVal && <MaterialCommunityIcons name="check" size={22} color={theme.colors.brand} style={styles.checkIcon} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}><Text style={styles.closeBtnText}>Cancelar</Text></TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Configurar Horario</Text>

        <Text style={styles.label}>1. Semana de Referencia</Text>
        <TouchableOpacity style={styles.selectTrigger} onPress={() => setShowSemanaModal(true)}>
          <View style={styles.triggerContent}>
            <MaterialCommunityIcons name="calendar-month-outline" size={22} color={theme.colors.brand} style={{marginRight: 10}} />
            <Text style={styles.selectValue}>{semanaSeleccionada}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
        </TouchableOpacity>

        <Text style={styles.label}>2. Días que aplica este horario</Text>
        <View style={styles.diasContainer}>
          {diasSemana.map((dia) => (
            <TouchableOpacity 
              key={dia.id} 
              onPress={() => toggleDia(dia.id)}
              style={[styles.diaCircle, diasSeleccionados.includes(dia.id) && styles.diaCircleActive]}
            >
              <Text style={[styles.diaText, diasSeleccionados.includes(dia.id) && styles.diaTextActive]}>{dia.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>3. Horario y Tiempo</Text>
        <View style={styles.rowSelectors}>
            <TouchableOpacity style={[styles.selectTrigger, { flex: 1.2, marginRight: 10 }]} onPress={() => setShowHoraModal(true)}>
              <Text style={styles.selectValueSmall}>Inicia: {horaAgendada}</Text>
              <MaterialCommunityIcons name="clock-outline" size={18} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectTrigger, { flex: 1 }]} onPress={() => setShowDuracionModal(true)}>
              <Text style={styles.selectValueSmall}>{opcionesDuracion.find(o => o.value === duracion)?.label}</Text>
              <MaterialCommunityIcons name="timer-outline" size={18} color="#666" />
            </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Vista previa de bloques:</Text>
          <View style={styles.blocksContainer}>
            {bloquesOcupados.map((b, index) => (
              <View key={index} style={styles.miniBlock}><Text style={styles.miniBlockText}>{b}</Text></View>
            ))}
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-check-outline" size={20} color={theme.colors.brand} />
            <Text style={styles.hint}>Termina a las {calcularHoraTermino()} hrs</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveBtn, loading && { opacity: 0.7 }]} 
          onPress={handleGuardarConfiguracion}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Guardar Configuración</Text>}
        </TouchableOpacity>

        <PickerModal visible={showSemanaModal} title="Semana" data={opcionesSemanas} onSelect={setSemanaSeleccionada} onClose={() => setShowSemanaModal(false)} currentVal={semanaSeleccionada} />
        <PickerModal visible={showHoraModal} title="Hora" data={horasDisponibles} onSelect={setHoraAgendada} onClose={() => setShowHoraModal(false)} currentVal={horaAgendada} />
        <PickerModal visible={showDuracionModal} title="Duración" data={opcionesDuracion} onSelect={setDuracion} onClose={() => setShowDuracionModal(false)} currentVal={duracion} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (Estilos se mantienen iguales)

const styles = StyleSheet.create({
  container: { padding: 20 },
  backBtn: { marginTop: 10, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 25 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#9CA3AF', marginBottom: 12, textTransform: 'uppercase' },
  selectTrigger: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  triggerContent: { flexDirection: 'row', alignItems: 'center' },
  selectValue: { fontSize: 16, fontWeight: '700', color: '#111827' },
  selectValueSmall: { fontSize: 14, fontWeight: '600' },
  rowSelectors: { flexDirection: 'row', marginBottom: 10 },
  diasContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  diaCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  diaCircleActive: { backgroundColor: theme.colors.brand, borderColor: theme.colors.brand },
  diaText: { fontWeight: 'bold', color: '#4B5563' },
  diaTextActive: { color: '#fff' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '85%', borderRadius: 25, padding: 20, maxHeight: '70%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  scrollArea: { marginBottom: 10 },
  modalOption: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', position: 'relative' },
  optionText: { fontSize: 17, color: '#374151', fontWeight: '500', textAlign: 'center' },
  checkIcon: { position: 'absolute', right: 20 },
  closeBtn: { marginTop: 10, padding: 15, alignItems: 'center' },
  closeBtnText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
  summaryCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginTop: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  summaryTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 12, color: '#4B5563' },
  blocksContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 15 },
  miniBlock: { backgroundColor: '#E0F2FE', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#0EA5E9' },
  miniBlockText: { fontSize: 12, color: '#0369A1', fontWeight: 'bold' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 12 },
  hint: { fontSize: 14, fontWeight: '700', color: '#111827' },
  saveBtn: { backgroundColor: theme.colors.brand, padding: 20, borderRadius: 18, alignItems: 'center', marginTop: 30, marginBottom: 40 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});