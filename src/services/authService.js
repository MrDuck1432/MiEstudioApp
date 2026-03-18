import { auth, db } from '../database/firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const authService = {
  // 1. REGISTRAR (Crear en Auth + Crear Perfil en Firestore)
  signUp: async (email, password, extraData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Creamos el documento del usuario en la base de datos
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        email: email,
        rol: 'cliente', // Escalable: aquí podrías poner 'admin' manualmente luego
        fechaRegistro: new Date().toISOString(),
        ...extraData // Aquí guardamos nombre, teléfono, etc.
      });

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
  }
};

export default authService;