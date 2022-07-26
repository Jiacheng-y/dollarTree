import Matter from "matter-js";
import Money from "../Objects/Money";
import Land from "../Objects/Land";
import { Dimensions } from "react-native";
import Tree from "../Objects/Tree";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

// to completely reset the game
export default restart = () => {
    let engine = Matter.Engine.create();
    engine.gravity.y = 0.4;
    let world = engine.world;

    return {
        // return the physics of the world
        physics: {engine, world},
        // also return all the components in the game world
        Money: Money(world, 'green', {x: 50, y: 100}, {height: 40, width: 40}),
        // Tree: Tree(world, 'green', {x: windowWidth / 2, y: windowHeight - 80}, {height: windowHeight*0.75, width: windowWidth*0.65}),
        Land: Land(world, '#669792', {x: windowWidth / 2, y: windowHeight / 2}, {height: windowWidth * 0.6, width: windowWidth * 0.6})
    }
};