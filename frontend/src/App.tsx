import React from 'react';
import { Layout, Typography } from 'antd';
import Dashboard from './components/Dashboard';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <Title level={3} style={{ margin: '16px 0' }}>
          Credit Risk Analytics Dashboard
        </Title>
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <Dashboard />
      </Content>
    </Layout>
  );
};

export default App;
