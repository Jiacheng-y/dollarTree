import { SafeAreaView, Text, StyleSheet, TextInput, FlatList, View } from "react-native";
import React, { useState } from 'react';
import { addItem } from "../firebase";
import { db, auth } from "../firebase";
import { query, collection, doc, onSnapshot } from "firebase/firestore";

export const InOutFlowScreen = () => {
    const [list, setList] = useState([]);

    const q = query(collection(db, "users", `${auth.currentUser.uid}`, "Expenses"));
    onSnapshot(q, (snapshot) => {
        let items = [];
        snapshot.forEach((doc) => {
            items.push(doc.data().expense); 
        })
        setList(items);
    })

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <TextInput
                style={styles.inputBox}
                onSubmitEditing={ (text) => { 
                    addItem(text.nativeEvent.text, "Expenses");
                } }
                placeholder='Add expense'>
            </TextInput>
            <FlatList
                data={list}
                renderItem={({item}) => (
                    <View style = {styles.entries}> 
                        <Text style={{fontSize: 20}}>{item}</Text>
                    </View>
                    
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
        marginTop: 20,
        backgroundColor: '#eef5ff',
        height: 55,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        fontSize: 20,
        padding: 15, 
        borderColor: 'black'
    }
})
