import Matter from "matter-js";
import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

const Money  = (props) => {
    
    // max value of x of the body - min value of x of the body
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    //get x and y position of the center of bird's body
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;
    const money = require("../../../assets/rptrz-ps-transparent-800x400.gif")

    //return the bird component as it should look
    return(
        <Image style={{ position: 'absolute', left: xBody, top: yBody, width: widthBody, height: heightBody, }} resizeMode="stretch" source={money} />
    )
}

export default (world, color, pos, size) => {

    //create a "hit box" of the bird component
    const initialMoney = Matter.Bodies.rectangle(
        pos.x, 
        pos.y, 
        size.width,
        size.height,
        //parameters in curly brackets are optional params
        {
            frictionAir: 0.021,
            restitution: 1.0
          }, 
        {label: 'Money'},
    )
    
    //add initial bird to world prev defined
    Matter.World.add(world, initialMoney)

    return {
        body: initialMoney, 
        color, 
        pos, 
        //pass a const variable to renderer
        //variable passed will handle creating everything to be rendered out
        renderer: <Money/>
    }
};