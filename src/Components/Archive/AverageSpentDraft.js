import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { query, collection, onSnapshot, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../Firebase";

export const AverageSpentDraft = ({month, year}) => {
    const [date, setDate] = useState(new Date());
    const formattedDate = `${date.getDate()}` + "/" + `${date.getMonth() + 1}` + "/" + `${date.getFullYear()}`;
    const [currentTotal1, setCurrentTotal1] = useState(0);
    const [currentTotal2, setCurrentTotal2] = useState(0);
    const [average, setAverage] = useState(0);
    const [thisMonth, setThisMonth] = useState(0);
    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        setInterval(() => {
            if (new Date() != date) {
                setDate(new Date());
            }
        }, 1000)
    }, []);

    // 
    useEffect(() => {
        setCurrentTotal1(0);
        setCurrentTotal2(0);
    }, [month, year]);

    useEffect(() => {
        const helper = async () => {
            var month1Year, month1Month, month2Year, month2Month;
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
            let monthVar = month1Month;
            let yearVar = month1Year;
            for (var i = 0; i < 3; i++) {
                if (!cumulated[i]) {
                    setCumulated();
                    // cumulate
                    const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${yearVar}`, `${monthVar}`));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        if (doc.data().date.split[0] < date.getDate()) {
                            averageValues[i] += doc.data().expenses;
                        }
                    });
                } 
                const q = query(collection(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`), where("date", "==", formattedDate));
                if (monthVar == thisMonth) {
                    const unsubscribe = onSnapshot(q, (snapshot) => {
                        var totalExpenses;
                        snapshot.forEach((doc) => {
                            totalExpenses += doc.data().expenses;
                            setThisMonth(totalExpenses);
                        })
                    });
                    return () => { unsubscribe(); }
                } else {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        monthVar += doc.data().expenses;
                    });
                }
                monthVar = i == 0 ? month2 : i == 1 ? month3 : thisMonth;
            }
            setAverage(((month1 + month2 + month3) / 3).toFixed(2));
        }
        helper();
    }, [date, month, year])

    return (
        <View style={styles.container}>
            <Text style={styles.description}>Amount Spent Up Till Today</Text>
            <Text style={styles.description}>{average}</Text>
            <Text style={styles.description}>{thisMonth}</Text>
        </View>
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
});