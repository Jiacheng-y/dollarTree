import React from 'react';
import { StyleSheet, View, Pressable, Text, SafeAreaView, FlatList, Image, Alert } from 'react-native';
import { StoreEntry } from '../../Game/Components/StoreEntry';

export const StoreScreen = () => {
    const list = ["Orange Tree", "Leafy Tree"];

    return (
        <SafeAreaView>
            <FlatList
                data={list}
                renderItem={({item}) => (
                    <StoreEntry
                        item={item}
                        price={100}
                    />
                )} 
                style={styles.listContainer}
                horizontal={true}
            />
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    listContainer: {
        // backgroundColor: 'gray'
    }
})