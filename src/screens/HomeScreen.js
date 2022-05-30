import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, Pressable, Text, Keyboard, StyleSheet, View } from 'react-native';
import { logout } from "../firebase";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{marginTop: 135, alignItems: "center"}}>
            <Text style={StyleSheet.header}>
                Welcome to dollarTree! 
            </Text>

            <View style={{flexDirection: 'column', }}>
                <Pressable 
                    style={styles.button}
                    onPress={() => {navigation.navigate('InOutFlow')}}
                    android_ripple={{color:'#FFF'}}>
                        <Text style={styles.options}>
                            My Expenses
                        </Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => {navigation.navigate('Budget')}}
                    android_ripple={{color:'#FFF'}}>
                        <Text style={styles.options}>
                            My Budgets
                        </Text>
                </Pressable>
            </View>

            <Pressable 
                style={styles.logOut}
                onPress={logout}>
                <Text style={{color: 'white'}}>Log Out</Text>
            </Pressable>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 45, 
        marginVertical: 30, 
        fontFamily: 'San Francisco'
    }, 
    button: {
        height: 50, 
        width: 150, 
        backgroundColor: '#2962ff', 
        borderRadius: 10, 
        padding : 5,
        margin: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    options: {
        textAlign: 'center', 
        fontSize: 10, 
        color: 'white', 
    },
    logOut: {
        height: 55,
        width: 150,
        backgroundColor: '#2962ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 650,
        marginLeft: 5
    }
});
