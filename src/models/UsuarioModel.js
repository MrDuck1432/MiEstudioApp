export const UsuarioModel = (nombre, email, rol = 'cliente') => {
  return {
    nombre: nombre || "",
    email: email || "",
    rol: rol,
    // Usamos string para evitar problemas de formato en diferentes regiones
    fechaRegistro: new Date().toISOString(), 
    estado: "activo",
    proximasCitas: [],
    puntos: 0, // ¡Tip! Para fidelizar clientes en DuckIndustries
  };
};