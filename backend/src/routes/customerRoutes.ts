import express, { RequestHandler } from 'express';
import { getCustomers, updateCustomerStatus, getCustomerById } from '../controllers/customerController';

const router = express.Router();

// Get all customers
router.get('/', ((req, res) => {
  const customers = getCustomers();
  res.json(customers);
}) as RequestHandler);

// Get customer by ID
router.get('/:customerId', ((req, res) => {
  const customer = getCustomerById(req.params.customerId);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
}) as RequestHandler);

// Update customer status
router.put('/:customerId/status', ((req, res) => {
  const { status } = req.body;
  if (!status || !['Review', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const success = updateCustomerStatus(req.params.customerId, status);
  if (success) {
    res.json({ message: 'Status updated successfully' });
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
}) as RequestHandler);

export default router; 