import { ScrollView, StyleSheet, View, Text, Dimensions } from "react-native";
import { TreesBar } from "./TreesBar";

export const ThreeMonthGarden = ({year, month}) => {
    return (
        <ScrollView
            horizontal={true}
        > 
            <TreesBar
                year={year}
                month={month}
            >
            </TreesBar>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8f4ea',
        marginHorizontal: 25,
        marginTop: 25,
        borderRadius: 8,
        width: Dimensions.get('window').width - 50
    }
});