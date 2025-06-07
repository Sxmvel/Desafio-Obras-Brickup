import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/obras';

// Thunks
export const fetchObras = createAsyncThunk('obras/fetchObras', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchObraDetalhada = createAsyncThunk('obras/fetchObraDetalhada', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const fetchProgressoObra = createAsyncThunk('obras/fetchProgressoObra', async (id) => {
  const response = await axios.get(`${API_URL}/${id}/progresso`);
  return response.data;
});

export const addObra = createAsyncThunk('obras/addObra', async (novaObra) => {
  const response = await axios.post(API_URL, novaObra);
  return response.data;
});

export const deleteObra = createAsyncThunk('obras/deleteObra', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// ✅ addEtapa corrigido
export const addEtapa = createAsyncThunk(
  'obras/addEtapa',
  async ({ etapaData, obraId }, { dispatch, rejectWithValue }) => {
    try {
      // Corrige o envio da estrutura esperada: obra: { id }
      const etapaCorrigida = {
        ...etapaData,
        obra: {
          id: obraId
        }
      };

      const response = await axios.post('http://localhost:8080/api/etapas', etapaCorrigida);

      // Atualiza os dados após o sucesso
      await dispatch(fetchObraDetalhada(obraId));
      await dispatch(fetchProgressoObra(obraId));

      return response.data;
    } catch (err) {
      console.error('Erro ao criar etapa:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
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
      // Buscar obras
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

      // Obra detalhada
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

      // Adicionar obra
      .addCase(addObra.fulfilled, (state, action) => {
        state.obras.push(action.payload);
      })

      // Deletar obra
      .addCase(deleteObra.fulfilled, (state, action) => {
        state.obras = state.obras.filter((obra) => obra.id !== action.payload);
      })

      // Progresso
      .addCase(fetchProgressoObra.fulfilled, (state, action) => {
        state.progresso = action.payload;
      })

      // Adicionar etapa (não precisa alterar diretamente, já atualizamos via fetch)
      .addCase(addEtapa.fulfilled, (state) => {
        // Atualização já tratada acima
      });
  },
});

export default obrasSlice.reducer;