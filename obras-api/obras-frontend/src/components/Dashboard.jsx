import React, { useEffect } from 'react';
import { Table, Typography, Card, Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObras } from '../redux/obras/obrasSlice';
import { CheckCircleOutlined, ProjectOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const obras = useSelector((state) => state.obras.obras);
  const status = useSelector((state) => state.obras.status);

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch]);

  const data = obras.map((obra) => {
    const totalEtapas = obra.etapas?.length || 0;
    const concluidas = obra.etapas?.filter((etapa) => etapa.status === 'CONCLUIDA').length || 0;

    return {
      key: obra.id,
      nome: obra.nome,
      totalEtapas,
      concluidas,
    };
  });

  const columns = [
    {
      title: '🏗️ Obra',
      dataIndex: 'nome',
      key: 'nome',
      render: (nome) => (
        <Space>
          <ProjectOutlined style={{ color: '#fa8c16' }} />
          {nome}
        </Space>
      ),
    },
    {
      title: '📋 Total de Etapas',
      dataIndex: 'totalEtapas',
      key: 'totalEtapas',
      render: (etapas) => <Tag color="blue">{etapas}</Tag>,
    },
    {
      title: '✅ Etapas Concluídas',
      dataIndex: 'concluidas',
      key: 'concluidas',
      render: (concluidas) => (
        <Tag icon={<CheckCircleOutlined />} color="green">
          {concluidas}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={<Title level={3} style={{ margin: 0 }}>📊 Dashboard de Obras</Title>}
        bordered={false}
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 12,
          backgroundColor: '#fff',
        }}
      >
        {status === 'loading' ? (
          <p>Carregando obras...</p>
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
      </Card>
    </div>
  );
};

export default Dashboard;