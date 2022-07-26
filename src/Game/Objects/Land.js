import Matter from "matter-js";
import React from "react";
import { Dimensions } from "react-native";
import Svg, { Rect } from 'react-native-svg';

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
            <Rect
                x={Dimensions.get('window').width / 2 - Dimensions.get('window').width * 0.45}
                y={Dimensions.get('window').height / 2 - Dimensions.get('window').width * 0.45}
                width={Dimensions.get('window').width * 0.9}
                height={Dimensions.get('window').width * 0.9}
                fill="#669792"
            />
            {/* <Polygon
                points={
                    `${xBody + widthBody/2}`+ "," + `${yBody}` + " " + 
                    `${xBody}`+ "," + `${yBody + heightBody/2}` + " " +
                    `${xBody - widthBody/2}`+ "," + `${yBody}` + " " + 
                    `${xBody}`+ "," + `${yBody - heightBody/2}` + " " 
                    
                }
                fill="#4d8680"
                stroke="#4d8680"
                strokeWidth="5"
            /> */}
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
    
    // add initial Land to world
    Matter.World.add(world, initialLand)

    return {
        body: initialLand, 
        color, 
        pos, 
        renderer: <LandRenderer/>
    }
};