import { TouchableOpacity } from "react-native";
import { gardenImages } from "../../Images/Garden/gardenImages";
import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Animated
} from 'react-native';

export default Tree = (props) => {

    const tree = gardenImages[props.tree];

    // For coin animation
    const [show, setShow] = useState(false);
    const showRef = useRef(false);
    const coinImage = require("../../Images/Coin.png");
    const befX = 20
    const befY = 46;
    const moveAnim = useRef(new Animated.ValueXY({x: befX, y: befY})).current; 
    const aftX = befX;
    const aftY = 92; 

    const move = () => {
        Animated.timing(moveAnim, {
            toValue: {x: aftX, y: aftY},
            timing: 2000,
            useNativeDriver: true
        }).start(() => {
            showRef.current = false;
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
                showRef.current = true
                setShow(true)
                move()
            }}
            style={{
                width: Dimensions.get('window').width * 0.18,
                height: 92,
                justifyContent: 'center',
            }}
        >
            {
                showRef.current 
                ? <Animated.Image
                    source={coinImage}
                    style={[styles.coinImage, animatedStyle]}
                    />
                : <View />
            }

            <Image 
                style={{ 
                    width: Dimensions.get('window').width * 0.18, 
                    height: Dimensions.get('window').height * 0.15}} 
                    resizeMode="contain" 
                    source={tree} 
            />
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