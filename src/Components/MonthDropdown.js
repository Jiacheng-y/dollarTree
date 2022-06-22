import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown'; 
import { monthName } from '../functions/monthName';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const firstMonth = 1; 

const data = [
    { label: `${monthName(firstMonth)}`, value: `${firstMonth}` },
    { label: `${monthName(firstMonth + 1)}`, value: `${firstMonth + 1}` },
    { label: `${monthName(firstMonth + 2)}`, value: `${firstMonth + 2}` },
    { label: `${monthName(firstMonth + 3)}`, value: `${firstMonth + 3}` },
    { label: `${monthName(firstMonth + 4)}`, value: `${firstMonth + 4}` },
    { label: `${monthName(firstMonth + 5)}`, value: `${firstMonth + 5}` },
    { label: `${monthName(firstMonth + 6)}`, value: `${firstMonth + 6}` },
    { label: `${monthName(firstMonth + 7)}`, value: `${firstMonth + 7}` },
    { label: `${monthName(firstMonth + 8)}`, value: `${firstMonth + 8}` },
    { label: `${monthName(firstMonth + 9)}`, value: `${firstMonth + 9}` },
    { label: `${monthName(firstMonth + 10)}`, value: `${firstMonth + 10}` },
    { label: `${monthName(firstMonth + 11)}`, value: `${firstMonth + 11}` },
  ];

  const DropdownComponent = ({setMonth}) => {
    const [value, setValue] = useState(new Date().getMonth()+1);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Month
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Month' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setMonth(item.value);
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons 
                style={styles.icon}
                name="calendar-month-outline" 
                size={20} 
                color={isFocus ? "blue" : "black"} />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });