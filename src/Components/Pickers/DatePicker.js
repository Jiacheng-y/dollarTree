import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, StyleSheet, Pressable, Text } from "react-native";

export const DatePicker = ({date, setDate, placeHolder}) => {
    const [toDisplay, setToDisplay] = useState(false);

    return (
        <SafeAreaView style={{flexDirection: "row", alignItems: 'center'}}>
            <Pressable
                style={styles.button}
                onPress={() => setToDisplay(true)}
            >
                <Text style={{fontSize: 20, color: "#a9a9a9"}}>{placeHolder}</Text>
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
        marginLeft: 20
    },
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: 10,
        marginLeft: 5,
    }
})

