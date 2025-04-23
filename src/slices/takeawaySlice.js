import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  phone: '',
  pickupTime: '',
};

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState,
  reducers: {
    setTakeawayData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearTakeawayData: () => initialState,
  },
});

export const { setTakeawayData, clearTakeawayData } = takeawaySlice.actions;
export default takeawaySlice.reducer;
