import { Text, StyleSheet, TextInput, Pressable, View, Dimensions, Platform, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../Firebase";
import { collection, updateDoc, query, getDocs, where, setDoc, getDoc, doc} from "firebase/firestore";
import { DatePicker } from "../Components/Pickers/DatePicker";
import { CategoryPicker } from "../Components/Pickers/CategoryPicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { IOSStatusBar } from "../Components/IOSStatusBar";

export const ChangeExpensesScreen = ({ navigation, route }) => {
    const { data } = route.params;
    const [date, setDate] = useState(new Date());
    const formattedDate = `${date.getDate()}` + "/" + `${date.getMonth() + 1}` + "/" + `${date.getFullYear()}`;
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    
    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        const arr = data.date.split("/");
        console.log(data.date)
        console.log(arr);
        const unformattedOgDate = new Date(arr[2], arr[1] - 1, arr[0]);
        setDate(unformattedOgDate);
        setDescription(data.description);
        setAmount(data.amount.toFixed(2));
        setCategory(data.category);
    }, [data]);

    const changeItem = async (object) => {
        try {
            await updateDoc(doc(db, "users", `${thisUserID}`, "Expenses", `${date.getFullYear()}`, `${date.getMonth() + 1}`, `${data.id}`), {
                date: object.date,
                description: object.description,
                amount: parseFloat(parseFloat(object.amount).toFixed(2)),
                category: object.category
            }); 
    
            const q = query(collection(db, "users", `${thisUserID}`, "budgets", `${date.getFullYear()}`, `${date.getMonth() + 1}`), where("category", "==", object.category));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
                // if category was changed, add expense to new category
                var newExpense;
                if (object.category != data.category) {
                    newExpense = doc.data().expenses + parseFloat(parseFloat(object.amount).toFixed(2));
                } else {
                    newExpense = parseFloat((doc.data().expenses - data.amount + parseFloat(parseFloat(object.amount).toFixed(2))).toFixed(2));
                }
                 await updateDoc(doc.ref, { expenses: newExpense });
            });

            const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${date.getFullYear()}`, `${date.getMonth() + 1}`, "Total");
            const docSnap = await getDoc(docRef); 
            await updateDoc(docRef, {
                total: docSnap.data().total - data.amount + parseFloat(parseFloat(object.amount).toFixed(2))
            });

            // if category was changed, deduct expense from old category
            if (object.category != data.category) {
                const ogCat = query(collection(db, "users", `${thisUserID}`, "budgets", `${date.getFullYear()}`, `${date.getMonth() + 1}`), where("category", "==", data.category));
                const ogCatSnapshot = await getDocs(ogCat);
                ogCatSnapshot.forEach(async (doc) => {
                    const newExpense = parseFloat((doc.data().expenses - data.amount).toFixed(2));
                    await updateDoc(doc.ref, { expenses: newExpense });  
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
                <Text style={styles.header}>Edit</Text>
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
                        placeHolder={formattedDate}
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
                        changeItem({date: formattedDate, description: description, amount: amount, category: category});
                        setDescription('');
                        setAmount('');
                        setDate(new Date());
                        navigation.navigate('Expenses');
                    }}>
                    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>+    Change</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
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