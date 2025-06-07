import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, Typography, message, Card } from 'antd';

const { Title } = Typography;

const NovaObraForm = ({ onObraCriada }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const novaObra = {
        nome: values.nome,
        descricao: values.descricao,
        dataInicio: values.dataInicio.format('YYYY-MM-DD'),
        dataPrevisaoFim: values.dataPrevisaoFim.format('YYYY-MM-DD'),
      };

      await axios.post('http://localhost:8080/api/obras', novaObra);
      message.success('Obra cadastrada com sucesso!');
      form.resetFields();
      onObraCriada();
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error);
      message.error('Erro ao cadastrar obra.');
    }
  };

  return (
    <Card style={{ marginBottom: 24, borderColor: '#fa8c16' }}>
      <Title level={3}>Cadastrar Nova Obra</Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
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
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#fa8c16', borderColor: '#fa8c16' }}>
            Cadastrar Obra
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NovaObraForm;