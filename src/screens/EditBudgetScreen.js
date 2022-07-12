import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Dimensions,
    Platform,
    StatusBar,
    Keyboard,
} from 'react-native';
import { db, auth } from '../Firebase';
import { query, collection, onSnapshot, addDoc, runTransaction, doc, updateDoc, where, getDocs } from 'firebase/firestore';
import { IOSStatusBar } from '../Components/IOSStatusBar';
import { MaterialIcons } from '@expo/vector-icons';

export const EditBudgetScreen = ({ route, navigation }) => {

    const [date, setDate] = useState(new Date());
    const year = route.params.year
    const month = route.params.month

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

            const q = collection(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, `${month}`);
            
            const budgetRef = await addDoc(q , {
                date: `${month}`, 
                category: category,
                amount: parseFloat(parseFloat(budget).toFixed(2)),
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

    // const findExpense = async (cat, id) => {
    //     let sum = 0;
    //     const expenseCollection = collection(db, "users", `${auth.currentUser.uid}` , "Expenses", `${date.getFullYear()}`, `${month}`);
    //     const expenseQ = query(expenseCollection, where("category", "==", `${cat}`));
    //     const budgetDocRef = doc(collection(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, `${month}`), id);
    //     const expenseDocs = await getDocs(expenseQ); 

    //     expenseDocs.forEach( (document) => {
    //         console.log(document.data().description)
    //         console.log(document.data().amount)
    //         sum = sum + document.data().amount;
    //     } );

    //     try {
    //         const newExpense = await runTransaction(db, async (transaction) => {
    //             const sfDoc = await transaction.get(budgetDocRef);
    //             if (!sfDoc.exists()) {
    //               throw "Document does not exist!";
    //             }
            
    //             const newExpenses = sfDoc.data().expenses + sum;
    //             console.log("sum")
    //             console.log(sum)
    //             console.log("read")
    //             console.log(sfDoc.data())
    //             transaction.update(budgetDocRef, { expenses: newExpenses });
    //           });
    //     } catch(e) {
    //         console.log(e);
    //     }

    //     return sum;
    // }

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#0F3091" opacity={0.93} />
                : <StatusBar backgroundColor="#0F3091"/>
            }

            <View style={styles.image}>
                <Text style={styles.header}>Add</Text>
                <Text style={styles.header}>Budget</Text>
            </View>

            <View style={styles.container}> 
                <MaterialIcons 
                    style={styles.categoryIcon}
                    name="category" 
                    size={25} 
                    color="black" />
                <TextInput
                    style={styles.inputBox}
                    onChangeText={setCategory}
                    value={category}
                    placeholder={catPlaceHolder}>
                </TextInput>
            </View>
                
            <View style={styles.container}>
                <MaterialIcons 
                    name="attach-money" 
                    size={27} 
                    color="black" 
                    style={styles.amountIcon} 
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder='Amount'
                    keyboardType='numeric'
                    onChangeText={setBudget}
                    value={budget.toString()}>
                </TextInput>
            </View>
        
            <Pressable
                style={styles.button}
                onPress={onSubmitHandler}
                android_ripple={{ color: 'white' }} >
                <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>+    Add</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 120,
        justifyContent: 'center',
        backgroundColor: "#0F3091",
        opacity: 0.93
    },
    header: {
        fontSize: 25,
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    inputBox: {
        height: 50,
        width: 350,
        borderRadius: 10,
        fontSize: 20,
    },
    button: {
        height: 60,
        width: Dimensions.get('window').width - 65,
        backgroundColor: "#0F3091",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.93,
        marginTop: 15
    }, 
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 15
    },
    categoryIcon: {
        marginLeft: 33,
        marginRight: 12
    },
    amountIcon: {
        marginLeft: 35,
        marginRight: 10
    }
})

