import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export const CategoryPicker = ({category, setCategory, year, month}) => {
    useEffect(() => {
        const q = query(collection(db, "users", `${auth.currentUser.uid}`, "budgets", `${year}`, `${month}`));
        const unsubscribe = onSnapshot(q, (snapshot) => {  
            const newItems = [{label: 'Others', value: 'Others'}];
            snapshot.forEach((doc) => {
                newItems.push(
                    {label: doc.data().category, value: doc.data().category}
                ); 
            })
            setItems(newItems);
        })
        return () => { unsubscribe(); }
    }, [month, year]);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    return (
        <DropDownPicker
            placeholder='Category'
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
        />
    );
}