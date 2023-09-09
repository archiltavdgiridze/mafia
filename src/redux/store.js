import { configureStore } from '@reduxjs/toolkit';
import arrayReducer from './arraySlice';

const store = configureStore({
  reducer: {
    array: arrayReducer,
  },
});

export default store;