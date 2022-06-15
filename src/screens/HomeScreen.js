import { SafeAreaView, Pressable, Text, StyleSheet, View } from 'react-native';
import { signOutEmailPassword } from './AuthScreen';

export const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1, padding: 80, alignItems: "center"}}>
            <Text style={styles.header}>
                Welcome to dollarTree! 
            </Text>

            <View style={{flexDirection: 'column', }}>
                <Pressable 
                    style={styles.button}
                    onPress={() => {navigation.navigate('Expenses')}}
                    android_ripple={{color:'#FFF'}}>
                        <Text style={styles.options}>
                            My Expenses
                        </Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => {navigation.navigate('Budget')}}
                    android_ripple={{color:'#FFF'}}>
                        <Text style={styles.options}>
                            My Budgets
                        </Text>
                </Pressable>
            </View>

            <Pressable 
                style={styles.logOut}
                onPress={signOutEmailPassword}>
                <Text style={{color: 'white'}}>Log Out</Text>
            </Pressable>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 40, 
        marginVertical: 10, 
        fontFamily: 'San Francisco'
    }, 
    button: {
        height: 50, 
        width: 150, 
        backgroundColor: '#2962ff', 
        borderRadius: 10, 
        padding : 5,
        margin: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    options: {
        textAlign: 'center', 
        fontSize: 12, 
        color: 'white', 
    },
    logOut: {
        height: 55,
        width: 150,
        backgroundColor: '#2962ff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
        marginLeft: 5
    }
});