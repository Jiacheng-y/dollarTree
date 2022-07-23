import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, Platform, StatusBar, Dimensions } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Entities from '../../Game/Entities';
import physics from '../../Game/Systems/physics';
import { createBox } from '../../Game/Systems/createBox';
import { Coin } from '../../Game/Components/Coin';
import { IOSStatusBar } from '../../Components/IOSStatusBar';
import { monthName } from '../../Functions/monthName';
import { signOutEmailPassword } from '../AuthScreen';

// colour scheme: #19635b, #33765d, #4d8680, #669792, #80a9a4, #99bab6, #b3bc8, #ccdcdb, #e6eeed

export default function GardenScreen({navigation}) {
    const [year, setYear] = useState(new Date().getFullYear()); 
    const [month, setMonth] = useState(new Date().getMonth() + 1);

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
        
        <View style={{flexDirection: 'row'}}>
          <Coin/>

          <Pressable 
              style={styles.logOut}
              onPress={signOutEmailPassword}>
              <Text style={styles.logOutText}>Log Out</Text>
          </Pressable>
        </View>
        

        <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'center'}}>
            <Text style={styles.date}>{monthName(month) + " " + year + " Garden"}</Text>
            <Pressable
                style={styles.dateButton}
                onPress={() => { 
                    navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear, next: 'Garden' });
                }}>
                <Text style={{fontSize: 15, color: "white"}}>Change</Text>
            </Pressable>
        </View>

        <Pressable
          style={styles.storeButton}
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
  storeButton: {
    backgroundColor: '#4d8680',
    width: 370,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height - 280,
    alignSelf: 'center',

  },
  buttonText: {
    alignSelf: 'center',
    color: "white",
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateButton: {
    backgroundColor: '#669792',
    marginLeft: 10,
    alignSelf: 'center',
    borderRadius: 8,
    padding: 5,
    opacity: 0.6,
    marginBottom: 10,
    width: 63
    //opacity: controlOpacity(null)
  },
  date: {
    color: '#4d8680',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    marginTop: 10
  }, 
  logOut: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3091',
    borderRadius: 8,
    width: Dimensions.get('window').width - 160
  },
  logOutText: {
    color: 'white', 
    fontSize: 17,
    fontWeight: 'bold'
  }
});