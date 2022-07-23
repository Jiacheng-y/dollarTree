import React from 'react';
import { StyleSheet, View, Text, FlatList, Platform, StatusBar } from 'react-native';
import { StoreEntry } from '../../Game/Components/StoreEntry';
import { IOSStatusBar } from '../../Components/IOSStatusBar';
import { Coin } from '../../Game/Components/Coin';

export const StoreScreen = () => {
    const list100 = ["Orange Tree", "Palm Tree", "Oak Tree"];
    const list200 = ["Lavender", "Daisies", "Rose Bush"];
    const list300 = ["Swing", "Autumn Tree", "Cherry Blossom Tree"];

    return (
        <View style={styles.background}>
            { Platform.OS === 'ios' 
                ? <IOSStatusBar color="#e8f4ea"/>
                : <StatusBar backgroundColor="#e8f4ea"/>
            }
            
            <Coin />

            <Text style={styles.header1}>welcome to...</Text>
            <Text style={styles.header2}>The Store</Text>

            <FlatList
                data={list100}
                renderItem={({item}) => (
                    <StoreEntry
                        item={item}
                        price={100}
                    />
                )} 
                style={styles.listContainer}
                horizontal={true}
            />

            <Text style={styles.divider}></Text>

            <FlatList
                data={list200}
                renderItem={({item}) => (
                    <StoreEntry
                        item={item}
                        price={200}
                    />
                )} 
                style={styles.listContainer}
                horizontal={true}
            />

            <Text style={styles.divider}></Text>
            
            <FlatList
                data={list300}
                renderItem={({item}) => (
                    <StoreEntry
                        item={item}
                        price={300}
                    />
                )} 
                style={styles.listContainer}
                horizontal={true}
            />

            <Text style={styles.divider}></Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#e8f4ea"
    },
    header2: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        // color: 'gray'
    },
    header1: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'gray',
        fontStyle: 'italic',
    },
    divider: {
        marginLeft: 25,
        fontSize: 20,
        padding: 15
    },
    listContainer: {
        // backgroundColor: 'gray'
    }
})