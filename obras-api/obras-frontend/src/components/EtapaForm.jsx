import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEtapa } from '../redux/etapas/etapaSlice';

const EtapaForm = ({ obraId, onEtapaAdicionada }) => {
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('PENDENTE');
  const [responsavel, setResponsavel] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaEtapa = {
      nome,
      status,
      responsavel,
      dataInicio,
      dataFim,
      obra: { id: obraId },
    };

    dispatch(addEtapa(novaEtapa)).then(() => {
      onEtapaAdicionada(); // atualiza a lista
      setNome('');
      setStatus('PENDENTE');
      setResponsavel('');
      setDataInicio('');
      setDataFim('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Adicionar Etapa</h4>
      <input type="text" placeholder="Nome da Etapa" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <input type="text" placeholder="Responsável" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} required />
      <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
      <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDENTE">PENDENTE</option>
        <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
        <option value="CONCLUIDA">CONCLUÍDA</option>
      </select>
      <button type="submit">Adicionar Etapa</button>
    </form>
  );
};

export default EtapaForm;