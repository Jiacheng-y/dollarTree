import { StyleSheet, FlatList, Pressable, Text, Dimensions, ImageBackground, View, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../Firebase";
import { query, collection, doc, onSnapshot, deleteDoc, getDoc, getDocs, updateDoc, where } from "firebase/firestore";
import { ExpenseEntry } from '../Components/Entries/ExpenseEntry';
import { monthName } from "../Functions/monthName";
import { IOSStatusBar } from "../Components/IOSStatusBar";

export const ExpensesScreen = ({ navigation }) => {
    const [year, setYear] = useState(new Date().getFullYear()); 
    const [month, setMonth] = useState(new Date().getMonth() + 1); 

    const [list, setList] = useState([]);

    const [expenses, setExpenses] = useState(3); 

    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    amount: "$" + doc.data().amount.toFixed(2),
                    category: doc.data().category,
                    date: doc.data().date.split("/")[0] + " " + monthName(parseInt(doc.data().date.split("/")[1])),
                    description: doc.data().description
                }); 
            })
            items.sort((a, b) => {
                return parseInt(a.date.split("/")[0]) - parseInt(b.date.split("/")[0]);
            });
            setList(items);
        });
        return () => { unsubscribe(); }
    }, [month, year]);

    useEffect(() => {
        const q = query(collection(db, "users", `${thisUserID}`, "budgets", `${year}`, `${month}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            var newExpenses = 0; 
            snapshot.forEach((doc) => {
                newExpenses += doc.data().expenses; 
            })
            setExpenses(newExpenses); 
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
                 const newExpense = doc.data().expenses - deleteAmount;
                 await updateDoc(doc.ref, { expenses: newExpense }); 
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
                            navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear });
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
                    ListEmptyComponent={<Text style={styles.emptyList}>Click the button to start adding expenses!</Text>}
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
// potential color: #1f4e83

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
        fontSize: 30,
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
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        color: "black", 
        fontSize: 17
    }
})

// further enhancements: 
// image background loads slower