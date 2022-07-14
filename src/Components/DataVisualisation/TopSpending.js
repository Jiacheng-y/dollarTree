import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { TSItem } from './TSItem';

export const TopSpending = ({year, month}) => {
    const [data, setData] = useState([]);
    const [edge, setEdge] = useState(false);
    const [totExp, setTotExp] = useState(0);
    const thisUserID = auth.currentUser.uid;

    // can be optimised 
    useEffect(() => {
        const budget = query(collection(db, "users", `${thisUserID}`, "budgets", `${year}`, `${month}`));
        const items = onSnapshot(budget, (snapshot) => {
            const newData = [];
            if (snapshot.empty) {
                setEdge(true);
            } else {
                setEdge(false);
            }
            snapshot.forEach((doc) => {
                    if (doc.id != "Total") {
                        newData.push({ x: doc.data().category , y: doc.data().expenses }); 
                    }
                }
            )
            newData.sort((a, b) => {
                return b.y == a.y 
                        ? a.x.localeCompare(b.x)
                        : b.y - a.y;
            });
            setData(newData);
        });
        const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, "Total");
        const expenses = onSnapshot(docRef, (document) => {
            if (document.exists()) {
                setTotExp(document.data().total);
                setEdge(false);
            } else {
                setEdge(true);
            }
        });
        return () => { 
            items(); 
            expenses();
        }
    }, [month, year]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{}}>
                <Text style={styles.description}>
                  Top Spending Categories
                </Text>
            </View>
            {
                edge 
                ? 
                <View>
                    <Text style={styles.edge}>No categories or expenses added</Text>
                </View>
                :   
                <View style={{justifyContent: 'center', marginBottom: 20}}>
                    {
                        data.length < 1 // covered under edge case, but necessary to avoid data[0] error before the new data is received
                        ? <TSItem number={1} category="NA" percentage="NA" />
                        : <TSItem number={1} category={data[0].x} percentage={(data[0].y / totExp * 100).toFixed(2) + "%"} />
                    }
                    {
                        data.length < 2
                        ? <TSItem number={2} category="NA" percentage="NA" />
                        : <TSItem number={2} category={data[1].x} percentage={(data[1].y / totExp * 100).toFixed(2) + "%"} />
                    }
                    {
                        data.length < 3
                        ? <TSItem number={3} category="NA" percentage="NA" />
                        : <TSItem number={3} category={data[2].x} percentage={(data[2].y / totExp * 100).toFixed(2) + "%"} />
                    }
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
        marginTop: 20,
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
    },
});