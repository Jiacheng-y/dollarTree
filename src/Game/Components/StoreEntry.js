import React from 'react';
import { StyleSheet, Pressable, Text, Image, Alert, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { gardenImages } from '../../Images/Garden/gardenImages';
import { db, auth } from '../../Firebase';
import { collection, addDoc, doc, getDoc, setDoc, increment } from 'firebase/firestore';

export const StoreEntry = ({item, price}) => { 
    const navigation = useNavigation();

    const displayConfirmation = () => {
        Alert.alert(
            "Confirm Purchase?",
            `${item} \n` + `${price}` + " coins",
            [
                {
                    text: "Cancel",
                    style: "default"
                },
                { 
                    text: "Confirm", onPress: async () => {
                        const coinsRef = doc(db, "users", `${auth.currentUser.uid}`, "Coins", "Total");
                        const coinsSnap = await getDoc(coinsRef); 
                        if (coinsSnap.data().total < price) {
                            Alert.alert("Not enough coins! :(")
                        } else {
                            const newAmount = coinsSnap.data().total - price
                            await setDoc(coinsRef, {
                                total: newAmount
                            });
    
                            const gardenCollection = collection(db, "users", `${auth.currentUser.uid}` , "Garden", `${new Date().getFullYear()}`, `${new Date().getMonth() + 1}`);
                            await addDoc(gardenCollection, {
                                name: item
                            })

                            const docRef = doc(db, "users", `${auth.currentUser.uid}`, "Garden", `${new Date().getFullYear()}`, `${new Date().getMonth() + 1}`, "Total");
                            const docSnap = await setDoc(docRef, {
                                total: increment(1)
                            });
                            
                            setTimeout(() => {
                                navigation.navigate("Garden");
                            }, 375)
                        }
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
            <View style={styles.imageContainer}>
                <Image
                    source={gardenImages[item]}
                    style={styles.image}
                > 
                </Image>
            </View>
            
            <Text style={styles.name}>{item}</Text>
            <Text style={styles.price}>{price} Coins</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 130,
        width: 130,
        resizeMode: 'contain',
    },
    container: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray',
        marginTop: 5
    },
    price: {
        fontSize: 15
    }
})