import { Text, StyleSheet, TextInput, Pressable, View, Dimensions, Platform, StatusBar } from "react-native";
import React, { useState, useEffect } from 'react';
import { db, auth } from "../Firebase";
import { updateDoc, doc, query, collection, where, getDocs} from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';
import { IOSStatusBar } from "../Components/IOSStatusBar";
import { PresetCategoryPicker } from "../Components/Pickers/PresetCategoryPicker";

export const ChangeBudgetScreen = ({ navigation, route }) => {
    const { data, year, month } = route.params;
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState(null);
    
    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        setAmount(data.amount.toFixed(2));
        setCategory(data.category);
    }, [data]);

    const changeItem = async (object) => {
        try {
            const docRef = doc(db, "users", `${thisUserID}`, "budgets", `${year}`, `${month}`, `${data.id}`);
            if (object.category != data.category) {
                const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`), where("category", "==", object.category));
                const querySnapshot = await getDocs(q);
                var newExpense = 0;
                querySnapshot.forEach((doc) => {
                    newExpense += doc.data().amount;
                });
                await updateDoc(docRef, { expenses: newExpense });
            }
            await updateDoc(docRef, {
                amount: parseFloat(parseFloat(object.amount).toFixed(2)),
                category: object.category
            });
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
                <Text style={styles.header}>Budget</Text>
            </View>

            <PresetCategoryPicker
                category={category}
                setCategory={setCategory}
            />

            <Text style={styles.footnote}>change expenses categories as well if needed</Text>

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
                    placeholder="Category">
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
        
            <Pressable
                style={styles.button}
                onPress={() => {
                    changeItem({amount: amount, category: category});
                    setAmount('');
                    setCategory('');
                    navigation.navigate('Budget');
                }}
                android_ripple={{ color: 'white' }} >
                <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>+    Change</Text>
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
    footnote: {
        marginLeft: 35,
        fontSize: 15,
        color: 'gray',
        fontStyle: 'italic'
    }
})

