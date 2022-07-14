import { Text, StyleSheet, TextInput, Pressable, View, Dimensions, Platform, StatusBar } from "react-native";
import React, { useState } from 'react';
import { db, auth } from "../Firebase";
import { collection, addDoc, updateDoc, query, getDocs, where, setDoc, getDoc, doc} from "firebase/firestore";
import { DatePicker } from "../Components/Pickers/DatePicker";
import { CategoryPicker } from "../Components/Pickers/CategoryPicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { IOSStatusBar } from "../Components/IOSStatusBar";

export const EditExpensesScreen = ({ navigation}) => {
    const [date, setDate] = useState(new Date());
    const formattedDate = `${date.getDate()}` + "/" + `${date.getMonth() + 1}` + "/" + `${date.getFullYear()}`;
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    
    const thisUserID = auth.currentUser.uid;

    const addItem = async (object) => {
        try {
            await addDoc(collection(db, "users", `${thisUserID}`, "Expenses", `${date.getFullYear()}`, `${date.getMonth() + 1}`), {
                date: object.date,
                description: object.description,
                amount: parseFloat(parseFloat(object.amount).toFixed(2)),
                category: object.category
            }); 
    
            const q = query(collection(db, "users", `${thisUserID}`, "budgets", `${date.getFullYear()}`, `${date.getMonth() + 1}`), where("category", "==", object.category));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                await addDoc(collection(db, "users", `${thisUserID}`, "budgets", `${date.getFullYear()}`, `${date.getMonth() + 1}`), {
                    date: `${date.getMonth() + 1}`, 
                    category: object.category,
                    amount: 0, 
                    expenses: parseFloat(parseFloat(object.amount).toFixed(2))
                }); 
            }

            querySnapshot.forEach(async (doc) => {
                 const newExpense = doc.data().expenses + parseFloat(parseFloat(object.amount).toFixed(2));
                 await updateDoc(doc.ref, { expenses: newExpense });  
            });

            const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${date.getFullYear()}`, `${date.getMonth() + 1}`, "Total");
            const docSnap = await getDoc(docRef); 
            if (docSnap.exists()) {
                await setDoc(docRef, {
                    total: parseFloat(parseFloat(object.amount).toFixed(2)) + docSnap.data().total 
                });
            } else {
                await setDoc(docRef, {
                    total: parseFloat(parseFloat(object.amount).toFixed(2))
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{backgroundColor: 'white', flex: 1,}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#0F3091" opacity={0.93} />
                : <StatusBar backgroundColor="#0F3091"/>
            }

            <View style={styles.image}>
                <Text style={styles.header}>Add</Text>
                <Text style={styles.header}>Transaction</Text>
            </View>

            <View style={{flex: 6}}> 
                <View style={[styles.container, {marginTop: 15}]}> 
                    <MaterialCommunityIcons 
                        name="calendar-month-outline" 
                        size={25} 
                        style={styles.dateIcon}
                    />
                    <DatePicker 
                        date={date}
                        setDate={setDate}
                        placeHolder="Date"
                    />
                </View>
                
                <View style={styles.container}> 
                    <EvilIcons 
                        name="pencil" 
                        size={40} 
                        color="black" 
                        style={styles.descriptionIcon} 
                    /> 
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={setDescription}
                        value={description}
                        placeholder='Description'>
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
                        onChangeText={setAmount}
                        value={amount.toString()}>
                    </TextInput>
                </View>

                <CategoryPicker 
                    category={category}
                    setCategory={setCategory}
                    year={date.getFullYear()}
                    month={date.getMonth() + 1}
                />

                <Pressable
                    style={styles.button}
                    onPress={() => { 
                        addItem({date: formattedDate, description: description, amount: amount, category: category});
                        setDescription('');
                        setAmount('');
                        setDate(new Date());
                        navigation.navigate('Expenses');
                    }}>
                    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>+    Add</Text>
                </Pressable>
            </View>
        </View>
    );
}

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
        marginTop: 15,
        opacity: 0.93
    }, 
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginBottom: 15
    },
    dateIcon: {
        marginLeft: 35,
        marginRight: 14
    }, 
    descriptionIcon: {
        marginLeft: 30,
        marginRight: 10
    },
    amountIcon: {
        marginLeft: 35,
        marginRight: 19
    }
})

