import { VictoryBar, VictoryChart, VictoryAxis, TextSize } from 'victory-native';
import React, { useState, useEffect } from 'react';
import { monthName } from "../../functions/monthName";
import { query, collection, getDocs, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { CategoryPicker } from "../CategoryPicker";

export const CategoryExpenses = ({year, month}) => {
    const [chosenCategory, setChosenCategory] = useState(null);
    const [data, setData] = useState([]);
    const thisUserID = auth.currentUser.uid;

    useEffect(() => {
        const q = query(collection(db, "users", `${thisUserID}`, "budgets", `${year}`, `${month}`), where("category", "==", `${chosenCategory}`));
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
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const newData = [];
            var monthVar = month1Month;
            var yearVar = month1Year;
            for (var i = 0; i < 2; i++) {
                const q2 = query(collection(db, "users", `${thisUserID}`, "budgets", `${yearVar}`, `${monthVar}`), where("category", "==", `${chosenCategory}`));
                const querySnapshot = await getDocs(q2);
                querySnapshot.forEach((doc) => {
                    newData.push(
                        { 
                            x: monthName(monthVar),
                            y: doc.data().expenses
                        }
                    ); 
                });
                monthVar = month2Month;
                yearVar = month2Year;
            }
            snapshot.forEach((doc) => {
                newData.push({ x: monthName(month), y: doc.data().expenses }); 
            })
            setData(newData);
        });
        return () => { unsubscribe(); }
    }, [month, year, chosenCategory]);

    return (
        <SafeAreaView>
            <Text style={styles.description}>
                Compare category expenses across months
            </Text>
             <CategoryPicker 
                containerStyle={styles.category}
                textStyle={{color: "#eef5ff"}}
                category={chosenCategory}
                setCategory={setChosenCategory}
                year={year}
                month={month}
            />
            <VictoryChart>
                <VictoryBar
                    data={data}
                    alignment="start"
                    barRatio={0.5}
                    style={{ data: { fill: "#284f8f" } }}
                />
            </VictoryChart>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    description: {
        marginHorizontal: 30,
        marginVertical: 30,
        fontSize: 16
    },
    category: {
        marginHorizontal: 30, 
        width: 150,
        backgroundColor: "#284f8f"
    }
});