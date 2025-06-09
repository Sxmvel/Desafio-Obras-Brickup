import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Typography,
  message,
  Card,
} from 'antd';
import { addObra, fetchObras } from '../redux/obras/obrasSlice';

const { Title } = Typography;

const NovaObraForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      if (!values.dataInicio || !values.dataPrevisaoFim) {
        message.error('As datas são obrigatórias.');
        return;
      }

      const novaObra = {
        nome: values.nome,
        descricao: values.descricao,
        dataInicio: values.dataInicio.format('YYYY-MM-DD'),
        dataPrevisaoFim: values.dataPrevisaoFim.format('YYYY-MM-DD'),
      };

      await dispatch(addObra(novaObra)).unwrap();
      await dispatch(fetchObras());
      message.success('Obra cadastrada com sucesso!');
      form.resetFields();
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error);
      message.error('Erro ao cadastrar obra.');
    }
  };

  return (
    <Card style={{ marginBottom: 24, borderColor: '#fa8c16' }}>
      <Title level={3}>Cadastrar Nova Obra</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="nome"
          label="Nome da Obra"
          rules={[{ required: true, message: 'Por favor, insira o nome da obra' }]}
        >
          <Input placeholder="Nome da obra" />
        </Form.Item>

        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
        >
          <Input placeholder="Descrição da obra" />
        </Form.Item>

        <Form.Item
          name="dataInicio"
          label="Data de Início"
          rules={[{ required: true, message: 'Selecione a data de início' }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="dataPrevisaoFim"
          label="Data de Previsão de Fim"
          rules={[{ required: true, message: 'Selecione a data de previsão de fim' }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: '#fa8c16', borderColor: '#fa8c16' }}
          >
            Cadastrar Obra
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NovaObraForm;