import React from 'react';
import { Dimensions, StyleSheet, StatusBar} from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Money from '../Components/Game/Money';
import Entities from '../Components/Entities';
import Floor from '../Components/Game/Floor';

const { width, height } = Dimensions.get("screen");
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
Matter.World.add(world, [Money, Floor]);

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

let boxIds = 0;

const CreateBox = (entities, { touches, screen }) => {
  let world = entities["physics"].world;
    touches.filter(t => t.type === "press").forEach(t => {

        Matter.World.add(world, [Money]);

        entities[++boxIds] = Money;
    });
  return entities;
};

export default class App extends React.Component {
  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics, CreateBox]} // Array of Systems
        entities={Entities()}
      >
        <StatusBar style={'default'} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});