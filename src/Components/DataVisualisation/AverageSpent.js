import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { query, collection, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { monthName } from "../../Functions/monthName";

export const AverageSpent = ({month, year}) => {
    const [date, setDate] = useState(new Date());
    const [currentExpense, setCurrentExpense] = useState(0);
    const [averagePastExpense, setAveragePastExpense] = useState(0);
    const thisUserID = auth.currentUser.uid;
    var month1Month, month1Year, month2Month, month2Year;

    useEffect(() => {
        setInterval(() => {
            if (new Date().getDate() != date.getDate()) {
                setDate(new Date());
            }
        }, 1000)
    }, []);

    useEffect(() => {
         // to handle edge cases (January and February)
         switch(month) {
            case 1:
                month1Year = year - 1;
                month1Month = 12;
                month2Year = year - 1;
                month2Month = 11;
                break;
            case 2:
                month1Year = year;
                month1Month = 1;
                month2Year = year - 1;
                month2Month = 12;
                break;
            default:
                month1Year = year;
                month1Month = month - 1;
                month2Year = year;
                month2Month = month - 2;
        }
    }, [month, year])
    
    // can be optimised 
    useEffect(() => {
        const helper = async () => {
            const target = date.getDate();
            var yearVar = month1Year;
            var monthVar = month1Month;
            var amounts = [];
            for (var i = 0; i < 2; i++) {
                var expense = 0;
                const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${yearVar}`, `${monthVar}`));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (doc.id != "Total" && parseInt(doc.data().date.split("/")[0]) <= target) {
                        expense += doc.data().amount;
                    }
                });
                amounts.push(expense);
                yearVar = month2Year;
                monthVar = month2Month;
            }
            setAveragePastExpense((amounts[0] + amounts[1]) / 2);
            const current = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`));
            const unsubscribe = onSnapshot(current, (snapshot) => {
                var newExpense = 0;
                snapshot.forEach((doc) => {
                    if (doc.id != "Total" && parseInt(doc.data().date.split("/")[0]) <= target) {
                        newExpense += doc.data().amount;
                    }
                })
                setCurrentExpense(newExpense);
            })
            return () => { unsubscribe(); }
        }
        helper();
    }, [date, month, year]);

    return (
        <View style={styles.container}>
            <Text style={styles.banner}>So Far This Month...</Text>
            {
                currentExpense < averagePastExpense
                ? <Text style={styles.info}>You have spent less than usual</Text>
                : currentExpense == averagePastExpense
                ? <Text style={styles.info}>You have spent as per usual</Text>
                : <Text style={styles.info}>You have spent more than usual</Text>
            }
            <View style={styles.amountSection}>
                <View style={styles.section}>
                    <Text style={styles.amount}>${averagePastExpense.toFixed(2)}</Text>
                    <Text style={styles.footnote}>Avg. spending</Text>
                    <Text style={styles.footnote}>up to this point</Text>
                </View>
                <View style={styles.separator}>

                </View>
                <View style={styles.section}>
                    <Text style={styles.amount}>${currentExpense.toFixed(2)}</Text>
                    <Text style={styles.footnote}>{monthName(month)} spending</Text>
                    <Text style={styles.footnote}>up to this point</Text>
                </View>
            </View>
            
            
        </View> 
    );
}

const styles = StyleSheet.create({
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 5,
        color: '#0F3091'
    }, 
    container: {
        backgroundColor: 'white',
        marginHorizontal: 25,
        marginTop: 25,
        borderRadius: 8,
        flex: 1,
    }, 
    amountSection: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 20
    },
    footnote: {
        fontSize: 15,
    }, 
    section: {
        alignItems: 'center',
        flex: 1,
    }, 
    banner: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    info: {
        marginLeft: 20,
        marginBottom: 25,
        fontSize: 17,
        fontStyle: 'italic'
    },
    separator: {
        backgroundColor: '#D3D3D3',
        flex: 0.01,
        height: 50,
        alignSelf: 'center'
    }
});