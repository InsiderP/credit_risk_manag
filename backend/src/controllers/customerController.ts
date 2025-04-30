import { Customer, RiskAssessment } from '../types';

// Sample data
let customers: Customer[] = [
  {
    customerId: "CUST1001",
    name: "Alice Johnson",
    monthlyIncome: 6200,
    monthlyExpenses: 3500,
    creditScore: 710,
    outstandingLoans: 15000,
    loanRepaymentHistory: [1, 0, 1, 1, 1, 1, 0, 1],
    accountBalance: 12500,
    status: "Review"
  },
  {
    customerId: "CUST1002",
    name: "Bob Smith",
    monthlyIncome: 4800,
    monthlyExpenses: 2800,
    creditScore: 640,
    outstandingLoans: 20000,
    loanRepaymentHistory: [1, 1, 1, 0, 0, 1, 0, 0],
    accountBalance: 7300,
    status: "Approved"
  }
];

// Calculate risk score
const calculateRiskScore = (customer: Customer): RiskAssessment => {
  // Credit score component (0-40 points)
  const creditScoreComponent = (customer.creditScore / 850) * 40;

  // Repayment history component (0-30 points)
  const repaymentRate = customer.loanRepaymentHistory.reduce((a, b) => a + b, 0) / customer.loanRepaymentHistory.length;
  const repaymentComponent = repaymentRate * 30;

  // Loan to income ratio component (0-30 points)
  const loanToIncomeRatio = customer.outstandingLoans / customer.monthlyIncome;
  const ratioComponent = Math.max(0, 30 - (loanToIncomeRatio * 10));

  const totalScore = creditScoreComponent + repaymentComponent + ratioComponent;
  
  let riskLevel: 'Low' | 'Medium' | 'High';
  if (totalScore >= 70) riskLevel = 'Low';
  else if (totalScore >= 40) riskLevel = 'Medium';
  else riskLevel = 'High';

  return {
    creditScore: creditScoreComponent,
    repaymentHistory: customer.loanRepaymentHistory,
    loanToIncomeRatio,
    totalScore,
    riskLevel
  };
};

export const getCustomers = () => {
  return customers.map(customer => ({
    ...customer,
    riskScore: calculateRiskScore(customer).totalScore
  }));
};

export const updateCustomerStatus = (customerId: string, status: Customer['status']) => {
  const customer = customers.find(c => c.customerId === customerId);
  if (customer) {
    customer.status = status;
    return true;
  }
  return false;
};

export const getCustomerById = (customerId: string) => {
  const customer = customers.find(c => c.customerId === customerId);
  if (customer) {
    return {
      ...customer,
      riskScore: calculateRiskScore(customer).totalScore
    };
  }
  return null;
}; 