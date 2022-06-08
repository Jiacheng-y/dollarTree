import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Pressable, Text, Keyboard, StyleSheet, View } from 'react-native';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; 
import { auth } from '../firebase';

export const AuthScreen = ({setAuthState}) => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState(true);
            } else {
                setAuthState(false);
            }
        });
    }, []);

    const logInEmailPassword = async (loginEmail, loginPassword) => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } 
        catch (error) {
            setErrorMessage("Wrong email or password.")
        }
    }
    
    const signUpEmailPassword = async (loginEmail, loginPassword) => {
        try {
           await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
                    .then((userCredential) => {
                        setDoc(doc(db, "users", userCredential.user.uid), {
                            id: userCredential.user.uid,
                            email: userCredential.user.email
                        });
                    });
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage("Email already exists.")
            } else if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-password') {
                setErrorMessage("Invalid email or password.")
            } else {
                setErrorMessage("Error.")
            }
        }
    }

    return (
        <SafeAreaView style={{alignItems: "center"}}>
            <Text style={styles.header}>
                Enter dollarTree
            </Text>

            <View style={{width: 350}}>
                <Text style={styles.entryName}>Email</Text>
                <TextInput
                    style={styles.entryBox}
                    placeholder='Email'
                    value={inputEmail}
                    onChangeText={setInputEmail}
                />
                <Text style={styles.entryName}>Password</Text>
                <TextInput
                    style={styles.entryBox}
                    placeholder='Password'
                    value={inputPassword}
                    onChangeText={setInputPassword}
                />
                <Text style={styles.footnote}>At least 6 characters</Text>
             </View>

             <View style={{flexDirection: 'row'}}>
                <Pressable 
                    style={styles.button}
                    onPress={() => {
                        logInEmailPassword(inputEmail, inputPassword);
                        Keyboard.dismiss;
                        setInputEmail('');
                        setInputPassword('');
                    }}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => {
                        signUpEmailPassword(inputEmail, inputPassword);
                        Keyboard.dismiss;
                        setInputEmail('');
                        setInputPassword('');
                    }}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>
            
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 45, 
        marginVertical: 30
    },
    entryName: {
        fontSize: 20,
        marginVertical: 15
    }, 
    entryBox: {
        backgroundColor: '#eef5ff',
        height: 55,
        width: 350,
        borderRadius: 10,
        fontSize: 20,
        padding: 15
    },
    footnote: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 45
    },
    button: {
        height: 55,
        width: 150,
        backgroundColor: '#2962ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    },
    buttonText: {
        fontSize: 20, 
        color: 'white', 
        fontWeight: 'bold'
    },
    errorMessage: {
        fontSize: 20,
        marginTop: 25,
        fontWeight: 'bold',
        color: 'red'
    }
})

export const signOutEmailPassword = async () => {
    await signOut(auth);
    setErrorMessage("");
}