import React from 'react';
import { StyleSheet } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Entities from '../Game/Entities';
import physics from '../Game/Systems/physics';
import { createBox } from '../Game/Systems/createBox';

export default function TreeScreen() {
    return (
      <GameEngine
        style={styles.container}
        systems={[physics, createBox]} // functions called on every tick (update/re-start of game loop)
        entities={Entities()}
      >
      </GameEngine>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});