import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getObras } from '../../services/obrasService';
import axios from 'axios';

const initialState = {
  lista: [],
  status: 'idle',
  erro: null,
};

export const fetchObras = createAsyncThunk('obras/fetchObras', async () => {
  const data = await getObras();
  return data;
});

export const addEtapa = createAsyncThunk(
  'obras/addEtapa',
  async (etapaData) => {
    const response = await axios.post('http://localhost:8080/api/etapas', etapaData);
    return response.data;
  }
);


const obrasSlice = createSlice({
  name: 'obras',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObras.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchObras.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lista = action.payload;
      })
      .addCase(fetchObras.rejected, (state, action) => {
        state.status = 'failed';
        state.erro = action.error.message;
      });
  },
});

export default obrasSlice.reducer;