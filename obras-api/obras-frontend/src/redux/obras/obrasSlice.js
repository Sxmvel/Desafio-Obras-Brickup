import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base da API
const API_URL = 'http://localhost:8080/api/obras';

// Buscar todas as obras
export const fetchObras = createAsyncThunk('obras/fetchObras', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Buscar progresso da obra
export const fetchProgressoObra = createAsyncThunk(
  'obras/fetchProgressoObra',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}/progresso`);
    return response.data;
  }
);

// Buscar uma obra específica com detalhes
export const fetchObraDetalhada = createAsyncThunk('obras/fetchObraDetalhada', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// Adicionar uma nova obra
export const addObra = createAsyncThunk('obras/addObra', async (novaObra) => {
  const response = await axios.post(API_URL, novaObra);
  return response.data;
});

// Deletar obra
export const deleteObra = createAsyncThunk('obras/deleteObra', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Adicionar nova etapa
export const addEtapa = createAsyncThunk('obras/addEtapa', async (etapaData) => {
  const response = await axios.post('http://localhost:8080/api/etapas', etapaData);
  return response.data;
});

const obrasSlice = createSlice({
  name: 'obras',
  initialState: {
    obras: [],
    obraSelecionada: null,
    progresso: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Buscar todas
      .addCase(fetchObras.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchObras.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.obras = action.payload;
      })
      .addCase(fetchObras.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Buscar uma específica
      .addCase(fetchObraDetalhada.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchObraDetalhada.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.obraSelecionada = action.payload;
      })
      .addCase(fetchObraDetalhada.rejected, (state) => {
        state.status = 'failed';
        state.obraSelecionada = null;
      })

      // Adicionar nova obra
      .addCase(addObra.fulfilled, (state, action) => {
        state.obras.push(action.payload);
      })

      // Deletar obra
      .addCase(deleteObra.fulfilled, (state, action) => {
        state.obras = state.obras.filter((obra) => obra.id !== action.payload);
      })

      // Buscar progresso
      .addCase(fetchProgressoObra.fulfilled, (state, action) => {
        state.progresso = action.payload;
      })

      // Adicionar etapa
      .addCase(addEtapa.fulfilled, (state, action) => {
        if (state.obraSelecionada) {
          state.obraSelecionada.etapas.push(action.payload);
        }
      });
  },
});

export default obrasSlice.reducer;