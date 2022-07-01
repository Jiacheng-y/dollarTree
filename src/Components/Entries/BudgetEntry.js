import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const BudgetEntry = (props) => {
    const { data, year, onDelete } = props;

    const DeleteIcon = () => (
        <TouchableOpacity onPress={() => onDelete(data.id)}>
            <MaterialIcons name="delete" size={28} color="#407BFF" />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, styles.containerShadow]}>
            <Text style={styles.taskText}>{data.category}</Text>
            <Text style={styles.taskText}>Budget: {data.amount}</Text>
            <Text style={styles.taskText}>Spent: {data.expenses}</Text>
            <DeleteIcon />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daebfa',
        flexDirection: 'row',
        marginHorizontal: 14,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        padding: 5,
    },
    containerShadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    taskText: {
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 10,
    },
});
