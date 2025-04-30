import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Progress, Select } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCustomers, updateCustomerStatus } from '../services/api';
import { Customer } from '../types';

const { Option } = Select;

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (customerId: string, status: Customer['status']) => {
    try {
      await updateCustomerStatus(customerId, status);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return '#52c41a';
    if (score >= 40) return '#faad14';
    return '#f5222d';
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Monthly Income',
      dataIndex: 'monthlyIncome',
      key: 'monthlyIncome',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Credit Score',
      dataIndex: 'creditScore',
      key: 'creditScore',
    },
    {
      title: 'Risk Score',
      dataIndex: 'riskScore',
      key: 'riskScore',
      render: (score: number) => (
        <Progress
          percent={score}
          strokeColor={getRiskColor(score)}
          format={(percent) => `${Math.round(percent || 0)}%`}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Customer['status'], record: Customer) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.customerId, value)}
        >
          <Option value="Review">Review</Option>
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      ),
    },
  ];

  const incomeExpenseData = customers.map(customer => ({
    name: customer.name,
    income: customer.monthlyIncome,
    expenses: customer.monthlyExpenses,
  }));

  const riskDistributionData = [
    {
      name: 'Low Risk',
      value: customers.filter(c => (c.riskScore || 0) >= 70).length,
    },
    {
      name: 'Medium Risk',
      value: customers.filter(c => (c.riskScore || 0) >= 40 && (c.riskScore || 0) < 70).length,
    },
    {
      name: 'High Risk',
      value: customers.filter(c => (c.riskScore || 0) < 40).length,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Income vs Expenses">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incomeExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#1890ff" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#ff4d4f" name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Risk Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Number of Customers" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Customer Overview">
            <Table
              dataSource={customers}
              columns={columns}
              loading={loading}
              rowKey="customerId"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 