import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObras, deleteObra } from '../redux/obras/obrasSlice';
import { Link } from 'react-router-dom';

const ObrasList = () => {
  const dispatch = useDispatch();
  const obras = useSelector((state) => state.obras.obras); // 👈 aqui era "lista", corrigi para "obras"
  const status = useSelector((state) => state.obras.status);
  const error = useSelector((state) => state.obras.error);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch, reload]);

  const handleDelete = async (id) => {
    await dispatch(deleteObra(id));
    setReload(!reload); // força recarregar a lista de obras
  };

  return (
    <div>
      <h2>Lista de Obras</h2>

      {status === 'loading' && <p>Carregando obras...</p>}
      {status === 'failed' && <p>Erro: {error}</p>}

      {obras && obras.length > 0 ? (
        <ul>
          {obras.map((obra) => (
            <li key={obra.id}>
              <strong>{obra.nome}</strong> - {obra.descricao}{' '}
              <Link to={`/obras/${obra.id}`}>Ver Detalhes</Link>{' '}
              <button onClick={() => handleDelete(obra.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        status === 'succeeded' && <p>Nenhuma obra encontrada.</p>
      )}
    </div>
  );
};

export default ObrasList;