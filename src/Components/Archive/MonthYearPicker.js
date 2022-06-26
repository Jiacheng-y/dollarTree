// Dropdown menu to select both the year and the month
// Not currently in use

import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { monthName } from '../../functions/monthName';
import { StyleSheet } from 'react-native';

export const MonthYearPicker = ({setTime}) => {
    const firstMonth = 1;
    const currentYear = new Date().getFullYear();;

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Year', value: 'Year' },
        { label: `${currentYear}`, value: `${currentYear}`, parent: 'Year' },
        { label: `${currentYear - 1}`, value: `${currentYear - 1}`, parent: 'Year' },

        { label: 'Month', value: 'Month' },
        { label: `${monthName(firstMonth)}`, value: firstMonth, parent: 'Month' },
        { label: `${monthName(firstMonth + 1)}`, value: firstMonth + 1, parent: 'Month' },
        { label: `${monthName(firstMonth + 2)}`, value: firstMonth + 2, parent: 'Month' },
        { label: `${monthName(firstMonth + 3)}`, value: firstMonth + 3, parent: 'Month' },
        { label: `${monthName(firstMonth + 4)}`, value: firstMonth + 4, parent: 'Month' },
        { label: `${monthName(firstMonth + 5)}`, value: firstMonth + 5, parent: 'Month' },
        { label: `${monthName(firstMonth + 6)}`, value: firstMonth + 6, parent: 'Month' },
        { label: `${monthName(firstMonth + 7)}`, value: firstMonth + 7, parent: 'Month' },
        { label: `${monthName(firstMonth + 8)}`, value: firstMonth + 8, parent: 'Month' },
        { label: `${monthName(firstMonth + 9)}`, value: firstMonth + 9, parent: 'Month' },
        { label: `${monthName(firstMonth + 10)}`, value: firstMonth + 10, parent: 'Month' },
        { label: `${monthName(firstMonth + 11)}`, value: firstMonth + 11, parent: 'Month' },
    ]);
    const [value, setValue] = useState([]);

    return (
        <DropDownPicker
            placeholder={value[0] == null ? 'Select Year & Month' : value[0] + "" + value[1]}
            categorySelectable={false}
            multiple={true}
            min={2}
            max={2}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onClose={() => {
                setTime(value);
                setValue([]);
            }}
            style={styles.container}
            dropDownContainerStyle={styles.container}
            placeholderStyle={{color: "black", fontSize: 17}}
            mode='BADGE'
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: 380,
        marginHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
        borderColor: "#a8a8a8",
        backgroundColor: "white"
    }
})