import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para adicionar nova etapa
export const addEtapa = createAsyncThunk(
  'etapas/addEtapa',
  async (etapaData) => {
    const response = await axios.post('http://localhost:8080/api/etapas', etapaData);
    return response.data;
  }
);

const etapasSlice = createSlice({
  name: 'etapas',
  initialState: {
    lista: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEtapa.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEtapa.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lista.push(action.payload);
      })
      .addCase(addEtapa.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default etapasSlice.reducer;