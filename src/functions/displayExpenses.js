import { SafeAreaView, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from 'react';
import { db, auth } from "../Firebase";
import { collection, query, onSnapshot, where, runTransaction, getDocs, doc, getDoc, increment, updateDoc } from "firebase/firestore";

export const displayExpenses = (year, month, category) => {

    const [expenses, setExpenses] = useState(0);

    useEffect( () => {
        const expenseCollection = collection(db, "users", `${auth.currentUser.uid}` , "Expenses", `${year}`, `${month}`);
        const q = collection(db, "users", `${auth.currentUser.uid}` , "budgets", `${year}`, `${month}`);
        const budgetDocsRef = query(q, where("category", "==", `${category}`));

        const expenseQ = async () => {
            const budgetDocs = await getDocs(budgetDocsRef);
            budgetDocs.forEach( async (document) => {
                var sum = 0;
                const docref = doc(q, document.id);
                const expenseSub = onSnapshot(query(expenseCollection, where("category", "==", `${category}`)), (snapshot) => {
                    snapshot.forEach( (expenseDoc) => {
                        sum = sum + expenseDoc.data().amount;
                    });
                    return expenseSub;
                });
    
                await updateDoc(docref, {
                    expenses: sum
                })
                
                setExpenses(sum)
            })
        }
        
        expenseQ();
        
        
    }, [year, month]);

    return expenses;
};

const styles = StyleSheet.create({
    taskText: {
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 10,
    },
});