import { SafeAreaView, Pressable, Text, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { MonthPicker } from '../Components/MonthPicker'; 
import { CategoryExpenses } from '../Components/DataVisualisation/CategoryExpenses';
import { signOutEmailPassword } from './AuthScreen';

export const InsightsScreen = ({ navigation }) => {
    const [time, setTime] = useState([new Date().getFullYear(), new Date().getMonth() + 1]);
    const year = time[0]; // the user's selected year to be displayed
    const month = time[1]; // the user's selected month to be displayed

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1, padding: 80, alignItems: "center"}}>
           <MonthPicker
                setTime={setTime}
            /> 
            <CategoryExpenses 
                year={year}
                month={month}
            />
            <Pressable 
                style={styles.logOut}
                onPress={signOutEmailPassword}>
                <Text style={{color: 'white'}}>Log Out</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logOut: {
        height: 55,
        width: 150,
        backgroundColor: '#2962ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        marginLeft: 5
    }
});