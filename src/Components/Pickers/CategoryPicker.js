import React, { useEffect, useState } from 'react';
import { db, auth } from "../../Firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Dropdown } from 'react-native-element-dropdown';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const CategoryPicker = ({category, setCategory, year, month}) => {
    useEffect(() => {
        const q = query(collection(db, "users", `${auth.currentUser.uid}`, "budgets", `${year}`, `${month}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {  
            const newItems = [{label: 'Others', value: 'Others'}];
            snapshot.forEach((doc) => {
                if (doc.data().category != "Others") {
                  newItems.push(
                    {label: doc.data().category, value: doc.data().category}
                  ); 
                }
            })
            newItems.sort((a, b) => {
              return a.value.localeCompare(b.value); 
            });
            setItems(newItems);
        })
        return () => { unsubscribe(); }
    }, [month, year]);

    const [items, setItems] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Category
          </Text>
        );
    };
  
    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={items}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Category' : '...'}
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategory(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <MaterialIcons 
                        style={styles.icon}
                        name="category" 
                        size={22} 
                        color={isFocus ? "blue" : "black"} />
                )}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
      },
      dropdown: {
        height: 60,
        width: Dimensions.get('window').width - 65,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        alignSelf: 'center'
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 38,
        top: 5,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 18,
      },
      placeholderStyle: {
        fontSize: 20,
      },
      selectedTextStyle: {
        fontSize: 20,
      },
      iconStyle: {
        width: 25,
        height: 25,
      },
})