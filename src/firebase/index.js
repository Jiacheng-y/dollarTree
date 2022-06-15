import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc} from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyABi00gBjrUfJEujGU6u2I1OxGHTRpcBuM",
    authDomain: "dollartree-6eb49.firebaseapp.com",
    projectId: "dollartree-6eb49",
    storageBucket: "dollartree-6eb49.appspot.com",
    messagingSenderId: "224709132471",
    appId: "1:224709132471:web:c82838c7ff834f4a3c8d32",
    measurementId: "G-84WRZPE0JB"
}); 

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);


