import React, { useState, useEffect } from 'react';
import { TextInput, Pressable, Text, Keyboard, StyleSheet, View } from 'react-native';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; 
import { auth, db } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

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
        <View style={{flex: 1}}>
            <View style = {styles.headerContainer}> 
                <Foundation 
                    name="trees" 
                    size={120} 
                    color="#eef5ff" 
                    style={{alignSelf: "center"}}
                />
                <Text style={styles.header}>
                    dollarTree
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.entryName}>Email</Text>

                <View style={styles.entryContainer}>
                    <MaterialIcons 
                        name="email"
                        size={30}
                        color="grey"
                        style={{marginHorizontal: 15}}
                    />
                    <TextInput
                        style={styles.entryBox}
                        placeholder='Enter Email'
                        value={inputEmail}
                        onChangeText={setInputEmail}
                    />
                </View>

                <Text style={styles.entryName}>Password</Text>

                <View style={styles.entryContainer}>
                    <MaterialIcons 
                        name="lock"
                        size={30}
                        color="grey"
                        style={{marginHorizontal: 15}}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.entryBox}
                        placeholder='Enter Password'
                        value={inputPassword}
                        onChangeText={setInputPassword}
                    />
                </View>

                <Text style={styles.footnote}>At least 6 characters</Text>
             </View>

             <View style={styles.buttonContainer}>
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
        </View>
    )
}

// possible colour schemes: 
// #284f8f
// #1b3d81
// #0a64bc

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#1f5ff3',
        height: 200,
        justifyContent: 'center',
        flex: 1.75,
    },
    header: {
        fontSize: 35, 
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#eef5ff'
    },
    infoContainer: {
        width: 350,
        alignSelf: 'center',
        flex: 2, 
        justifyContent: 'center'
    },
    entryName: {
        fontSize: 20,
        marginVertical: 15
    }, 
    entryContainer: {
        width: 350,
        backgroundColor: '#eef5ff',
        flexDirection: 'row',
        borderRadius: 10,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    entryBox: {
        backgroundColor: '#eef5ff',
        height: 55,
        width: 280,
        fontSize: 20,
    },
    footnote: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 45
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1.5
    },
    button: {
        height: 55,
        width: 150,
        backgroundColor: '#1f5ff3',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    },
    buttonText: {
        fontSize: 20, 
        color: '#eef5ff', 
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