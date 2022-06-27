import { SafeAreaView, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from 'react';
import { db, auth } from "../Firebase";
import { collection, query, onSnapshot, where, runTransaction, getDocs, doc, getDoc, increment, updateDoc } from "firebase/firestore";

export const DisplayExpenses = ({ year, month, category }) => {

    const [expenses, setExpenses] = useState(0);

    useEffect( () => {
        const expenseCollection = collection(db, "users", `${auth.currentUser.uid}` , "Expenses", `${year}`, `${month}`);
        const q = collection(db, "users", `${auth.currentUser.uid}` , "budgets", `${year}`, `${month}`);
        const budgetDocsRef = query(q, where("category", "==", `${category}`));

        const expenseSub = onSnapshot(query(expenseCollection, where("category", "==", `${category}`)), (snapshot) => {
            var sum = 0;
            snapshot.forEach( async (expenseDoc) => {
                //console.log(budgetDocsRef.type);
                sum = sum + expenseDoc.data().amount;
            });

            const getBudgetDocs = async () => {
                const budgetDocs = await getDocs(budgetDocsRef);
                //console.log(budgetDocs.size);
                budgetDocs.forEach( async (document) => {
                    const docref = doc(q, document.id);
                    await updateDoc(docref, {
                        expenses: sum
                    })
                })
            
                setExpenses(sum)    
            }

            getBudgetDocs();

            

            return expenseSub;
        });

        return () => {
            expenseSub();
        }
    }, []);
    
    

    return(
        <Text style={styles.taskText}>Spent: {expenses}</Text>
    );
};

const styles = StyleSheet.create({
    taskText: {
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        marginRight: 10,
    },
});