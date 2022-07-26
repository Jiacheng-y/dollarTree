import React from "react";
import { Dimensions, Image } from 'react-native';
import { TouchableOpacity } from "react-native";
import { gardenImages } from "../../Images/Garden/gardenImages";

export default Tree = (props) => {

    const tree = gardenImages[props.tree];

    // return the Tree component as it should look
    return(
        <TouchableOpacity 
            onPress = {() => {
                props.engine.dispatch({ type: "shake-tree", })
            }}>
            <Image style={{ position: 'absolute', width: Dimensions.get("window").width * 0.1, height: Dimensions.get("window").height * 0.1}} resizeMode="stretch" source={tree} />
        </TouchableOpacity>
            
    )
}