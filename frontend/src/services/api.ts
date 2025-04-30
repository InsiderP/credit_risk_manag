import axios from 'axios';
import { Customer } from '../types';

const API_URL = 'http://localhost:3001/api';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

export const getCustomerById = async (customerId: string): Promise<Customer> => {
  const response = await axios.get(`${API_URL}/customers/${customerId}`);
  return response.data;
};

export const updateCustomerStatus = async (customerId: string, status: Customer['status']): Promise<void> => {
  await axios.put(`${API_URL}/customers/${customerId}/status`, { status });
}; 