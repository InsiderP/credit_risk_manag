export interface Customer {
  customerId: string;
  name: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  outstandingLoans: number;
  loanRepaymentHistory: number[];
  accountBalance: number;
  status: 'Review' | 'Approved' | 'Rejected';
  riskScore?: number;
}

export interface RiskAssessment {
  creditScore: number;
  repaymentHistory: number[];
  loanToIncomeRatio: number;
  totalScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ChartData {
  name: string;
  value: number;
} 