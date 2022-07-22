import React, { useState, useRef } from 'react';
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
    Animated,
} from 'react-native';
import { db, auth } from '../Firebase';
import { query, collection, onSnapshot, addDoc, runTransaction, doc, updateDoc, where, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { IOSStatusBar } from '../Components/IOSStatusBar';
import { MaterialIcons } from '@expo/vector-icons';
import { PresetCategoryPicker } from '../Components/Pickers/PresetCategoryPicker';
import { Coin } from '../Game/Components/Coin';

export const EditBudgetScreen = ({ route, navigation }) => {

    const [date, setDate] = useState(new Date());
    const year = route.params.year
    const month = route.params.month

    const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState("");

    const thisUserID = auth.currentUser.uid;

    var catPlaceHolder = 'Category';

    // For coin animation
    const [show, setShow] = useState(false);
    const coinImage = require("../Images/Coin.png");
    const moveAnim = useRef(new Animated.ValueXY({x: 210, y: -50})).current; 
    const X = 25;
    const Y = -450; 

    const move = () => {
        Animated.timing(moveAnim, {
            toValue: {x: X, y: Y},
            timing: 500,
            useNativeDriver: true
        }).start(async () => {
            const coinsRef = doc(db, "users", `${thisUserID}`, "Coins", "Total");
            const coinsSnap = await getDoc(coinsRef); 
            const newAmount = coinsSnap.data().total + 5
            await setDoc(coinsRef, {
                total: newAmount
            });
            setTimeout(() => {
                navigation.navigate('Budget');
            }, 375);
            setShow(false);
        });
    }
    
    const animatedStyle = {
        transform: moveAnim.getTranslateTransform()
    }
    // For coin animation

    const onSubmitHandler = async () => {

        if (category.length === 0) {
            showRes('Budget category cannot be empty!');
            return;
        } else if (budget === 0) {
            showRes('Amount cannot be 0!');
            return;
        }

        try {
            setShow(true);
            move();

            const budgetCollection = collection(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, `${month}`);
            
            const expenseCollection = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`), where("category", "==", category));
            const querySnapshot = await getDocs(expenseCollection);
            var newExpense = 0;
            querySnapshot.forEach((doc) => {
                newExpense += doc.data().amount;
            });

            const budgetRef = await addDoc(budgetCollection, {
                date: `${month}`, 
                category: category,
                amount: parseFloat(parseFloat(budget).toFixed(2)),
                expenses: newExpense,
            })

            const bonusDoc = doc(db, "users", `${thisUserID}` , "budgets", `${date.getFullYear()}`, `${month}`, "Bonus");
            await setDoc(bonusDoc, {
                claimed: false
            });

            //findExpense(category, budgetRef.id);

            // console.log('completed', budgetRef.id);

            clearForm();
        } catch (error) {
            console.log(error);
        }
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
        <View style={[styles.animatedContainer]}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#0F3091" opacity={0.93} />
                : <StatusBar backgroundColor="#0F3091"/>
            }

            <View style={styles.image}>
                <Coin 
                    
                />
                <Text style={styles.header}>Add</Text>
                <Text style={styles.header}>Budget</Text>
            </View>

            <Text style={styles.info}>select a preset category or input your own</Text>

            <PresetCategoryPicker 
                category={category}
                setCategory={setCategory}
            />

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
            {
                show 
                ? <Animated.Image
                    source={coinImage}
                    style={[styles.coinImage, animatedStyle]}
                    />
                : <View />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    animatedContainer: {
        backgroundColor: 'white', 
        flex: 1
    },
    image: {
        height: 120,
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
    }, 
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginBottom: 15
    },
    categoryIcon: {
        marginLeft: 33,
        marginRight: 12
    },
    amountIcon: {
        marginLeft: 35,
        marginRight: 10
    },
    info: {
        marginLeft: 35,
        fontSize: 15,
        color: 'gray',
        fontStyle: 'italic',
        marginTop: 15
    },
    coinImage: {
        height: 30,
        width: 30
    }
})

