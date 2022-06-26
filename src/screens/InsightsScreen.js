import { SafeAreaView, Pressable, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { CategoryBar } from '../Components/DataVisualisation/CategoryBar';
import { ExpensePie } from '../Components/DataVisualisation/ExpensePie';
import { signOutEmailPassword } from './AuthScreen';
import { MonthDropdown } from '../Components/Pickers/MonthDropdown';
import { YearDropdown } from '../Components/Pickers/YearDropdown';

export const InsightsScreen = ({ navigation }) => {
    const [year, setYear] = useState(new Date().getFullYear()); // the user's selected year to be displayed
    const [month, setMonth] = useState(new Date().getMonth() + 1); // the user's selected month to be displayed

    return (
        <ScrollView>
            <SafeAreaView style={{backgroundColor: 'white'}}>
                <MonthDropdown 
                    setMonth={setMonth}
                />
                <YearDropdown
                    setYear={setYear}
                />

                
                <ExpensePie
                    year={year}
                    month={month}
                />
                <CategoryBar
                    year={year}
                    month={month}
                />
                
                
                <Pressable 
                    style={styles.logOut}
                    onPress={signOutEmailPassword}>
                    <Text style={{color: 'white', fontSize: 20}}>Log Out</Text>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logOut: {
        height: 50,
        width: Dimensions.get('window').width*0.9,
        padding: 5,
        backgroundColor: '#1f5ff3',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
});