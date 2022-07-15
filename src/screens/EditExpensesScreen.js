import { SafeAreaView, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from 'react';
import { db, auth } from "../Firebase";
import { collection, addDoc, updateDoc, query, getDocs, where, setDoc, doc } from "firebase/firestore";
import { DatePicker } from "../Components/Pickers/DatePicker";
import { CategoryPicker } from "../Components/Pickers/CategoryPicker";

export const EditExpensesScreen = ({ navigation}) => {
    const [date, setDate] = useState(new Date());
    const formattedDate = `${date.getDate()}` + "/" + `${date.getMonth() + 1}` + "/" + `${date.getFullYear()}`;
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    
    const thisUserID = auth.currentUser.uid;

    const addItem = async (object) => {
        try {
            await addDoc(collection(db, "users", `${thisUserID}`, "Expenses", `${date.getFullYear()}`, `${date.getMonth() + 1}`), {
                date: object.date,
                description: object.description,
                amount: parseInt(object.amount),
                category: object.category
            }); 
    
            const q = query(collection(db, "users", `${thisUserID}`, "budgets", `${date.getFullYear()}`, `${date.getMonth() + 1}`), where("category", "==", object.category));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                await addDoc(collection(db, "users", `${thisUserID}`, "budgets", `${date.getFullYear()}`, `${date.getMonth() + 1}`), {
                    date: `${date.getMonth() + 1}`, 
                    category: object.category,
                    amount: 0, 
                    expenses: parseInt(object.amount)
                }); 
            }

            querySnapshot.forEach(async (doc) => {
                 const newExpense = parseInt(doc.data().expenses) + parseInt(object.amount);
                 await updateDoc(doc.ref, { expenses: newExpense });
                 
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <DatePicker 
                date={date}
                setDate={setDate}
            />
            <TextInput
                style={styles.inputBox}
                onChangeText={setDescription}
                value={description}
                placeholder='Description'>
            </TextInput>
            <TextInput
                style={styles.inputBox}
                placeholder='Amount'
                keyboardType='numeric'
                onChangeText={setAmount}
                value={amount.toString()}>
            </TextInput>
            <CategoryPicker 
                category={category}
                setCategory={setCategory}
                year={date.getFullYear()}
                month={date.getMonth() + 1}
            />
            <Pressable
                style={styles.button}
                onPress={() => { 
                    addItem({date: formattedDate, description: description, amount: amount, category: category});
                    setDescription('');
                    setAmount('');
                    setDate(new Date());
                    navigation.navigate('Expenses');
                }}>
                <Text style={{fontSize: 18, color: "white"}}>Add</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        margin: 10,
        backgroundColor: '#eef5ff',
        height: 50,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        fontSize: 18,
        padding: 15, 
        borderColor: 'black'
    },
    button: {
        height: 50,
        width: 350,
        backgroundColor: '#1f5ff3',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    }
})

