import { Pressable, Text, StyleSheet, ScrollView, Dimensions, Platform, View, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { ExpensePie } from '../Components/DataVisualisation/ExpensePie';
import { signOutEmailPassword } from './AuthScreen';
import { IOSStatusBar } from '../Components/IOSStatusBar';
import { monthName } from '../Functions/monthName';
import { ThreeMonth } from '../Components/DataVisualisation/ThreeMonth';
import { TopSpending } from '../Components/DataVisualisation/TopSpending';
import { AverageSpent } from '../Components/DataVisualisation/AverageSpent';
import { Coin } from '../Game/Components/Coin';


export const InsightsScreen = ({ navigation }) => {
    const [year, setYear] = useState(new Date().getFullYear()); // the user's selected year to be displayed
    const [month, setMonth] = useState(new Date().getMonth() + 1); // the user's selected month to be displayed

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#0F3091"/>
                : <StatusBar backgroundColor="#0F3091"/>
            }
            <ImageBackground
                    source={require("../Images/ExpensesBackground.png")}
                    resizeMode="cover"
                    style={styles.image}
            >
                <Coin/>
            
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Text style={styles.date}>{monthName(month) + " " + year + " Insights"}</Text>
                    <Pressable
                        style={styles.dateButton}
                        onPress={() => { 
                            navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear, next: 'Insights' });
                        }}>
                        <Text style={{fontSize: 15, color: "black"}}>Change</Text>
                    </Pressable>
                </View>

                <ScrollView>
                    <AverageSpent
                        year={year}
                        month={month}
                    />
                    <TopSpending
                        year={year}
                        month={month}
                    />
                    <ExpensePie
                        year={year}
                        month={month}
                    />
                    <ThreeMonth
                        year={year}
                        month={month}
                    /> 
                </ScrollView>

                {/* <Pressable 
                    style={styles.logOut}
                    onPress={signOutEmailPassword}>
                    <Text style={{color: 'white', fontSize: 20}}>Log Out</Text>
                </Pressable> */}

            </ImageBackground>
        </View>
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
    },
    date: {
        color: 'white',
        fontSize: 28,
        marginLeft: 25,
        marginBottom: 10
    }, 
    dateButton: {
        backgroundColor: 'white',
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