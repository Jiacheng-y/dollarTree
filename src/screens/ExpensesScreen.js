import { SafeAreaView, StyleSheet, FlatList, Pressable, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../Firebase";
import { query, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { ExpenseEntry } from '../Components/Entries/ExpenseEntry';
import { MonthDropdown } from "../Components/Pickers/MonthDropdown";
import { YearDropdown } from "../Components/Pickers/YearDropdown";

export const ExpensesScreen = ({ navigation }) => {
    const [year, setYear] = useState(new Date().getFullYear()); 
    const [month, setMonth] = useState(new Date().getMonth() + 1); 

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
            <MonthDropdown
                setMonth={setMonth}
            />
            <YearDropdown
                setYear={setYear}
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
                <Text style={{fontSize: 20, color: "#eef5ff"}}>Add Expense</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: '#1f5ff3',
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
})