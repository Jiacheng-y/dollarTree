import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc, onSnapshot } from 'firebase/firestore'; 
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { useState } from 'react';

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

export const loginEmailPassword = async (loginEmail, loginPassword) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } 
    catch (error) {
    //     errorMessage(error);
    }
}

export const signupEmailPassword = async (loginEmail, loginPassword) => {
    try {
        await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                setDoc(doc(db, "users", userCredential.user.uid), {
                    id: userCredential.user.uid,
                    email: userCredential.user.email
                });
            })
    }
    catch (error) {
    //     showAuthError(error);
    }
}

export const logout = async () => {
    await signOut(auth);
}

export const authState = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);   
    onAuthStateChanged(auth, (user) => user ? setIsSignedIn(true) : setIsSignedIn(false));         
    return isSignedIn;
}

export const db = getFirestore(firebaseApp);

export const addItem = (text, category) => {
    const thisUserID = auth.currentUser.uid;
    addDoc(collection(db, "users", `${thisUserID}`, `${category}`), {
        expense: text
    })
}
