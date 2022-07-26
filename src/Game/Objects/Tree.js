import React from "react";
import { Image } from 'react-native';
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
            <Image style={{ position: 'absolute', }} resizeMode="stretch" source={tree} />
        </TouchableOpacity>
            
    )
}