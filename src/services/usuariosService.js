import { db } from '../database/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const guardarUsuario = async (datosUsuario) => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), datosUsuario);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};