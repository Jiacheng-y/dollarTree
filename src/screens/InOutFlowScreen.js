import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    FlatList,
    ToastAndroid,
    Keyboard,
} from 'react-native';
import { query, collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const InOutFlowScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{marginTop: 135, alignItems: "center"}}>

        </SafeAreaView>
    );
};