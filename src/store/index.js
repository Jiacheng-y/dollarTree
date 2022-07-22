import { configureStore } from '@reduxjs/toolkit';
import coinSliceReducer from './coinSlice';

export const store = configureStore({
    reducer: {
        coinSlice: coinSliceReducer
    }
})