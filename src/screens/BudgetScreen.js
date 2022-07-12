import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
    ImageBackground,
    StatusBar,
    Platform,
    FlatList,
} from 'react-native';
import { db, auth } from '../Firebase';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc, orderBy, runTransaction, where, getDocs, updateDoc } from 'firebase/firestore';
import { BudgetEntry } from '../Components/Entries/BudgetEntry';
import { IOSStatusBar } from '../Components/IOSStatusBar';
import { monthName } from '../Functions/monthName';
import { FontAwesome } from '@expo/vector-icons'; 

export const BudgetScreen = ({ navigation }) => {

    const [budgetList, setBudgetList] = useState([]);
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());
    const [budget, setBudget] = useState(0);

    useEffect(() => {
        const q = collection(db, "users", `${auth.currentUser.uid}` , "budgets", `${year}`, `${month}`);
        const budgetQuery = query(q, orderBy("amount", "desc"));

        const subscriber = onSnapshot(budgetQuery, (snapshot) => {
            var newBudget = 0;
            const budgets = [];
            snapshot.forEach(doc => {
                budgets.push({
                    id: doc.id, 
                    ... doc.data()
                });
                newBudget += doc.data().amount;
            });

            setBudgetList([...budgets]);
            setBudget(newBudget);
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
                    <Text style={styles.date}>{monthName(month) + " " + year + " Budget"}</Text>
                    <Pressable
                        style={styles.dateButton}
                        onPress={() => { 
                            navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear, next: 'Budget' });
                        }}>
                        <Text style={{fontSize: 15, color: "black"}}>Change</Text>
                    </Pressable>
                </View>
                
                <Text style={styles.budget}>{"$" + budget.toFixed(2)}</Text>

                <Pressable
                    style={styles.button}
                    onPress={() => { 
                        navigation.navigate('Add Budget', {year: year, month: month});
                    }}>
                    <Text style={styles.buttonText}>+    Add Budget</Text>
                </Pressable>

                <FlatList
                    data={budgetList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <BudgetEntry
                                data={item}
                                onDelete={onDeleteHandler}
                        />
                    )} 
                    style={styles.listContainer}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={
                        <View style={{alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                            <Text style={styles.emptyList}>No budget added</Text>
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
    );
};

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
    budget: {
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