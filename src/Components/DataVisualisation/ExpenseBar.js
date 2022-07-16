import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import React, { useState, useEffect } from 'react';
import { monthName } from "../../Functions/monthName";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase";
import { SafeAreaView, Text, StyleSheet, View, Dimensions} from "react-native";
import { monthNumber } from '../../Functions/monthNumber';

export const ExpenseBar = ({year, month}) => {
    const [data, setData] = useState([]);
    const [edge, setEdge] = useState(false); // when all 3 month's expenses are $0
    const thisUserID = auth.currentUser.uid;
    
    useEffect(() => {
        const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${year}`, `${month}`, "Total");
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
        const unsubscribe = onSnapshot(docRef, async (document) => {
            const newData = [];
            var monthVar = month1Month;
            var yearVar = month1Year;
            for (var i = 0; i < 2; i++) {
                const docRef = doc(db, "users", `${thisUserID}`, "Expenses", `${yearVar}`, `${monthVar}`, "Total");
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    newData.push(
                        { 
                            x: monthName(monthVar).substring(0, 3),
                            y: 0
                        }
                    ); 
                } else {
                    newData.push(
                        { 
                            x: monthName(monthVar).substring(0, 3),
                            y: docSnap.data().total
                        }
                    ); 
                }
                monthVar = month2Month;
                yearVar = month2Year;
            }
            if (!document.exists()) {
                newData.push(
                    { 
                        x: monthName(month).substring(0, 3),
                        y: 0
                    }
                ); 
            } else {
                newData.push(
                    { 
                        x: monthName(month).substring(0, 3),
                        y: document.data().total
                    }
                ); 
            }
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
    }, [month, year]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{}}>
                <Text style={styles.header}>
                    3-Month Comparison
                </Text>
                <Text style={styles.description}>
                    of total expenses
                </Text>
                <Text style={styles.footnote}>
                    swipe for more
                </Text>
            </View>

            <View style={{alignSelf: 'center', flex: 1, justifyContent: 'center', marginBottom: 40}}>
                <VictoryChart
                    height={350}
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
                        style={{ data: { fill: "#284f8f" }, labels: { fontSize: 15 } }}
                        sortKey={item => monthNumber(item.x)}
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
        marginTop: 10,
        fontSize: 18,
        fontStyle: 'italic'
    },
    footnote: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
        color: 'gray',
    }
});