import Matter from "matter-js";
import React from "react";
import { Image } from 'react-native';

const Money = (props) => {
    
    // max value of x of the body within the rectangle - min value of x of the body within the rectangle
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    // get x and y position of the center of Money's body
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;
    const money = require("../../../assets/rptrz-ps-transparent-800x400.gif")

    // return the Money component as it should look
    return(
        <Image 
            style={{ 
                position: 'absolute', 
                left: xBody, 
                top: yBody, 
                width: widthBody, 
                height: heightBody, 
            }} 
            resizeMode="stretch" 
            source={money} 
        />
    )
}

// will be called whenever Money is created
export default (world, color, pos, size) => {

    // the "box" of the Money component
    const initialMoney = Matter.Bodies.rectangle(
        pos.x, 
        pos.y, 
        size.width,
        size.height,
        // optional params
        // {
        //     frictionAir: 0.021,
        //     restitution: 1.0
        // }, 
        {label: 'Money'},
    )
    
    // add initial coin to the world 
    Matter.World.add(world, initialMoney)

    return {
        body: initialMoney, 
        color, 
        pos,
        renderer: <Money/> 
    }
};