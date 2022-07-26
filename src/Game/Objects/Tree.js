import React from "react";
import { Dimensions, Image } from 'react-native';
import { TouchableOpacity } from "react-native";
import { gardenImages } from "../../Images/Garden/gardenImages";

export default Tree = (props) => {

    const tree = gardenImages[props.tree];

    // return the Tree component as it should look
    return(
        <TouchableOpacity 
            style={{
                width: Dimensions.get('window').width * 0.18,
                height: 100,
                justifyContent: 'center'
            }}
            // onPress = {() => {
            //     props.engine.dispatch({ type: "shake-tree", })
            // }}
        >
            <Image style={{ width: Dimensions.get('window').width * 0.18, height: Dimensions.get('window').height * 0.18}} resizeMode="contain" source={tree} />
        </TouchableOpacity>
            
    )
}