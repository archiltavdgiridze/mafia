// arraySlice.js
import { createSlice } from '@reduxjs/toolkit';

const arraySlice = createSlice({
  name: 'array',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter(item => item !== action.payload);
    },
  },
});

export const { addItem, removeItem } = arraySlice.actions;
export default arraySlice.reducer;
