import { TouchableOpacity } from "react-native";
import { gardenImages } from "../../Images/Garden/gardenImages";
import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
    ImageBackground,
    Image,
    StatusBar,
    Platform,
    FlatList,
    Alert,
    Animated
} from 'react-native';

export default Tree = (props) => {

    const tree = gardenImages[props.tree];


    // For coin animation
    const [show, setShow] = useState(false);
    const coinImage = require("../../../assets/rptrz-ps-transparent-800x400.gif");
    const befX = Dimensions.get('window').width;
    const moveAnim = useRef(new Animated.ValueXY({x: befX / 2, y: 0})).current; 
    const X = befX/ 2;
    const Y = 500; 

    const move = (value) => {
        Animated.timing(moveAnim, {
            toValue: {x: X, y: Y},
            timing: 5000,
            useNativeDriver: true
        }).start(async () => {
            setShow(false);
        });
    }
    
    const animatedStyle = {
        transform: moveAnim.getTranslateTransform()
    }
    // For coin animation

    return(
        <TouchableOpacity
            onPress = {() => {
                //props.engine.dispatch({ type: "shake-tree"})
                setShow(true)
                move()
            }}
            style={{
                width: Dimensions.get('window').width * 0.18,
                height: 100,
                justifyContent: 'center'
            }}
        >
            {
                show 
                ? <Animated.Image
                    source={coinImage}
                    style={[styles.coinImage, animatedStyle]}
                    />
                : <View />
            }
            <Image style={{ width: Dimensions.get('window').width * 0.18, height: Dimensions.get('window').height * 0.18}} resizeMode="contain" source={tree} />

        </TouchableOpacity>
            
    )
}

const styles = StyleSheet.create({
    coinImage: {
        height: 30,
        width: 30,
        marginTop: -3
    }
})