import { configureStore } from '@reduxjs/toolkit';
import healthReducer from './healthSlice';

export const store = configureStore({
  reducer: {
    health: healthReducer,
  },
});