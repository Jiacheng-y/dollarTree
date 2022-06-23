import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    FlatList,
    ToastAndroid,
    Keyboard,
} from 'react-native';
import { db, auth } from '../firebase';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc, orderBy, runTransaction, where, getDocs, updateDoc } from 'firebase/firestore';
import { Item } from '../Components/Item';
import { Platform } from 'react-native-web';
import { MonthDropdown } from "../Components/MonthDropdown";
import { YearPicker } from "../Components/YearPicker";

export const BudgetScreen = ({ navigation }) => {

    const [budgetList, setBudgetList] = useState([]);
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());

    useEffect(() => {
        const q = collection(db, "users", `${auth.currentUser.uid}` , "budgets", `${year}`, `${month}`);
        const budgetQuery = query(q, orderBy("amount", "desc"));

        const subscriber = onSnapshot(budgetQuery, (snapshot) => {
            const budgets = [];

            snapshot.forEach(doc => {
                budgets.push({
                    id: doc.id, 
                    ... doc.data()
                });
            });

            setBudgetList([...budgets]);
        });

        return () => {
            subscriber();
            expenseListener();
        }
    }, [month, year]);

    const expenseListener = async () => {
        const expenseCollection = collection(db, "users", `${auth.currentUser.uid}` , "Expenses", `${year}`, `${month}`);
        const q = collection(db, "users", `${auth.currentUser.uid}` , "budgets", `${year}`, `${month}`)

        const expenseSub = onSnapshot(query(expenseCollection), (snapshot) => {
            snapshot.docChanges().forEach( async (change) => {
                if (change.type === "added") {
                    console.log("New expense: ", change.doc.data());
                    
                    //firebase transaction function

                    try {
                        await runTransaction(db, async (transaction) => {
                            console.log(change.doc.category);
                            const budgetDocsRef = query(q, where("category", "==", `${change.doc.category}`));
                            console.log(budgetDocsRef.type);
                            const budgetDocs = await getDocs(budgetDocsRef);
                            console.log(budgetDocs.size);
                            budgetDocs.forEach( async (document) => {
                                const doc = await transaction.get(document);
                                if (!doc.exists()) {
                                    throw "Document does not exist!";
                                }

                                const newExpenses = doc.data().expenses + change.doc.amount;
                                transaction.update(doc, { expenses: newExpenses });
                            })
                        });
                        console.log("Transaction successfully committed!");
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
                        await runTransaction(db, async (transaction) => {
                            const budgetDocsRef = query(q, where("category", "==", `${change.doc.category}`))
                            console.log(change.doc.category);
                            console.log(budgetDocsRef.type);
                            const budgetDocs = await getDocs(budgetDocsRef);
                            console.log(budgetDocs.size);
                            budgetDocs.forEach( async (document) => {
                                console.log("transaction")
                                const doc = await transaction.get(document);
                                
                                if (!doc.exists()) {
                                    throw "Document does not exist!";
                                }

                                const newExpenses = doc.data().expenses - change.doc.amount;
                                transaction.update(doc, { expenses: newExpenses });
                            })
                        });
                        console.log("Transaction successfully committed!");
                    } catch (e) {
                        console.log("Transaction failed: ", e);
                    }
                }
            });

            return expenseSub;
        });
        
    }

    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', `${auth.currentUser.uid}`, "budgets", `${year}`, `${month}`, id));

            console.log("successfully deleted");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
        style={{backgroundColor: 'white', flex: 1}}
        behaviour={Platform.OS === 'ios' ? 'padding' : null}>
            <SafeAreaView style={styles.container}>
                <MonthDropdown
                        style = {styles.dropdown}
                        setMonth={setMonth}
                    />
                <YearPicker
                    style = {styles.dropdown}
                    setYear={setYear}
                />
                <View style={styles.listContainer}>
                    <FlatList
                        data={budgetList}
                        renderItem={({ item, index }) => (
                            <Item 
                                data={item}
                                key={index}
                                navigation={navigation}
                                onDelete={onDeleteHandler}
                            />
                        )}
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <Pressable
                    onPress={() => navigation.navigate('EditBudget')}
                    android_ripple={{ color : 'white' }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add Budget</Text>
                </Pressable>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    }, 
    header: {
        fontSize: 45,  
        textAlign: 'left', 
        margin: 10
    },
    listContainer: {
        flex: 1, 
        padding: 5, 
    }, 
    list: {
        overflow: 'scroll'
    }, 
    button: {
        bottom: 0,
        position: 'absolute',
        height: 50, 
        width: Dimensions.get('window').width*0.9, 
        backgroundColor: '#2962ff', 
        borderRadius: 10, 
        padding : 5,
        margin: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})
