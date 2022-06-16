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
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Item } from '../Components/Item';
import { Platform } from 'react-native-web';

export const BudgetScreen = ({ navigation }) => {

    const [budgetList, setBudgetList] = useState([]);

    useEffect(() => {
        const budgetQuery = query(collection(db, "users", `${auth.currentUser.uid}` , "budgets"));

        const subscriber = onSnapshot(budgetQuery, (snapshot) => {
            const budgets = [];

            snapshot.forEach(doc => {
                budgets.push({
                    id: doc.id, 
                    ... doc.data()
                });
            });

            setBudgetList([...budgets]);

            return subscriber;
        });
    }, []);

    const onDeleteHandler = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', `${auth.currentUser.uid}`, 'budgets', id));

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
                <View style={styles.listContainer}>
                    <FlatList
                        data={budgetList}
                        renderItem={({ item, index }) => (
                            <Item 
                                data={item}
                                key={index}
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
