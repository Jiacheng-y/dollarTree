import { VictoryPie } from 'victory-native';
import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { SafeAreaView, Text, StyleSheet, View, Dimensions } from "react-native";

export const ExpensePie = ({year, month}) => {
    const [data, setData] = useState([]);
    const [edge, setEdge] = useState(false);
    const thisUserID = auth.currentUser.uid;

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

            if (snapshot.empty) {
                setEdge(true);
            } else {
                const docSnap = await getDoc(doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, "Total"))
                if (!docSnap.exists()) {
                    setEdge(true);
                } else {
                    setEdge(false);
                }
            }

            snapshot.forEach((doc) => {
                if (doc.data().expenses > 0 && doc.id != "Bonus") {
                    newData.push({ x: doc.data().category , y: doc.data().expenses }); 
                }
            })

            setData(newData);
        });

        return () => { 
            unsubscribe(); 
            //expenseSub();
        }

    }, [month, year]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{}}>
                <Text style={styles.description}>
                  Expenses Breakdown
                </Text>
            </View>
            {
                edge 
                ? 
                <View>
                    <Text style={styles.edge}>No categories added</Text>
                </View>
                :   
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <VictoryPie
                        data = {data}
                        colorScale={['#52C6D8', '#3EA2C3', '#2D7EAF','#1E5C9B','#123E86', '#accbff', '#92bbff', '#78aaff', '#649eff', '#4188ff']}
                        innerRadius={({ datum }) => 35}
                        height={250}
                        width={Dimensions.get('window').width - 50}
                        style={{
                            labels: { fontSize: 15 },
                        }}
                    />
                </View>
            }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    description: {
        fontSize: 20,
        fontWeight: 'bold', 
        marginLeft: 20,
        marginTop: 20
    }, 
    container: {
        backgroundColor: 'white',
        marginHorizontal: 25,
        marginTop: 25,
        borderRadius: 8,
    }, 
    edge: {
        fontSize: 18,
        fontStyle: 'italic',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 25,
        color: 'grey'
    }
});