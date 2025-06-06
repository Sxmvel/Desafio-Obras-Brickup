import { configureStore } from '@reduxjs/toolkit';
import obrasReducer from '../redux/obras/obrasSlice';
import etapasReducer from '../redux/etapas/etapasSlice';

export const store = configureStore({
  reducer: {
    obras: obrasReducer,
    etapas: etapasReducer,
  },
});