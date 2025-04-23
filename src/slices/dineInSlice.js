// src/slices/dineInSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tableNumber: '',
  guests: '',
};

const dineInSlice = createSlice({
  name: 'dineIn',
  initialState,
  reducers: {
    setDineInData: (state, action) => {
      state.tableNumber = action.payload.tableNumber;
      state.guests = action.payload.guests;
    },
    clearDineInData: () => initialState,
  },
});

export const { setDineInData, clearDineInData} = dineInSlice.actions;
export default dineInSlice.reducer;
