import { auth, db } from '../database/firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UsuarioModel } from '../models/UsuarioModel';
const authService = {
  // 1. REGISTRAR (Crear en Auth + Crear Perfil en Firestore)
signUp: async (email, password, nombre, extraData = {}) => {
    try {
      // 1. Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Generar el objeto base usando tu Plantilla/Modelo
      // Pasamos nombre y email, y el modelo pone el resto (rol: cliente, puntos: 0, etc.)
      const modeloBase = UsuarioModel(nombre, email);

      // 3. Fusionar con datos extra (por si en el futuro pides teléfono o dirección)
      const perfilCompleto = {
        uid: user.uid,
        ...modeloBase,
        ...extraData 
      };

      // 4. Guardar en Firestore
      await setDoc(doc(db, "usuarios", user.uid), perfilCompleto);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // 2. LOGIN
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // 3. LOGOUT
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  getCurrentUser: () => {
    return auth.currentUser; // Firebase nos da directamente el usuario logueado
  }
};

export default authService;