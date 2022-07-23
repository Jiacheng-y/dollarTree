import Matter from "matter-js";
import React from "react";
import Svg, { Polygon } from 'react-native-svg';

const LandRenderer = (props) => {

    // max value of x of the body within the rectangle - min value of x of the body within the rectangle
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    // get x and y position of the center of Land's body
    const xBody = props.body.position.x
    const yBody = props.body.position.y

    const color = props.color;

    // return the Land component as it should look
    return(
        <Svg>
            <Polygon
                points={
                    `${xBody + widthBody/2}`+ "," + `${yBody}` + " " + 
                    `${xBody}`+ "," + `${yBody + heightBody/2}` + " " +
                    `${xBody - widthBody/2}`+ "," + `${yBody}` + " " + 
                    `${xBody}`+ "," + `${yBody - heightBody/2}` + " " 
                    
                }
                fill="#4d8680"
                stroke="#4d8680"
                strokeWidth="5"
            />
        </Svg>
    )
}

export default function Land(world, color, pos, size) {

    // create a "box" of the Land component
    const initialLand = Matter.Bodies.rectangle(
        pos.x, 
        pos.y, 
        size.width,
        size.height,
        // optional params
        {
            label: 'Land', 
            isStatic: true
        }
    )

    Matter.Body.rotate(initialLand, 45)
    
    // add initial Land to world
    Matter.World.add(world, initialLand)

    return {
        body: initialLand, 
        color, 
        pos, 
        renderer: <LandRenderer/>
    }
};