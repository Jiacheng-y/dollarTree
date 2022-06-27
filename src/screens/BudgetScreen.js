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
import { db, auth } from '../Firebase';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc, orderBy, runTransaction, where, getDocs, updateDoc } from 'firebase/firestore';
import { Platform } from 'react-native-web';
import { MonthDropdown } from '../Components/Pickers/MonthDropdown';
import { YearDropdown } from '../Components/Pickers/YearDropdown';
import { BudgetEntry } from '../Components/Entries/BudgetEntry';

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
        }
    }, [month, year]);

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
                <YearDropdown
                    style = {styles.dropdown}
                    setYear={setYear}
                />
                <View style={styles.listContainer}>
                    <FlatList
                        data={budgetList}
                        renderItem={({ item, index }) => (
                            <BudgetEntry
                                data={item}
                                year={year}
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
                    onPress={() => navigation.navigate('Add Budget', {year: year, month: month})}
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
    }, 
    list: {
        overflow: 'scroll'
    }, 
    button: {
        bottom: 0,
        position: 'absolute',
        height: 50, 
        width: Dimensions.get('window').width*0.9, 
        backgroundColor: '#1f5ff3', 
        borderRadius: 10, 
        padding : 5,
        alignSelf: 'center',
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})
