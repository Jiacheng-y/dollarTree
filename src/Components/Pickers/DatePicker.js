import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, StyleSheet, Pressable, Text, View } from "react-native";

export const DatePicker = ({date, setDate}) => {
    const [toDisplay, setToDisplay] = useState(false);

    return (
        <SafeAreaView style={{flexDirection: "row", alignItems: 'center'}}>
            <Pressable
                style={styles.button}
                onPress={() => setToDisplay(true)}
            >
                <Text style={{fontSize: 18, color: "#a9a9a9"}}>Date</Text>
            </Pressable>
            { toDisplay && 
                <DateTimePicker
                    style={styles.picker}
                    value={date}
                    mode="date"
                    onChange={(event, date) => {
                        setDate(date);
                    }}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    picker: {
        width: 150,
    },
    button: {
        height: 50,
        width: 150,
        backgroundColor: '#eef5ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 33,
        marginVertical: 10
    }
})

