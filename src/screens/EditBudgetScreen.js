import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    ToastAndroid,
    Keyboard,
} from 'react-native';
import { db, auth } from '../firebase';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { monthName } from '../functions/monthName';
import MonthDropdown from '../Components/MonthDropdown';

export const EditBudgetScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const currMonth = `${date.getMonth() + 1}`;

    const [budget, setBudget] = useState(0);
    const [Category, setCategory] = useState('');

    const thisUserID = auth.currentUser.uid;

    const onSubmitHandler = async () => {
        if (Category.length === 0) {
            showRes('Budget Category cannot be empty!');
            return;
        } else if (budget === 0) {
            showRes('Amount cannot be 0!');
            return;
        }

        try {

            const q = collection(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, month);
            const budgetRef = await addDoc(q , {
                date: `${monthName(month)}`, 
                category: Category,
                amount: budget
            });

            console.log('completed', budgetRef.id);

            clearForm();

        } catch (error) {
            console.log(error);
        }

        navigation.navigate('Budget');
    };

    const clearForm = () => {
        setBudget(0);
        setCategory('');
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={{ backgroundColor: 'white', padding: 20, flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <MonthDropdown
                        style = {styles.dropdown}
                        setMonth={setMonth}
                    />
                    <TextInput
                        onChangeText={setCategory}
                        value={Category}
                        placeholder={'Enter the budget category'}
                        style={styles.budgetInput}
                    />
                    <TextInput
                        keyboardType='numeric'
                        onChangeText={setBudget}
                        value={budget.toString()}
                        placeholder={'Enter budget amount'}
                        style={styles.budgetInput}
                    />
                    <Pressable
                        onPress={onSubmitHandler}
                        android_ripple={{ color: 'white' }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    dropdown: {
        width: Dimensions.get('window').width*0.7, 
        padding: 10,
        borderRadius: 10,
        margin: 10
    },
    container: {
        flex: 1, 
        alignItems: 'center'
    }, 
    formContainer: {
        position: 'absolute', 
        flexDirection: 'column',
        padding: 10,
        alignItems: 'stretch',
    }, 
    budgetInput: {
        width: Dimensions.get('window').width*0.7, 
        padding: 10,
        borderRadius: 10,
        //borderWidth: 1,
        backgroundColor: '#eef5ff',
        margin: 10
    }, 
    button: {
        width: Dimensions.get('window').width*0.7, 
        padding: 10, 
        borderRadius: 10, 
        margin: 10, 
        backgroundColor: '#2962ff',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    buttonText: {
        color: 'white'
    }
})

