import { View, StyleSheet, Dimensions, Text, Pressable, StatusBar, Platform } from 'react-native';
import React, { useState } from 'react';
import { IOSStatusBar } from '../Components/IOSStatusBar';
import { MonthDropdown } from "../Components/Pickers/MonthDropdown";
import { YearDropdown } from "../Components/Pickers/YearDropdown";

export const SetDateScreen = ({ navigation, route }) => {
    const { setMonth, setYear, next } = route.params;
    const [monthPickerValue, setMonthPickerValue] = useState(new Date().getMonth() + 1);
    const [yearPickerValue, setYearPickerValue] = useState(new Date().getFullYear());

    return (
        <View style={{flex: 1}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#eef5ff" />
                : <StatusBar backgroundColor="#eef5ff"/>
            }
            <View style={styles.container}> 
                {/* <Text style={styles.header}>Select Month and Year</Text> */}
                <MonthDropdown
                    setValue={setMonthPickerValue}
                    value={monthPickerValue}
                />
                <YearDropdown
                    setValue={setYearPickerValue}
                    value={yearPickerValue}
                />
                <Pressable
                    style={styles.doneButton}
                    onPress={() => { 
                        navigation.navigate(next);
                        setMonth(monthPickerValue);
                        setYear(yearPickerValue);
                    }}
                >
                    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>Done</Text>
                </Pressable>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eef5ff',
        justifyContent: 'center',
        flex: 1
    }, 
    doneButton: {
        height: 50,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "#0F3091",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.93
    },
    // header: {
    //     alignSelf: 'center',
    //     fontSize: 20,
    //     marginBottom: 10,
    //     fontWeight: 'bold',
    //     color: "#0F3091"
    // }
})