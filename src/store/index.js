import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authState';

export const store = configureStore({
    reducer: {
        authState: authReducer
    }
})