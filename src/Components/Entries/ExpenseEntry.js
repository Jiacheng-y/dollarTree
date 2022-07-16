import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { monthName } from '../../Functions/monthName';

export const ExpenseEntry = ({data, onDelete}) => {
    const DeleteIcon = () => (
        <TouchableOpacity onPress={() => onDelete(data.id)}>
            <MaterialIcons name="delete" size={28} color="#0F3091" />
        </TouchableOpacity>
    );

    const navigation = useNavigation();

    return (
        <Pressable 
            style={styles.container}
            onPress={() => {
                navigation.navigate("Change Expenses", {
                    data: data
                })
            }}
        >
            <View style={{flex: 3}}>
                <Text style={styles.description}>{data.description}</Text>
                <Text style={styles.category}>{data.category}</Text>
            </View>
            
            <View style={{flex: 1}}>
                <Text style={styles.amount}>{"$" + data.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{data.date.split("/")[0] + " " + monthName(parseInt(data.date.split("/")[1]))}</Text>
            </View>
            
            <DeleteIcon /> 
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    category: {
        fontStyle: 'italic',
        fontSize: 15,
    },
    description: {
        fontWeight: 'bold',
        fontSize: 17
    }, 
    amount: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 15
    },
});