import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export const CategoryPicker = ({category, setCategory, year, month}) => {
    useEffect(() => {
        const q = query(collection(db, "users", `${auth.currentUser.uid}`, "budgets", `${year}`, `${month}`));
        onSnapshot(q, (snapshot) => {
            const newItems = [];
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    if (!items.some(object => object.label == change.data().category)) {
                        console.log("read" + change.data().category)
                        newItems.push(
                            ... items,
                            {label: change.data().category, value: change.data().category}
                        ); 
                    }
                }
                if (change.type === "removed") {
                    newItems = [... items]
                    if (snapshot.docs.filter(doc => doc.data().category == change.data().category) == 0) {
                        newItems.filter(object => object.label == change.data().category);
                    }
                }
            })
            setItems(newItems);
        })
    }, []);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Others', value: 'Others'}
    ]);

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