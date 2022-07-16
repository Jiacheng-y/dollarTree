import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const ExpenseEntry = ({data, onDelete}) => {
    const DeleteIcon = () => (
        <TouchableOpacity onPress={() => onDelete(data.id)}>
            <MaterialIcons name="delete" size={28} color="#0F3091" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <Text style={styles.description}>{data.description}</Text>
                <Text style={styles.category}>{data.category}</Text>
            </View>
            
            <View style={{flex: 1}}>
                <Text style={styles.amount}>{data.amount}</Text>
                <Text style={styles.date}>{data.date}</Text>
            </View>
            
            <DeleteIcon /> 
        </View>
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