import Matter from "matter-js";
import Money from "../Game/Money";
import Floor from "../Game/Floor";
import { Dimensions } from "react-native";
import Tree from "../Game/Tree";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default restart = () => {

    //enableSleeping improves performance of app
        // at cost of accuracy
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world;

    engine.gravity.y = 0.4;

    return {
        //return the physics of the world
        //engine and world are in curly brackets 
        // because they are objects
        physics: {engine, world},
        //also return components that come in 
        // the game world
        Money: Money(world, 'green', {x: 50, y: 100}, {height: 40, width: 40}),
        Tree: Tree(world, 'green', {x: windowWidth/2, y: windowHeight-80}, {height: windowHeight*0.75, width: windowWidth*0.65}),
        Floor: Floor(world, 'green', {x: windowWidth / 2, y: windowHeight-60}, {height: 40, width: windowWidth})
    }
};