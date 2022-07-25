import { Pressable, Text, StyleSheet, ScrollView, Dimensions, Platform, View, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { IOSStatusBar } from '../../Components/IOSStatusBar';
import { monthName } from '../../Functions/monthName';
import { Coin } from '../../Game/Components/Coin';
import { ThreeMonthGarden } from '../../Components/DataVisualisation/ThreeMonthGarden';


export default GardenInsightsScreen = ({navigation}) => {
    const [year, setYear] = useState(new Date().getFullYear()); // the user's selected year to be displayed
    const [month, setMonth] = useState(new Date().getMonth() + 1); // the user's selected month to be displayed

    // colour scheme: #19635b, #33765d, #4d8680, #669792, #80a9a4, #99bab6, #b3bc8, #ccdcdb, #e6eeed

    return (
        <View style={{backgroundColor: '#e8f4ea', flex: 1}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#e8f4ea"/>
                : <StatusBar backgroundColor="#e8f4ea"/>
            }
            <Coin/>
        
            <View style={{flexDirection: 'row', marginTop: 15}}>
                <Text style={styles.date}>{monthName(month) + " " + year + " Garden Insights"}</Text>
                <Pressable
                    style={styles.dateButton}
                    onPress={() => { 
                        navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear, next: 'Garden Insights' });
                    }}>
                    <Text style={{fontSize: 15, color: "black"}}>Change</Text>
                </Pressable>
            </View>

            <ScrollView>
                <ThreeMonthGarden
                    year={year}
                    month={month}
                /> 
            </ScrollView>
        </View>
    );
}

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
    },
    date: {
        color: '#white',
        fontSize: 25,
        marginLeft: 25,
        marginBottom: 10
    }, 
    dateButton: {
        backgroundColor: '#33765d',
        marginLeft: 10,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 5,
        opacity: 0.6,
        marginBottom: 10
        //opacity: controlOpacity(null)
    },
    image: {
        flex: 1
    },
});