import React, { useState } from 'react';
import axios from 'axios';

const NovaObraForm = ({ onObraCriada }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataPrevisaoFim, setDataPrevisaoFim] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novaObra = {
        nome,
        descricao,
        dataInicio,
        dataPrevisaoFim
      };

      await axios.post('http://localhost:8080/api/obras', novaObra);
      alert('Obra cadastrada com sucesso!');
      setNome('');
      setDescricao('');
      setDataInicio('');
      setDataPrevisaoFim('');
      onObraCriada(); // Atualiza a lista de obras
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error);
      alert('Erro ao cadastrar obra.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Cadastrar Nova Obra</h2>
      <div>
        <label>Nome: </label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Descrição: </label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </div>
      <div>
        <label>Data de Início: </label>
        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
      </div>
      <div>
        <label>Data de Previsão de Fim: </label>
        <input type="date" value={dataPrevisaoFim} onChange={(e) => setDataPrevisaoFim(e.target.value)} required />
      </div>
      <button type="submit">Cadastrar Obra</button>
    </form>
  );
};

export default NovaObraForm;