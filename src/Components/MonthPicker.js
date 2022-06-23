import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { monthName } from '../functions/monthName';

export const MonthPicker = ({setTime}) => {
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
            placeholder='Select Year & Month'
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