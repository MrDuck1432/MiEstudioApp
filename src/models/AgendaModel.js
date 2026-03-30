export const AgendaModel = (adminId, semana, diaId, inicio, fin, bloques = []) => {
  return {
    adminId: adminId || "",
    semana: semana || "", // Formato s1-29d-04e
    dia: diaId || "",    // L, M1, M2, J, V, S, D
    horaInicio: inicio || "",
    horaTermino: fin || "",
    bloques: bloques,    // Array de strings ["12:00", "12:30"...]
    
    // Siguiendo tu estándar de UsuarioModel
    fechaRegistro: new Date().toISOString(), 
    estado: "disponible",
    
    // Relación con otros procesos
    citaId: null,        // Se llena cuando un cliente agenda
    clienteId: null,     // ID del cliente que tomó el bloque
    puntosGenerados: 0,  // Para la fidelización de DuckIndustries
  };
};