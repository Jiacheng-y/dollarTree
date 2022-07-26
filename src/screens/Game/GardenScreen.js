import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, Platform, StatusBar, Dimensions, FlatList } from 'react-native';
import { collection, query, onSnapshot,  } from 'firebase/firestore';
import { db, auth } from "../../Firebase";
import { GameEngine } from "react-native-game-engine";
import Entities from '../../Game/Entities';
import physics from '../../Game/Systems/physics';
import { createBox } from '../../Game/Systems/createBox';
import { Coin } from '../../Game/Components/Coin';
import { IOSStatusBar } from '../../Components/IOSStatusBar';
import { monthName } from '../../Functions/monthName';
import { signOutEmailPassword } from '../AuthScreen';
import Tree from '../../Game/Objects/Tree';


// colour scheme: #19635b, #33765d, #4d8680, #669792, #80a9a4, #99bab6, #b3bc8, #ccdcdb, #e6eeed

export default function GardenScreen({navigation}) {
    // use these values to access the database according to month, year, and user chosen
    const [year, setYear] = useState(new Date().getFullYear()); 
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [user, setUser] = useState(auth.currentUser.uid);
    const [userEmail, setUserEmail] = useState("");
    const [trees, setTrees] = useState([]);

    //listener for changes in trees planted
    useEffect(() => {
      const q = collection(db, "users", `${user}` , "Garden", `${year}`, `${month}`);
      const treeQuery = query(q);

      const subscriber = onSnapshot(treeQuery, (snapshot) => {
          const trees = [];

          snapshot.forEach(doc => {
              if (doc.data().number > 0) {
                for (i = 0; i < doc.data().number; i++) {
                  trees.push(doc.data().name)
                }
              } else {
                trees.push(doc.data().name)
              }
          });

          setTrees(trees);
      });

      return () => {
          subscriber();
      }
  }, [month, year]);


    return (
      <GameEngine
        //keeps a reference of the game engine under this.engine
        ref={(ref) => { this.engine = ref; }}
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
        

        <View style={{flexDirection: 'row', marginTop: 25, justifyContent: 'center'}}>
            <Text style={styles.date}>{monthName(month) + " " + year}</Text>
            <Pressable
                style={styles.dateButton}
                onPress={() => { 
                    navigation.navigate('Select Month and Year', { setMonth: setMonth, setYear: setYear, next: 'Garden' });
                }}>
                <Text style={{fontSize: 15, color: "white"}}>Change</Text>
            </Pressable>
        </View>

        {
          user == auth.currentUser.uid
          ? 
            <Text style={styles.header}>Your Garden</Text>
          :
            <Text style={styles.header}>{userEmail}'s Garden</Text>

        }

        {
          user != auth.currentUser.uid
            ? 
              <Pressable
                style={styles.visit}
                onPress={() => { 
                    setUser(auth.currentUser.uid);
                }}>
                <Text style={styles.visitText}>click to return to your garden</Text>
              </Pressable>
            :
              <Pressable
                style={styles.visit}
                onPress={() => { 
                    navigation.navigate('Select User', { setUser: setUser, setUserEmail: setUserEmail });
                }}>
                <Text style={styles.visitText}>click to visit a friend's garden</Text>
              </Pressable>
        }

          {/* <Pressable
            style={styles.plantedButton}
            onPress={() => { 
                navigation.navigate('Garden Insights');
            }}>
            <Text style={styles.buttonText}>Trees Planted</Text>
          </Pressable> */}
          
        <FlatList
          //list of trees planted 
          //(render tree component according to docs listener)
          data={trees}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, width: Dimensions.get("window").width * 0.05, 
              height: Dimensions.get("window").height * 0.05  }}>
              <Tree
              engine={this.engine}
              tree={item} />
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index}
        />

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
    alignSelf: 'center',
    marginBottom: 5

  },
  // plantedButton: {
  //   backgroundColor: '#4d8680',
  //   width: 370,
  //   borderRadius: 8,
  //   height: 50,
  //   justifyContent: 'center',
  //   marginTop: Dimensions.get('window').height - 440,
  //   alignSelf: 'center',
  // },
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
    width: 63,
    //opacity: controlOpacity(null)
  },
  date: {
    color: '#4d8680',
    fontSize: 25,
    alignSelf: 'center',
  }, 
  header: {
    color: '#4d8680',
    fontWeight: 'bold',
    fontSize: 28,
    marginVertical: 10,
    alignSelf: 'center'
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
  },
  visit: {
    width: 350,
    alignSelf: 'center'
  },
  visitText: {
    fontSize: 20,
    color: '#4d8680',
    fontStyle: 'italic',
    alignSelf: 'center'
  }
});