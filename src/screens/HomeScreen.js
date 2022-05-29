import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, Pressable, Text, Keyboard, StyleSheet, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{marginTop: 135, alignItems: "center"}}>
            <Text style={StyleSheet.header}>
                Welcome to dollarTree! 
            </Text>

            <View style={{flexDirection: 'row'}}>
                <Pressable 
                    style={styles.button}
                    onPress={() => {navigation.navigate('ExpenseScreen')}}
                    android_ripple={{color:'#FFF'}}>
                        <Text style={styles.options}>
                            My Expenses
                        </Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => {navigation.navigate('BudgetScreen')}}
                    android_ripple={{color:'#FFF'}}>
                        <Text style={styles.options}>
                            My Budgets
                        </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )

    const styles = StyleSheet.create({
        header: {
            textAlign: 'center',
            fontSize: 45, 
            marginVertical: 30, 
            fontFamily: 'San Francisco'
        }, 
        button: {
            height: 55, 
            weight: 150, 
            backgroundColor: '#2962ff', 
            borderRadius: 10, 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginHorizontal: 15
        },
        options: {
            textAlign: 'center', 
            fontSize: 20, 
            color: 'white', 
            fontWeight: 'bold'
        }
    })
}