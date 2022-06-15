import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, StyleSheet, Pressable, Text, View } from "react-native";

export const DatePicker = ({date, setDate}) => {
    const [toDisplay, setToDisplay] = useState(false);

    return (
        <SafeAreaView>
            <Pressable
                style={styles.button}
                onPress={() => setToDisplay(true)}
            >
                <Text style={{fontSize: 20}}>Date</Text>
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
        alignSelf: "center", 
        width: 150
    },
    button: {
        height: 55,
        width: 150,
        backgroundColor: '#eef5ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 33,
        marginVertical: 10
    }
})

