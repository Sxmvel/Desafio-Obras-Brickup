import axios from 'axios';

const API_URL = 'http://localhost:8080/api/obras';

export const getObras = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const criarObra = async (novaObra) => {
  const response = await axios.post(API_URL, novaObra);
  return response.data;
};

export const atualizarObra = async (id, obraAtualizada) => {
  const response = await axios.put(`${API_URL}/${id}`, obraAtualizada);
  return response.data;
};

export const deletarObra = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};