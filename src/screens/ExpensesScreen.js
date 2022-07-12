import { StyleSheet, FlatList, Pressable, Text, Dimensions, ImageBackground, View, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../Firebase";
import { query, collection, doc, onSnapshot, deleteDoc, getDoc, getDocs, updateDoc, where, setDoc } from "firebase/firestore";
import { ExpenseEntry } from '../Components/Entries/ExpenseEntry';
import { monthName } from "../Functions/monthName";
import { IOSStatusBar } from "../Components/IOSStatusBar";
import { FontAwesome } from '@expo/vector-icons'; 

export const ExpensesScreen = ({ navigation }) => {
    const [year, setYear] = useState(new Date().getFullYear()); 
    const [month, setMonth] = useState(new Date().getMonth() + 1); 

    const [list, setList] = useState([]);

    const [expenses, setExpenses] = useState(0); 

    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                if (doc.id != "Total") {
                    items.push({
                        id: doc.id,
                        amount: doc.data().amount,
                        category: doc.data().category,
                        date: doc.data().date,
                        description: doc.data().description
                    }); 
                }
            })
            items.sort((a, b) => {
                return parseInt(a.date.split("/")[0]) - parseInt(b.date.split("/")[0]);
            });
            setList(items);
        });
        return () => { unsubscribe(); }
    }, [month, year]);

    useEffect(() => {
        const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, "Total");
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setExpenses(doc.data().total);
            } else {
                setExpenses(0);
            }
        });
        return () => { unsubscribe(); }
    }, [month, year]);

    const deleteItem = async (id) => {
        try {
            const toDeleteDoc = await getDoc(doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, `${id}`));
            const deleteAmount = toDeleteDoc.data().amount;
            const deleteCategory = toDeleteDoc.data().category;
            
            const q = query(collection(db, "users", `${thisUserID}`, "budgets", `${year}`, `${month}`), where("category", "==", deleteCategory));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                 const newExpense = parseFloat((doc.data().expenses - deleteAmount).toFixed(2));
                 await updateDoc(doc.ref, { expenses: newExpense }); 
            });

            const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, "Total");
            const docSnap = await getDoc(docRef); 
            await setDoc(docRef, {
                    total: parseFloat((docSnap.data().total - deleteAmount).toFixed(2))
                });
            
            await deleteDoc(toDeleteDoc.ref);
        } catch (error) {
            console.log(error);
        } 
    }
    
    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#0F3091"/>
                : <StatusBar backgroundColor="#0F3091"/>
            }

            <ImageBackground
                source={require("../Images/ExpensesBackground.png")}
                resizeMode="cover"
                style={styles.image}
            >

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={styles.date}>{monthName(month) + " " + year + " Expenses"}</Text>
                    <Pressable
                        style={styles.dateButton}
                        onPress={() => { 
                            navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear, next: 'Expenses' });
                        }}>
                        <Text style={{fontSize: 15, color: "black"}}>Change</Text>
                    </Pressable>
                </View>
                
                <Text style={styles.expenses}>{"$" + expenses.toFixed(2)}</Text>

                <Pressable
                    style={styles.button}
                    onPress={() => { 
                        navigation.navigate('Add Expenses');
                    }}>
                    <Text style={styles.buttonText}>+    Add Expense</Text>
                </Pressable>

                <FlatList
                    data={list}
                    renderItem={({item}) => (
                        <ExpenseEntry
                            data={item}
                            onDelete={deleteItem}>
                        </ExpenseEntry>
                    )} 
                    style={styles.listContainer}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={
                        <View style={{alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                            <Text style={styles.emptyList}>No expenses added</Text>
                            <Text style={styles.emptyList}>Click to start</Text>
                            <FontAwesome 
                                name="hand-pointer-o" 
                                size={45} 
                                color="gray" 
                                style={{marginTop: 20}}
                            />
                        </View>
                    }
                    //onPressIn={()  => controlOpacity(0.1)}
                />
                
            </ImageBackground>
        </View>
    )
}

// const controlOpacity = (intensity) => {
//     const [opacity, setOpacity] = useState(1);
//     if (intensity == null) {
//         return opacity;
//     } else {
//         setOpacity(intensity);
//     }
// }

// background gradient darkest: #0F3091, lightest: #9DC6FF
// potential color: #1f4e83, #284f8f, #3551a3

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: Dimensions.get('window').width - 50,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20, 
        color: "#0F3091", 
        alignSelf: 'center', 
        fontWeight: 'bold'
    },
    image: {
        flex: 1
    },
    date: {
        color: 'white',
        fontSize: 28,
        marginLeft: 25,
    }, 
    dateButton: {
        backgroundColor: 'white',
        marginLeft: 10,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 5,
        opacity: 0.6,
        //opacity: controlOpacity(null)
    },
    listContainer: {
        marginHorizontal: 25,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    }, 
    expenses: {
        color: 'white',
        fontSize: 40,
        marginLeft: 25,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    emptyList: {
        fontStyle: 'italic',
        color: "gray", 
        fontSize: 17,
        marginTop: 10
    }
})

// further enhancements: 
// image background loads slower