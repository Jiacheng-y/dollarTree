import Matter from "matter-js";
import React from "react";
import { View } from 'react-native';

const FloorRenderer = (props) => {

    // max value of x of the body within the rectangle - min value of x of the body within the rectangle
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    // get x and y position of the center of Floor's body
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;

    // return the bird component as it should look
    return(
        <View style={{
            backgroundColor: color,
            borderWidth: 1,
            borderColor: color, 
            borderStyle: 'solid', 
            position: 'absolute', 
            left: xBody, 
            top: yBody,
            width: widthBody,
            height: heightBody,
        }} />
    )
}

export default function Floor(world, color, pos, size) {

    // create a "box" of the Floor component
    const initialFloor = Matter.Bodies.rectangle(
        pos.x, 
        pos.y, 
        size.width,
        size.height,
        // optional params
        {
            label: 'Floor', 
            isStatic: true
        }
    )
    
    // add initial Floor to world
    Matter.World.add(world, initialFloor)

    return {
        body: initialFloor, 
        color, 
        pos, 
        renderer: <FloorRenderer/>
    }
};