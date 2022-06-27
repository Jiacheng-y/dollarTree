import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown'; 
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const currYear = new Date().getFullYear(); 

const data = [
    { label: currYear, value: currYear },
    { label: currYear - 1, value: currYear - 1 },
    { label: currYear - 2, value: currYear - 2 },
  ];

  export const YearDropdown = ({setYear}) => {
    const [value, setValue] = useState(new Date().getFullYear());
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Year
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
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Year' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setYear(item.value)
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E3EEEB',
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
      backgroundColor: '#E3EEEB',
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
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });