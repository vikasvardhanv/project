import React from 'react';
import { CreditCard, Calendar, TrendingUp, Bell } from 'lucide-react';
import { subscriptions, spendingTrends } from '../data';

export function DashboardOverview() {
  const totalActive = subscriptions.filter(sub => sub.status === 'active').length;
  const monthlySpending = subscriptions.reduce((acc, sub) => 
    sub.status === 'active' ? acc + sub.price : acc, 0
  );
  const nextPayment = [...subscriptions].sort((a, b) => 
    new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime()
  )[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Subscriptions</p>
            <p className="text-2xl font-bold mt-1">{totalActive}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Next Payment</p>
            <p className="text-2xl font-bold mt-1">${nextPayment.price}</p>
            <p className="text-sm text-gray-500">{nextPayment.serviceName}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Monthly Spending</p>
            <p className="text-2xl font-bold mt-1">${monthlySpending.toFixed(2)}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Alerts</p>
            <p className="text-2xl font-bold mt-1">2</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Bell className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}