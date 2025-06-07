import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

import ListaObras from './components/ObrasList';
import NovaObraForm from './components/NovaObraForm';
import ObraDetalhes from './components/ObraDetalhes';

const { Header, Content, Footer } = Layout;

function App() {
  const [reload, setReload] = useState(false);

  const atualizarLista = () => {
    setReload(!reload);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa8c16',
          borderRadius: 6,
        },
      }}
    >
      <Router>
        <Layout>
          <Header style={{ backgroundColor: '#fa8c16', color: 'white', fontSize: '20px' }}>
            Gerenciamento de Obras
          </Header>

          <Content style={{ padding: '24px' }}>
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
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Desenvolvido por Samuel Resende ©2025
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
