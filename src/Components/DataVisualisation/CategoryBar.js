import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import React, { useState, useEffect } from 'react';
import { monthName } from "../../Functions/monthName";
import { query, collection, getDocs, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { SafeAreaView, Text, StyleSheet, View, Dimensions} from "react-native";
import { CategoryPicker } from "../Pickers/CategoryPicker";
import { monthNumber } from '../../Functions/monthNumber';

export const CategoryBar = ({year, month}) => {
    const [chosenCategory, setChosenCategory] = useState(null);
    const [data, setData] = useState([]);
    const [edge, setEdge] = useState(false); // when all 3 month's expenses are $0
    const thisUserID = auth.currentUser.uid;

    // forget chosen category when a new month or year is selected
    useEffect(() => {
        setChosenCategory(null);
    }, [month, year])

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
                if (querySnapshot.empty) {
                    newData.push(
                        { 
                            x: monthName(monthVar).substring(0, 3),
                            y: 0
                        }
                    ); 
                }
                querySnapshot.forEach((doc) => {
                    newData.push(
                        { 
                            x: monthName(monthVar).substring(0, 3),
                            y: doc.data().expenses
                        }
                    ); 
                });
                monthVar = month2Month;
                yearVar = month2Year;
            }
            if (snapshot.empty) {
                newData.push(
                    { 
                        x: monthName(month).substring(0, 3),
                        y: 0
                    }
                ); 
            }
            snapshot.forEach((doc) => {
                newData.push({ x: monthName(month).substring(0, 3), y: doc.data().expenses }); 
            })
            setData(newData);
            if ((newData.length === 1 && newData[0].y === 0 ) || 
                (newData.length === 2 && newData[0].y === 0 && newData[1].y === 0 ) || 
                (newData.length === 3 && newData[0].y === 0 && newData[1].y === 0 && newData[2].y === 0 )) {
                setEdge(true);
            } else {
                setEdge(false);
            }
        });
        return () => { unsubscribe(); }
    }, [month, year, chosenCategory]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{}}>
                <Text style={styles.header}>
                    3-Month Comparison
                </Text>
                <Text style={styles.description}>
                    across chosen category
                </Text>
            </View>
            
             <CategoryPicker 
                category={chosenCategory}
                setCategory={setChosenCategory}
                year={year}
                month={month}
            />

            <View style={{alignSelf: 'center', marginBottom: 40}}>
                <VictoryChart
                    height={275}
                    width={Dimensions.get('window').width - 80}
                    domainPadding={{x: [25, 25], y: [25, 25]}}
                >   
                    <VictoryAxis
                        style={{ tickLabels: {fontSize: 15} }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{ tickLabels: {fontSize: 15} }}
                        tickValues={ edge ? [0] : null }
                    />
                    <VictoryBar
                        data={data}
                        alignment="middle"
                        barWidth={25}
                        style={{ data: { fill: "#2D7EAF" }, labels: { fontSize: 15 } }}
                        sortKey={item => monthNumber(item.x)} 
                        horizontal={true}
                        labels={({ datum }) => "$" + `${parseFloat(datum.y).toFixed(2)}`}
                    />
                </VictoryChart>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold', 
        marginLeft: 20,
        marginTop: 20
    },
    container: {
        backgroundColor: 'white',
        marginHorizontal: 25,
        width: Dimensions.get('window').width - 50,
        marginTop: 25,
        borderRadius: 8,
    },
    description: {
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 10,
        fontSize: 17,
        fontStyle: 'italic'
    }
});