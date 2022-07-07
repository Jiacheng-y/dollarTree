import { Text, StyleSheet, View, Dimensions, ImageBackgroundComponent } from "react-native";

export const TSItem = ({number, category, percentage}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{number + "."}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.percentage}>{percentage}</Text>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        width: Dimensions.get('window').width - 50
    },
    number: {
        marginLeft: 20,
        flex: 0.4,
        fontSize: 17,
        color: 'gray',
        fontWeight: 'bold'
    },
    category: {
        flex: 2.5,
        fontSize: 17,
        color: 'gray',
        fontWeight: 'bold'
    }, 
    percentage: {
        flex: 1,
        fontSize: 17,
        color: 'gray',
        fontWeight: 'bold',
    }
})
