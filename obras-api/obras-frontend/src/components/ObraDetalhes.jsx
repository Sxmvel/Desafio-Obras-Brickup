import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchObraDetalhada,
  fetchProgressoObra,
  addEtapa,
} from '../redux/obras/obrasSlice';

const ObraDetalhes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);

  const obra = useSelector((state) => state.obras.obraSelecionada);
  const progresso = useSelector((state) => state.obras.progresso);
  const status = useSelector((state) => state.obras.status);

  const [novaEtapa, setNovaEtapa] = useState({
    nome: '',
    status: 'PENDENTE',
    responsavel: '',
  });

  useEffect(() => {
    dispatch(fetchObraDetalhada(id));
    dispatch(fetchProgressoObra(id));
  }, [dispatch, id]);

  const handleChangeEtapa = (e) => {
    setNovaEtapa({ ...novaEtapa, [e.target.name]: e.target.value });
  };

  const handleSubmitEtapa = (e) => {
    e.preventDefault();
    const etapaComObraId = { ...novaEtapa, obraId: Number(id) };
    dispatch(addEtapa(etapaComObraId)).then(() => {
      dispatch(fetchObraDetalhada(id));
      dispatch(fetchProgressoObra(id));
      setNovaEtapa({ nome: '', status: 'PENDENTE', responsavel: '' });
    });
  };

  if (status === 'loading') return <p>Carregando...</p>;
  if (!obra) return <p>Obra não encontrada.</p>;

  return (
    <div>
      <h2>Detalhes da Obra</h2>
      <p><strong>Nome:</strong> {obra.nome}</p>
      <p><strong>Descrição:</strong> {obra.descricao}</p>
      <p><strong>Data de Início:</strong> {obra.dataInicio}</p>
      <p><strong>Data de Fim Prevista:</strong> {obra.dataPrevisaoFim}</p>

      {progresso && (
        <div style={{ marginTop: '20px' }}>
          <h3>Progresso</h3>
          <progress value={progresso.progressoPercentual} max="100" style={{ width: '100%' }} />
          <p>
            {progresso.etapasConcluidas} de {progresso.totalEtapas} etapas concluídas
            ({progresso.progressoPercentual}%)
          </p>
        </div>
      )}

      <h3>Etapas</h3>
      {obra.etapas && obra.etapas.length > 0 ? (
        <ul>
          {obra.etapas.map((etapa) => (
            <li key={etapa.id}>
              <strong>{etapa.nome}</strong> - {etapa.status} - Responsável: {etapa.responsavel}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma etapa cadastrada.</p>
      )}

      <h3>Adicionar Etapa</h3>
      <form onSubmit={handleSubmitEtapa}>
        <input
          type="text"
          name="nome"
          placeholder="Nome da Etapa"
          value={novaEtapa.nome}
          onChange={handleChangeEtapa}
          required
        />
        <input
          type="text"
          name="responsavel"
          placeholder="Responsável"
          value={novaEtapa.responsavel}
          onChange={handleChangeEtapa}
          required
        />
        <select name="status" value={novaEtapa.status} onChange={handleChangeEtapa}>
          <option value="PENDENTE">PENDENTE</option>
          <option value="EM_ANDAMENTO">EM_ANDAMENTO</option>
          <option value="CONCLUIDA">CONCLUIDA</option>
        </select>
        <button type="submit">Adicionar Etapa</button>
      </form>
    </div>
  );
};

export default ObraDetalhes;