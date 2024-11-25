import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';

const config = {
  apiKey: "AIzaSyAVzvsfmOLw_U75gyt_y92XViR4GfE4DRA",
  authDomain: "vue-3-crud-4c717.firebaseapp.com",
  projectId: "vue-3-crud-4c717",
  storageBucket: "vue-3-crud-4c717.firebasestorage.app",
  messagingSenderId: "673060681950",
  appId: "1:673060681950:web:de332031f48d81d2ec6a4f"
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const usersCollection = collection(db, 'users');

export const createUser = async (user) => {
  try {
    const docRef = await addDoc(usersCollection, user);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const userDoc = await getDoc(doc(usersCollection, id));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    await updateDoc(doc(usersCollection, id), user);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(usersCollection, id));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export const useLoadUsers = () => {
  const users = ref([]);
  const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(unsubscribe);
  return users;
};
