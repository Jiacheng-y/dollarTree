import { SafeAreaView, StyleSheet, FlatList, Pressable, Text } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { query, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { ExpenseEntry } from '../Components/ExpenseEntry';
import { MonthPicker } from "../Components/MonthPicker";

export const ExpensesScreen = ({ navigation }) => {
    const [time, setTime] = useState([new Date().getFullYear(), new Date().getMonth() + 1]); 
    const year = time[0];
    const month = time[1];
    const [list, setList] = useState([]);

    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ... doc.data()
                }); 
            })
            items.sort((a, b) => {
                return parseInt(a.date.split("/")[0]) - parseInt(b.date.split("/")[0]);
            });
            setList(items);
        });
        return () => { unsubscribe(); }
    }, [month, year]);

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, `${id}`));
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <MonthPicker
                setTime={setTime}
            />
            <FlatList
                data={list}
                renderItem={({item}) => (
                    <ExpenseEntry
                        data={item}
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