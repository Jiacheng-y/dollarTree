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
import { db, auth } from '../Firebase';
import { query, collection, onSnapshot, addDoc, runTransaction, doc, updateDoc, where, getDocs } from 'firebase/firestore';
import { monthName } from '../Functions/monthName';
import { MonthDropdown } from '../Components/Pickers/MonthDropdown';

export const EditBudgetScreen = ({ navigation }) => {

    const [date, setDate] = useState(new Date());
    const [currMonth, setMonth] = useState(date.getMonth()+1);

    const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState("");

    const thisUserID = auth.currentUser.uid;

    var catPlaceHolder = 'Category';

    const onSubmitHandler = async () => {

        if (category.length === 0) {
            showRes('Budget category cannot be empty!');
            return;
        } else if (budget === 0) {
            showRes('Amount cannot be 0!');
            return;
        }

        try {

            const q = collection(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, `${currMonth}`);
            
            const budgetRef = await addDoc(q , {
                date: `${currMonth}`, 
                category: category,
                amount: parseInt(budget), 
                expenses: 0,
            })

            //findExpense(category, budgetRef.id);

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

    const findExpense = async (cat, id) => {
        let sum = 0;
        const expenseCollection = collection(db, "users", `${auth.currentUser.uid}` , "Expenses", `${date.getFullYear()}`, `${currMonth}`);
        const expenseQ = query(expenseCollection, where("category", "==", `${cat}`));
        const budgetDocRef = doc(collection(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, `${currMonth}`), id);
        const expenseDocs = await getDocs(expenseQ); 

        expenseDocs.forEach( (document) => {
            console.log(document.data().description)
            console.log(document.data().amount)
            sum = sum + document.data().amount;
        } );

        try {
            const newExpense = await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(budgetDocRef);
                if (!sfDoc.exists()) {
                  throw "Document does not exist!";
                }
            
                const newExpenses = sfDoc.data().expenses + sum;
                console.log("sum")
                console.log(sum)
                console.log("read")
                console.log(sfDoc.data())
                transaction.update(budgetDocRef, { expenses: newExpenses });
              });
        } catch(e) {
            console.log(e);
        }

        return sum;
    }

    return (
        <KeyboardAvoidingView
            style={{ backgroundColor: 'white', padding: 20, flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.year}>{date.getFullYear()}</Text>
                    <MonthDropdown
                        style = {styles.dropdown}
                        setMonth={setMonth}
                    />
                    <TextInput
                        onChangeText={setCategory}
                        value={category}
                        placeholder={catPlaceHolder}
                        style={styles.budgetInput}
                    />
                    <TextInput
                        keyboardType='numeric'
                        onChangeText={setBudget}
                        value={budget.toString()}
                        placeholder={'Amount'}
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
    year: {
        fontSize: 18,
        alignSelf: 'center'
    },
    dropdown: {
        width: Dimensions.get('window').width*0.7, 
        padding: 10,
        borderRadius: 10,
        margin: 10
    },
    container: {
        flex: 1, 
        alignItems: 'center',
    }, 
    formContainer: {
        position: 'absolute', 
        flexDirection: 'column',
        padding: 10,
        alignItems: 'stretch',
    }, 
    budgetInput: {
        height: 50,
        width: 350, 
        padding: 10,
        borderRadius: 10,
        //borderWidth: 1,
        backgroundColor: '#eef5ff',
        margin: 10,
        fontSize: 18
    }, 
    button: {
        width: Dimensions.get('window').width*0.7, 
        padding: 10, 
        borderRadius: 10, 
        margin: 10, 
        backgroundColor: '#2962ff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 350,
    }, 
    buttonText: {
        color: 'white',
        fontSize: 18
    }
})

