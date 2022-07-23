import React from 'react';
import { StyleSheet, View, Pressable, Text, Platform, StatusBar } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Entities from '../../Game/Entities';
import physics from '../../Game/Systems/physics';
import { createBox } from '../../Game/Systems/createBox';
import { Coin } from '../../Game/Components/Coin';
import { IOSStatusBar } from '../../Components/IOSStatusBar';

export default function GardenScreen({month, year, navigation}) {
    return (
      <GameEngine
        style={styles.container}
        systems={[physics, createBox]} // functions called on every tick (update/re-start of game loop)
        entities={Entities()}
      >

        { Platform.OS === 'ios' 
            ? <IOSStatusBar color="#e8f4ea"/>
            : <StatusBar backgroundColor="#e8f4ea"/>
        }

        <Coin/>

        <Pressable
          style={styles.button}
          onPress={() => { 
              navigation.navigate('Store');
          }}>
          <Text style={styles.buttonText}>Store</Text>
        </Pressable>

      </GameEngine>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f4ea",
  },
  button: {
    marginLeft: 25,
    backgroundColor: 'gray',
    width: 105,
    marginVertical: 20,
    borderRadius: 8,
    height: 30,
    justifyContent: 'center'
  },
  buttonText: {
    alignSelf: 'center',
    color: "white",
    fontSize: 20,
    fontWeight: 'bold'
  }
});