import Matter from "matter-js";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const Floor = (props) => {
    
    // max value of x of the body - min value of x of the body
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    //get x and y position of the center of bird's body
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;

    //return the bird component as it should look
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

export default (world, color, pos, size) => {

    //create a "hit box" of the bird component
    const initialFloor = Matter.Bodies.rectangle(
        pos.x, 
        pos.y, 
        size.width,
        size.height,
        //parameters in curly brackets are optional params
        {
            label: 'Floor', 
        isStatic: true},
    )
    
    //add initial bird to world prev defined
    Matter.World.add(world, initialFloor)

    return{
        body: initialFloor, 
        color, 
        pos, 
        //pass a const variable to renderer
        //variable passed will handle creating everything to be rendered out
        renderer: <Floor/>
    }
};