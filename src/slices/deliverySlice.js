import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  phone: '',
  instructions: '',
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveryData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearDeliveryData: () => initialState,
  },
});

export const { setDeliveryData, clearDeliveryData } = deliverySlice.actions;
export default deliverySlice.reducer;
