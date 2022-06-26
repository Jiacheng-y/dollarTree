import { VictoryPie } from 'victory-native';
import React, { useState, useEffect } from 'react';
import { query, collection, getDocs, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export const ExpensePie = ({year, month}) => {
    const [data, setData] = useState([]);
    const thisUserID = auth.currentUser.uid;
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        //getting expenses from expense collection instead of budget collection

        // const q = query(collection(db, "users", `${thisUserID}`, "expenses", `${year}`, `${month}`));
        // const expenseSub = onSnapshot(q, (snapshot) => {  
        //     const newItems = [{label: 'Others', value: 'Others'}];
        //     snapshot.forEach((doc) => {
        //         const canPush = true;  
        //         for (let i = 0; i < newItems.length; i++) {
        //             if (newItems[i].label === doc.data().category) {
        //                 canPush = false;
        //             }
        //         }

        //         if (canPush) {
        //             newItems.push(
        //                 {label: doc.data().category, value: doc.data().category}
        //             ); 
        //         }
        //     })
        //     setCategories(newItems);
        // });

        const budget = query(collection(db, "users", `${thisUserID}`, "budgets", `${year}`, `${month}`));


        const unsubscribe = onSnapshot(budget, async (snapshot) => {
            const newData = [];

            snapshot.forEach((doc) => {
                newData.push({ x: doc.data().category , y: doc.data().expenses }); 
            })

            setData(newData);
        });

        return () => { 
            unsubscribe(); 
            //expenseSub();
        }

    }, [month, year]);

    return (
        <SafeAreaView>
            <Text style={styles.description}>
                2. Compare your spending across categories
            </Text>
            <VictoryPie
            data = {data}
            colorScale={['#52C6D8', '#3EA2C3', '#2D7EAF','#1E5C9B','#123E86','#O82372']} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    description: {
        padding: 20
    },
});