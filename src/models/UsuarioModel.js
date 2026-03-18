export const UsuarioModel = (nombre, email, rol = 'cliente') => {
  return {
    nombre: nombre || "",
    email: email || "",
    rol: rol,
    fechaRegistro: new Date(),
    estado: "activo",
    proximasCitas: []
  };
};