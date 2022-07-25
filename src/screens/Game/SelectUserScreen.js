import { View, StyleSheet, Dimensions, Text, Pressable, StatusBar, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { IOSStatusBar } from '../../Components/IOSStatusBar';
import { collection, query, getDocs, where} from "firebase/firestore";
import { auth, db } from '../../Firebase';

export const SelectUserScreen = ({ navigation, route }) => {
    const { setUser, setUserEmail } = route.params;
    const [tempUser, setTempUser] = useState("");
    const [found, setFound] = useState(true);

    const handleSubmit = async () => {
        var userUID = "";
        const q = query(collection(db, "users"), where("email", "==", tempUser));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        querySnapshot.forEach((doc) => {
            if (doc.id != auth.currentUser.uid) {
                userUID = doc.data().id;
                console.log(userUID)
            }
        });

        if (userUID == "") {
            setFound(false);
        } else {
            setFound(true);
            setUser(userUID);
            setUserEmail(tempUser);
            navigation.navigate('Garden');
        }
    }
    
    return (
        <View style={{flex: 1}}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#e8f4ea" />
                : <StatusBar backgroundColor="#e8f4ea"/>
            }
            <View style={styles.container}> 
                
                <TextInput
                    style={styles.inputBox}
                    onChangeText={setTempUser}
                    value={tempUser}
                    placeholder="Enter User's Email">
                </TextInput>
                
                <Pressable
                    style={styles.doneButton}
                    onPress={() => { 
                        handleSubmit();
                        setTempUser(""); 
                    }}
                >
                    <Text style={{fontSize: 20, color: "white", fontWeight: 'bold'}}>Done</Text>
                </Pressable>

                {
                    found
                    ? 
                    <View></View>
                    :
                    <Text style={styles.error}>User not found</Text>
                }
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8f4ea',
        justifyContent: 'center',
        flex: 1
    }, 
    doneButton: {
        height: 50,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "#4d8680",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.93
    },
    inputBox: {
        fontSize: 20,
        height: 65,
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
    },
    error: {
        color: 'red',
        fontSize: 20,
        marginLeft: 25,
        marginTop: 5,
        fontWeight: 'bold'
    }
})