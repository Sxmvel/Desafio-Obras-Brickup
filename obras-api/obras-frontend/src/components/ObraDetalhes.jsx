import React, { useEffect } from 'react';
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
} from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const ObraDetalhes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const obra = useSelector((state) => state.obras.obraSelecionada);
  const progresso = useSelector((state) => state.obras.progresso);
  const status = useSelector((state) => state.obras.status);

  const [form] = Form.useForm();

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

    axios.put(`http://localhost:8080/api/etapas/${etapaId}`, etapaAtualizada)
      .then(() => {
        dispatch(fetchObraDetalhada(id));
        dispatch(fetchProgressoObra(id));
        message.success('Status atualizado com sucesso!');
      })
      .catch(() => {
        message.error('Erro ao atualizar status.');
      });
  };

  const onFinish = (values) => {
    const novaEtapa = {
      nome: values.nome,
      responsavel: values.responsavel,
      dataInicio: values.dataInicio.format('YYYY-MM-DD'),
      dataFim: values.dataFim.format('YYYY-MM-DD'),
      status: values.status,
      obra: { id: Number(id) },
    };

    dispatch(addEtapa({ etapaData: novaEtapa, obraId: Number(id) }))
      .then(() => {
        dispatch(fetchObraDetalhada(id));
        dispatch(fetchProgressoObra(id));
        form.resetFields();
        message.success('Etapa adicionada com sucesso!');
      });
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
          </List.Item>
        )}
      />

      <Divider />
      <Title level={4}>Adicionar Nova Etapa</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="nome" label="Nome da Etapa" rules={[{ required: true }]}>
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item name="responsavel" label="Responsável" rules={[{ required: true }]}>
          <Input placeholder="Responsável" />
        </Form.Item>
        <Form.Item name="dataInicio" label="Data de Início" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="dataFim" label="Data de Fim" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" />
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
            Adicionar Etapa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ObraDetalhes;