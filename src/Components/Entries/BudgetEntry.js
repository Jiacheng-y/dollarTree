import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const BudgetEntry = (props) => {
    const { data, onDelete, year, month } = props;
    const proportion = (data.expenses / data.amount).toFixed(2); 

    const navigation = useNavigation();

    const DeleteIcon = () => (
        <TouchableOpacity onPress={() => onDelete(data.id)}>
            <MaterialIcons name="delete" size={28} color="#0F3091" />
        </TouchableOpacity>
    );

    return (
        <Pressable 
            style={styles.container}
            onPress={() => {
                navigation.navigate("Change Budget", {
                    data: data,
                    year: year,
                    month: month
                })
            }}
        >
            <View style={styles.info}>
                <Text style={styles.category}>{data.category}</Text>
                <View style={styles.amounts}>
                    {
                        proportion <= 1
                        ? <Text style={[styles.expenses, { color: "#0F3091" }]}>${data.expenses.toFixed(2)}</Text>
                        : <Text style={[styles.expenses, { color: "#e95d5d" }]}>${data.expenses.toFixed(2)}</Text>
                    }
                    <Text style={styles.budget}>/${data.amount.toFixed(2)}</Text>
                </View>
                <DeleteIcon />
            </View>
            <View style={styles.progressBar}>
                {
                    proportion <= 1
                    ? <View style={[styles.spent, {flex: proportion}]}/>
                    : <View style={styles.overspent}/>
                }
            </View>
            {
                proportion <= 1
                ? <Text style={styles.footnote}>You can spend ${(data.amount - data.expenses).toFixed(2)} more</Text>
                : <Text style={styles.footnote}>You have overspent by ${(data.expenses - data.amount).toFixed(2)}</Text>
            }
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    info: {
        flexDirection: 'row',
        flex: 1,
    },
    category: {
        flex: 3,
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: 'center'
    }, 
    expenses: {
        fontWeight: 'bold',
        fontSize: 15
    },
    budget: {
        fontSize: 15,
        color: 'grey'
    }, 
    amounts: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    progressBar: {
        height: 15,
        borderRadius: 8,
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#D3D3D3',
    },
    spent: {
        backgroundColor: '#0F3091',
        borderRadius: 8
    },
    overspent: {
        backgroundColor: '#e95d5d',
        borderRadius: 8,
        flex: 1
    },
    footnote: {
        marginTop: 10,
        fontSize: 13,
        fontStyle: 'italic'
    }
});
