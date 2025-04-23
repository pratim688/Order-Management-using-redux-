// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import dineInReducer from './slices/dineInSlice';
import takeawayReducer from './slices/takeawaySlice';
import deliveryReducer from './slices/deliverySlice';
import cartReducer from './slices/cartSlice';


const store = configureStore({
  reducer: {
    dineIn: dineInReducer,
    takeaway: takeawayReducer,
    delivery: deliveryReducer,
    cart: cartReducer,
  },
});

export default store;
