import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchObraDetalhada,
  fetchProgressoObra,
  addEtapa,
} from '../redux/obras/obrasSlice';
import {
  Typography,
  Progress,
  List,
  Select,
  Form,
  Input,
  DatePicker,
  Button,
  Divider,
  message,
  Popconfirm,
} from 'antd';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const ObraDetalhes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const obra = useSelector((state) => state.obras.obraSelecionada);
  const progresso = useSelector((state) => state.obras.progresso);
  const status = useSelector((state) => state.obras.status);

  const [form] = Form.useForm();
  const [editando, setEditando] = useState(false);
  const [etapaEditandoId, setEtapaEditandoId] = useState(null);

  useEffect(() => {
    dispatch(fetchObraDetalhada(id));
    dispatch(fetchProgressoObra(id));
  }, [dispatch, id]);

  const handleStatusChange = (etapaId, novoStatus) => {
    const etapa = obra.etapas.find((e) => e.id === etapaId);
    if (!etapa) return;

    const etapaAtualizada = {
      ...etapa,
      status: novoStatus,
      obra: { id: obra.id },
    };

    axios
      .put(`http://localhost:8080/api/etapas/${etapaId}`, etapaAtualizada)
      .then(() => {
        dispatch(fetchObraDetalhada(id));
        dispatch(fetchProgressoObra(id));
        message.success('Status atualizado com sucesso!');
      })
      .catch(() => {
        message.error('Erro ao atualizar status.');
      });
  };

  const handleEditarEtapa = (etapa) => {
    setEditando(true);
    setEtapaEditandoId(etapa.id);
    form.setFieldsValue({
      nome: etapa.nome,
      responsavel: etapa.responsavel,
      dataInicio: etapa.dataInicio ? dayjs(etapa.dataInicio) : null,
      dataFim: etapa.dataFim ? dayjs(etapa.dataFim) : null,
      status: etapa.status,
    });
  };

  const handleExcluirEtapa = (etapaId) => {
    axios
      .delete(`http://localhost:8080/api/etapas/${etapaId}`)
      .then(() => {
        message.success('Etapa excluída com sucesso!');
        dispatch(fetchObraDetalhada(id));
        dispatch(fetchProgressoObra(id));
      })
      .catch(() => {
        message.error('Erro ao excluir etapa.');
      });
  };

  const onFinish = (values) => {
    const etapa = {
      nome: values.nome,
      responsavel: values.responsavel,
      dataInicio: values.dataInicio.format('YYYY-MM-DD'),
      dataFim: values.dataFim.format('YYYY-MM-DD'),
      status: values.status,
      obra: { id: Number(id) },
    };

    if (editando) {
      axios
        .put(`http://localhost:8080/api/etapas/${etapaEditandoId}`, etapa)
        .then(() => {
          message.success('Etapa atualizada com sucesso!');
          dispatch(fetchObraDetalhada(id));
          dispatch(fetchProgressoObra(id));
          form.resetFields();
          setEditando(false);
          setEtapaEditandoId(null);
        })
        .catch(() => {
          message.error('Erro ao atualizar etapa.');
        });
    } else {
      dispatch(addEtapa({ etapaData: etapa, obraId: Number(id) })).then(() => {
        dispatch(fetchObraDetalhada(id));
        dispatch(fetchProgressoObra(id));
        form.resetFields();
        message.success('Etapa adicionada com sucesso!');
      });
    }
  };

  if (status === 'loading') return <p>Carregando...</p>;
  if (!obra) return <p>Obra não encontrada.</p>;

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Detalhes da Obra</Title>
      <Paragraph><strong>Nome:</strong> {obra.nome}</Paragraph>
      <Paragraph><strong>Descrição:</strong> {obra.descricao}</Paragraph>
      <Paragraph><strong>Data de Início:</strong> {obra.dataInicio}</Paragraph>
      <Paragraph><strong>Previsão de Fim:</strong> {obra.dataPrevisaoFim}</Paragraph>

      {progresso && (
        <>
          <Divider />
          <Title level={4}>Progresso</Title>
          <Progress percent={progresso.percentualConcluido.toFixed(1)} strokeColor="#fa8c16" />
          <Paragraph>
            {progresso.etapasConcluidas} de {progresso.totalEtapas} etapas concluídas
          </Paragraph>
        </>
      )}

      <Divider />
      <Title level={4}>Etapas</Title>
      <List
        bordered
        dataSource={obra.etapas}
        renderItem={(etapa) => (
          <List.Item>
            <div style={{ flex: 1 }}>
              <strong>{etapa.nome}</strong> — Responsável: {etapa.responsavel}
              <Select
                value={etapa.status}
                onChange={(value) => handleStatusChange(etapa.id, value)}
                style={{ width: 160, marginLeft: '1rem' }}
              >
                <Option value="PENDENTE">PENDENTE</Option>
                <Option value="EM_ANDAMENTO">EM ANDAMENTO</Option>
                <Option value="CONCLUIDA">CONCLUÍDA</Option>
              </Select>

              <Button type="link" onClick={() => handleEditarEtapa(etapa)} style={{ marginLeft: 8 }}>
                Editar
              </Button>

              <Popconfirm
                title="Tem certeza que deseja excluir esta etapa?"
                onConfirm={() => handleExcluirEtapa(etapa.id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button type="link" danger>
                  Excluir
                </Button>
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />

      <Divider />
      <Title level={4}>{editando ? 'Editar Etapa' : 'Adicionar Nova Etapa'}</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="nome" label="Nome da Etapa" rules={[{ required: true }]}>
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item name="responsavel" label="Responsável" rules={[{ required: true }]}>
          <Input placeholder="Responsável" />
        </Form.Item>
        <Form.Item name="dataInicio" label="Data de Início" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="dataFim" label="Data de Fim" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="status" label="Status" initialValue="PENDENTE" rules={[{ required: true }]}>
          <Select>
            <Option value="PENDENTE">PENDENTE</Option>
            <Option value="EM_ANDAMENTO">EM ANDAMENTO</Option>
            <Option value="CONCLUIDA">CONCLUÍDA</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editando ? 'Atualizar Etapa' : 'Adicionar Etapa'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ObraDetalhes;