import Matter from "matter-js";
import React from "react";
import { Image } from 'react-native';

const Tree = (props) => {
    
    // max value of x of the body - min value of x of the body
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    //get x and y position of the center of bird's body
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;
    const tree = require("../../../assets/d00428efa0bf27b9edd37eac32dfd2c1.png")

    // return the Tree component as it should look
    return(
        <Image style={{ position: 'absolute', left: xBody, top: yBody, width: widthBody, height: heightBody, }} resizeMode="stretch" source={tree} />
    )
}

export default (world, color, pos, size) => {

    // create a "box" of the Tree component
    const initialTree = Matter.Bodies.rectangle(
        pos.x, 
        pos.y, 
        size.width,
        size.height,
        // optional params
        {label: 'Tree'},
    )
    
    // add initial Tree to world
    Matter.World.add(world, initialTree)

    return{
        body: initialTree, 
        color, 
        pos, 
        renderer: <Tree/>
    }
};