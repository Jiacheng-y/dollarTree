import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Entities from '../../Game/Entities';
import physics from '../../Game/Systems/physics';
import { createBox } from '../../Game/Systems/createBox';
import { Coin } from '../../Game/Components/Coin';

export default function GardenScreen({month, year, navigation}) {
    return (
      <GameEngine
        style={styles.container}
        systems={[physics, createBox]} // functions called on every tick (update/re-start of game loop)
        entities={Entities()}
      >
        <Pressable
          style={styles.button}
          onPress={() => { 
              navigation.navigate('Store');
          }}>
          <Text style={styles.buttonText}>Store</Text>
        </Pressable>
        {/* <Coin/> */}
      </GameEngine>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 50,
    marginLeft: 20,
    backgroundColor: 'gray',
    width: 100
  }
});