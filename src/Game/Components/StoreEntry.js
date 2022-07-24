import React, { useEffect } from 'react';
import { StyleSheet, Pressable, Text, Image, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gardenImages } from '../../Images/gardenImages';

export const StoreEntry = ({item, price}) => { 
    const navigation = useNavigation();

    const displayConfirmation = () => {
        Alert.alert(
            "Confirm Purchase?",
            `${price}` + " coins",
            [
                {
                    text: "Cancel",
                    style: "default"
                },
                { 
                    text: "Confirm", onPress: () => {
                        console.log("Deduct Coins, Add Tree and Return to Garden") 
                        navigation.navigate("Garden")
                    }
                }
            ]
        );
    }

    return (
        <Pressable
            onPress={displayConfirmation}
            style={styles.container}
        >
            <Image
                // need to generalise
                source={gardenImages[item]}
                style={styles.image}
            > 
            </Image>
            <Text style={styles.text}>{item}</Text>
            <Text style={styles.text}>{price} Coins</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        resizeMode: 'contain'
    },
    container: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 2,
        alignItems: 'center'
    },
    text: {
        fontSize: 15
    }
})