import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchObras } from './redux/obras/obrasSlice';

import 'antd/dist/reset.css';

import Dashboard from './components/Dashboard';
import ListaObras from './components/ObrasList';
import NovaObraForm from './components/NovaObraForm';
import ObraDetalhes from './components/ObraDetalhes';

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch();

  const atualizarLista = () => {
    dispatch(fetchObras());
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
          <Header
            style={{
              backgroundColor: '#141414',
              color: 'white',
              fontSize: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 24px',
            }}
          >
            <span style={{ color: '#fa8c16' }}>Gerenciamento de Obras</span>
            <div>
              <Link to="/" style={{ color: '#fa8c16', marginRight: '20px' }}>
                Obras
              </Link>
              <Link to="/dashboard" style={{ color: '#fa8c16' }}>
                Dashboard
              </Link>
            </div>
          </Header>

          <Content style={{ padding: '24px' }}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <NovaObraForm onObraCriada={atualizarLista} />
                    <ListaObras />
                  </>
                }
              />
              <Route path="/obras/:id" element={<ObraDetalhes />} />
              <Route path="/dashboard" element={<Dashboard />} />
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