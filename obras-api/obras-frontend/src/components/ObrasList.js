import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObras, deleteObra } from '../redux/obras/obrasSlice';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Popconfirm,
  message,
  Empty,
  Spin,
} from 'antd';

const { Title, Paragraph } = Typography;

const ObrasList = () => {
  const dispatch = useDispatch();
  const obras = useSelector((state) => state.obras.obras);
  const status = useSelector((state) => state.obras.status);
  const error = useSelector((state) => state.obras.error);

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteObra(id));
      message.success('Obra deletada com sucesso!');
      dispatch(fetchObras()); // Recarrega a lista após deletar
    } catch {
      message.error('Erro ao deletar obra.');
    }
  };

  return (
    <div>
      <Title level={2} style={{ color: '#fa8c16' }}>
        Lista de Obras
      </Title>

      {status === 'loading' && (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <Spin size="large" tip="Carregando obras..." />
        </div>
      )}

      {status === 'failed' && <p style={{ color: 'red' }}>Erro: {error}</p>}

      {status === 'succeeded' && obras.length === 0 && <Empty description="Nenhuma obra cadastrada." />}

      {obras && obras.length > 0 && (
        <Row gutter={[16, 16]}>
          {obras.map((obra) => (
            <Col xs={24} sm={12} md={8} lg={6} key={obra.id}>
              <Card
                title={obra.nome}
                bordered={false}
                headStyle={{ backgroundColor: '#fa8c16', color: '#fff' }}
                style={{
                  borderColor: '#fa8c16',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                actions={[
                  <Link key="detalhes" to={`/obras/${obra.id}`}>
                    Ver Detalhes
                  </Link>,
                  <Popconfirm
                    key="deletar"
                    title="Tem certeza que deseja deletar esta obra?"
                    onConfirm={() => handleDelete(obra.id)}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button type="link" danger>
                      Deletar
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Paragraph>{obra.descricao}</Paragraph>
                <Paragraph>
                  <strong>Início:</strong> {obra.dataInicio}
                </Paragraph>
                <Paragraph>
                  <strong>Fim Previsto:</strong> {obra.dataPrevisaoFim}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ObrasList;
