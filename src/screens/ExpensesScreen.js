import { SafeAreaView, StyleSheet, FlatList, Pressable, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { query, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { ExpenseEntry } from '../Components/ExpenseEntry';

export const ExpensesScreen = ({ navigation }) => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [list, setList] = useState([]);

    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`));
        onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ... doc.data()
                }); 
            })
            setList(items);
        })
    }, []);

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, `${id}`));
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <FlatList
             data={list}
                renderItem={({item, index}) => (
                    <ExpenseEntry
                        data={item}
                        key={index}
                        onDelete={deleteItem}>
                    </ExpenseEntry>
                )} 
            />
            <Pressable
                style={styles.button}
                onPress={() => { 
                    navigation.navigate('Add Expenses');
                }}>
                <Text style={{fontSize: 20}}>Add Expense</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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