import { auth, db } from '../database/firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UsuarioModel } from '../models/UsuarioModel';

const authService = {
  signUp: async (email, password, nombre, extraData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const modeloBase = UsuarioModel(nombre, email);

      const perfilCompleto = {
        uid: user.uid,
        ...modeloBase,
        ...extraData 
      };

      await setDoc(doc(db, "usuarios", user.uid), perfilCompleto);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // --- ESTA ES LA FUNCIÓN QUE TE FALTABA PARA EL APP.JS ---
  getUserData: async (uid) => {
    try {
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return null;
    }
  },

  getCurrentUser: () => {
    return auth.currentUser;
  }
};

export default authService;