import { ScrollView, StyleSheet, View, Text, Dimensions } from "react-native";
import { CategoryBar } from "./CategoryBar";

export const ThreeMonth = ({year, month}) => {
    return (
        <ScrollView
            horizontal={true}
        > 
            <CategoryBar
                year={year}
                month={month}
            >
            </CategoryBar>

            <View style={styles.container}>
                 <Text>Placeholder</Text>
            </View>

            <View style={styles.container}>
                 <Text>Placeholder</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 25,
        marginTop: 25,
        borderRadius: 8,
        width: Dimensions.get('window').width - 50
    }
});