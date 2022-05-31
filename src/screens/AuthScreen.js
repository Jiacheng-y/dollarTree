import React, { useState } from 'react';
import { SafeAreaView, TextInput, Pressable, Text, Keyboard, StyleSheet, View } from 'react-native';
import { loginEmailPassword, signupEmailPassword } from '../firebase';

export const AuthScreen = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    return (
        <SafeAreaView style={{alignItems: "center"}}>

            <Text style={styles.header}>
                Enter dollarTree
            </Text>

            <View style={{width: 350, alignSelf: "center"}}>
                <Text style={styles.entryName}>Email</Text>
                <TextInput
                    style={styles.entryBox}
                    placeholder='Email'
                    value={inputEmail}
                    onChangeText={setInputEmail}
                />
                <Text style={styles.entryName}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.entryBox}
                    placeholder='Password'
                    value={inputPassword}
                    onChangeText={setInputPassword}
                />
                <Text style={styles.footnote}>At least 6 characters</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
                <Pressable 
                    style={styles.submit}
                    onPress={() => {
                        loginEmailPassword(inputEmail, inputPassword);
                        Keyboard.dismiss;
                        setInputEmail('');
                        setInputPassword('');
                    }}>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Log In</Text>
                </Pressable>
                <Pressable 
                    style={styles.submit}
                    onPress={() => {
                        signupEmailPassword(inputEmail, inputPassword);
                        Keyboard.dismiss;
                        setInputEmail('');
                        setInputPassword('');
                    }}>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Sign Up</Text>
                </Pressable>
            </View>
            
            {/* <ErrorMessage 
                error= /> */}
        </SafeAreaView>
    )
}

// const ErrorMessage = ({error}) => {
//     var errorMessage;
//     if (error === AuthErrorCodes.INVALID_PASSWORD || error === AuthErrorCodes.INVALID_EMAIL) {
//         errorMessage = "Wrong email or password. Try again."
//     } else {
//         errorMessage = "Error"
//     }

//     return (
//         <Text>{errorMessage}</Text>
//     )
// }

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 45, 
        marginVertical: 30,
        fontFamily: 'San Francisco'
    },
    entryName: {
        fontSize: 20,
        marginVertical: 15
    }, 
    entryBox: {
        backgroundColor: '#eef5ff',
        height: 55,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        fontSize: 20,
        padding: 15
    },
    footnote: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 45
    },
    submit: {
        height: 55,
        width: 150,
        backgroundColor: '#2962ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    }
})
