import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { monthName } from '../functions/monthName';

export const MonthPicker = ({setTime}) => {
    const currentMonth = new Date().getMonth() + 1; 
    var month3;
    const currentYear = new Date().getFullYear();;
    switch(currentMonth) {
        case 1:
            month3 = 10;
            break;
        case 2:
            month3 = 11;
            break;
        case 3:
            month3 = 12;
            break;
        default:
            month3 = currentMonth - 3;
    }

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Month', value: 'Month'},
        {label: `${monthName(month3)}`, value: `${month3}`, parent: 'Month'},
        {label: `${monthName(month3 + 1 % 12)}`, value: `${month3 + 1 % 12}`, parent: 'Month'},
        {label: `${monthName(month3 + 2 % 12)}`, value: `${month3 + 2 % 12}`, parent: 'Month'},
        {label: `${monthName(currentMonth)}`, value: `${currentMonth}`, parent: 'Month'},

        {label: 'Year', value: 'Year'},
        {label: `${currentYear}`, value: `${currentYear}`, parent: 'Year'},
        {label: `${currentYear - 1}`, value: `${currentYear - 1}`, parent: 'Year'},
    ]);
    const [value, setValue] = useState([]);

    return (
        <DropDownPicker
            placeholder='Month'
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
        />
    );
}