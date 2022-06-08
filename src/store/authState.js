import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        logIn: (state) => {
            state = true;
        },
        logOut: (state) => {
            state = false;
        }
    }
});

export const {
    logIn,
    logOut
} = authSlice.actions;

export default authSlice.reducer;