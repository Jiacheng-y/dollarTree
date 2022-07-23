import { StyleSheet, View, Text, Image, Animated } from "react-native";
import React, { useRef, useEffect } from 'react';
import { onSnapshot, getDoc, doc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import { setCount } from "../../Store/coinSlice";
import { db, auth } from "../../Firebase";

export const Coin = () => {
    // cannot have own counter useState as all the screens will have copies 
    // and not use the same state, causing repeated animations -> use redux
    var count = useSelector(state => state.coinSlice.count);
    const dispatch = useDispatch();
    var ref = useRef(0);
    // cannot use count as the reference against doc.data().total itself as 
    // its value is not updated in time after every iteration
    var shouldUpdate = useRef(false); 
    // should not update on the first render

    useEffect(() => {
        const getInitialCount = async () => {
            const document = await getDoc(doc(db, "users", `${auth.currentUser.uid}`, "Coins", "Total"));
            var updatedValue = document.exists() ? document.data().total : 0;
            ref.current = updatedValue;
            dispatch(setCount(updatedValue));    
        }
        getInitialCount();
    }, [])
    // update the count immediately when the screen is first rendered (eg. reload) 
    // so the animation doesn't start incrementing from 0 every time
    
    // stale closure: useEffect remembers the original count = 0 and doesn't receive the updated count after the first useEffect
    // so the updating function should not be executed on the first render 
    useEffect(() => {
        onSnapshot(doc(db, "users", `${thisUserID}`, "Coins", "Total"), (doc) => {
            // listener retrieves new value for count when it is updated
            const difference = doc.data().total - ref.current; 
            const myInterval = setInterval(() => {
                if (shouldUpdate.current) {
                    if (ref.current >= doc.data().total) {
                        clearInterval(myInterval);
                    } else {
                        ref.current += parseInt(difference / 5);
                        dispatch(setCount(ref.current));    
                    }
                } else {
                    shouldUpdate.current = true;
                    clearInterval(myInterval);
                }
            }, 75); 
        }); 
    }, [])

    const thisUserID = auth.currentUser.uid;

    return (
        <View style={styles.container}>
            <Image
                source={require("../../Images/Coin.png")}
                resizeMode="contain"
                resizeMethod="resize"
                style={styles.image}
            />
            
            <Text style={styles.text}>{count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       borderRadius: 8, 
       flexDirection: 'row',
       height: 27,
       width: 100,
       backgroundColor: '#9DC6FF',
       alignItems: 'center',
       marginLeft: 28
    },
    text: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 5,
    },
    image: {
        width: 30,
        height: 30,
        marginLeft: -3
    }
})