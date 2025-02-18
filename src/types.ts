export interface Subscription {
  id: string;
  serviceName: string;
  logo: string;
  planName: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  nextPaymentDate: string;
  status: 'active' | 'trial' | 'cancelled';
  url: string;
}

export interface SpecialOffer {
  id: string;
  serviceName: string;
  description: string;
  discount: string;
  validUntil: string;
  url: string;
  logo: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  serviceName: string;
}

export interface SpendingData {
  month: string;
  amount: number;
}