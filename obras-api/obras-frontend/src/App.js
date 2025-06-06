import React, { useState } from 'react';
import ListaObras from './components/ObrasList';
import NovaObraForm from './components/NovaObraForm';
import ObraDetalhes from './components/ObraDetalhes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [reload, setReload] = useState(false);

  const atualizarLista = () => {
    setReload(!reload);
  };

  return (
    <Router>
      <div className="App">
        <h1>Gerenciamento de Obras</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <NovaObraForm onObraCriada={atualizarLista} />
                <ListaObras reload={reload} />
              </>
            }
          />
          <Route path="/obras/:id" element={<ObraDetalhes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;