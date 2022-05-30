import { SafeAreaView, Text, StyleSheet, TextInput, FlatList, View, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';
import { addItem } from "../firebase";
import { db, auth } from "../firebase";
import { query, collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { Item } from "../Components/Item";

export const InOutFlowScreen = () => {
    const [list, setList] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const q = query(collection(db, "users", `${auth.currentUser.uid}`, "Expenses"));
        const subscriber = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ... doc.data()
                }); 
            })
            setList(items);
        })
        return subscriber;
    }, []);

    const deleteItem = async (id) => {
        await deleteDoc(doc(db, "users", `${auth.currentUser.uid}`, "Expenses", `${id}`));
    }

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <TextInput
                style={styles.inputBox}
                onChangeText={setDescription}
                value={description}
                placeholder='Description'>
            </TextInput>
            <TextInput
                style={styles.inputBox}
                placeholder='Amount'
                onChangeText={setAmount}
                value={amount}>
            </TextInput>
            <Pressable
                style={styles.button}
                onPress={() => { 
                    addItem({category: description, amount: amount}, "Expenses");
                    setDescription('');
                    setAmount('');
                }}>
                <Text style={{fontSize: 20}}>Add</Text>
            </Pressable>
            <FlatList
                data={list}
                renderItem={({item, index}) => (
                    <Item
                        data={item}
                        key={index}
                        onDelete={deleteItem}>
                    </Item>
                )} 
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    entries: {
        backgroundColor: 'grey',
        height: 10,
        width: 350,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        marginTop: 10,
        backgroundColor: '#eef5ff',
        height: 55,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        fontSize: 20,
        padding: 15, 
        borderColor: 'black'
    },
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
