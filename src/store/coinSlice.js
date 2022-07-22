import { createSlice } from '@reduxjs/toolkit';

export const coinSlice = createSlice({
    name: "coinSlice",
    initialState: {
        count: 0
    },
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
    }
});

export const {
    setCount
} = coinSlice.actions;

export default coinSlice.reducer;