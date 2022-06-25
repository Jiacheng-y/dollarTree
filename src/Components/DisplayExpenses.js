import { SafeAreaView, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase";
import { collection, query, onSnapshot, where, runTransaction, getDocs, doc, getDoc, increment, updateDoc } from "firebase/firestore";

export const DisplayExpenses = ({ year, month, category }) => {

    const [expenses, setExpenses] = useState(0);

    useEffect( () => {
        const expenseCollection = collection(db, "users", `${auth.currentUser.uid}` , "Expenses", `${year}`, `${month}`);
        const q = collection(db, "users", `${auth.currentUser.uid}` , "budgets", `${year}`, `${month}`);
        var budgetRef;   

        const expenseSub = onSnapshot(query(expenseCollection, where("category", "==", `${category}`)), (snapshot) => {
            snapshot.docChanges().forEach( async (change) => {
                if (change.type === "added") {
                    console.log("New expense: ", change.doc.data());
                    
                    //firebase transaction function

                    try {
                        const budgetDocsRef = query(q, where("category", "==", `${category}`));
                        //console.log(budgetDocsRef.type);
                        const budgetDocs = await getDocs(budgetDocsRef);
                        //console.log(budgetDocs.size);
                        budgetDocs.forEach( async (document) => {
                            const docref = doc(q, document.id);
                            await updateDoc(docref, {
                                expenses: increment(change.doc.data().amount)
                            })
                            const budgetEx = document.data().expenses + change.doc.data().amount
                            setExpenses(budgetEx)
                        })

                        //update fields using transations function --> erratic firebase updates

                        // await runTransaction(db, async (transaction) => {
                        //     //console.log(change.doc.data().category);
                        //     const budgetDocsRef = query(q, where("category", "==", `${category}`));
                        //     //console.log(budgetDocsRef.type);
                        //     const budgetDocs = await getDocs(budgetDocsRef);
                        //     //console.log(budgetDocs.size);
                        //     budgetDocs.forEach( async (document) => {
                        //         //console.log(document.id)
                        //         const docref = doc(q, document.id);
                        //         budgetRef = docref;
                        //         const budgetDoc = await transaction.get(docref);
                        //         //console.log(budgetDoc.data())
                        //         if (!budgetDoc.exists()) {
                        //             throw "Document does not exist!";
                        //         }
                        //         console.log("prev expense")
                        //         console.log(budgetDoc.data().expenses)
                        //         const newExpenses = budgetDoc.data().expenses + change.doc.data().amount;
                        //         transaction.update(docref, {expenses: newExpenses});

                        //         setExpenses(newExpenses);
                        //     });
                        // });
                        // console.log("Transaction successfully committed!");
                    } catch (e) {
                        console.log("Transaction failed: ", e);
                    }
                    
                }
                if (change.type === "modified") {
                    //currently not allowed
                    console.log("Modified exepense: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed expense: ", change.doc.data());

                    //firebase transaction function
                    try {

                        const budgetDocsRef = query(q, where("category", "==", `${category}`));
                        //console.log(budgetDocsRef.type);
                        const budgetDocs = await getDocs(budgetDocsRef);
                        //console.log(budgetDocs.size);
                        budgetDocs.forEach( async (document) => {
                            const docref = doc(q, document.id);
                            await updateDoc(docref, {
                                expenses: increment(- change.doc.data().amount)
                            })
                            const budgetEx = document.data().expenses - change.doc.data().amount
                            setExpenses(budgetEx)
                        })

                        //update fields using transations function --> erratic firebase updates

                        // await runTransaction(db, async (transaction) => {
                        //     //console.log(change.doc.data().category);
                        //     const budgetDocsRef = query(q, where("category", "==", `${category}`));
                        //     //console.log(budgetDocsRef.type);
                        //     const budgetDocs = await getDocs(budgetDocsRef);
                        //     //console.log(budgetDocs.size);
                        //     budgetDocs.forEach( async (document) => {
                        //         //console.log(document.id)
                        //         const docref = doc(q, document.id);
                        //         budgetRef = docref;
                        //         const budgetDoc = await transaction.get(docref);
                        //         //console.log(budgetDoc.data())
                        //         if (!budgetDoc.exists()) {
                        //             throw "Document does not exist!";
                        //         }
                        //         console.log("prev expense")
                        //         console.log(budgetDoc.data().expenses)
                        //         const newExpenses = budgetDoc.data().expenses - change.doc.data().amount;
                        //         transaction.update(docref, {expenses: newExpenses});
                        //         setExpenses(newExpenses);
                        //     });
                            
                        // });
                        // console.log("Transaction successfully committed!");
                    } catch (e) {
                        console.log("Transaction failed: ", e);
                    }
                }
            });

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