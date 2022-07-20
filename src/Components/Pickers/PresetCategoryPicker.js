import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const PresetCategoryPicker = ({category, setCategory}) => {
    const [items, setItems] = useState([
        {label: 'Food/Drinks', value: 'Food/Drinks'},
        {label: 'Transportation', value: 'Transportation'},
        {label: 'Utilities/Bills', value: 'Utilities/Bills'},
        {label: 'Entertainment', value: 'Entertainment'},
        {label: 'Shopping', value: 'Shopping'},
        {label: 'Loans/Debt', value: 'Loans/Debt'},
        {label: 'Home', value: 'Home'},
        {label: 'Gifts', value: 'Gifts'},
        {label: 'Travel', value: 'Travel'},
        {label: 'Health/Medical', value: 'Health/Medical'},
        {label: 'Insurance', value: 'Insurance'},
    ]);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Preset Categories
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
        marginTop: 15,
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
        left: 45,
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