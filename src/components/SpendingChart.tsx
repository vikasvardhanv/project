import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { subscriptions } from '../data';

interface Props {
  selectedIds: string[];
}

export function SpendingChart({ selectedIds }: Props) {
  const currentMonthlySpend = useMemo(() => {
    const subsToCalculate = selectedIds.length > 0 
      ? subscriptions.filter(sub => selectedIds.includes(sub.id))
      : subscriptions;

    return subsToCalculate.reduce((total, sub) => {
      if (sub.status === 'active') {
        if (sub.billingCycle === 'monthly') {
          return total + sub.price;
        } else if (sub.billingCycle === 'yearly') {
          return total + (sub.price / 12);
        }
      }
      return total;
    }, 0);
  }, [selectedIds]);

  // Calculate different pricing tiers based on current spend
  const pricingData = useMemo(() => {
    const monthlyBase = currentMonthlySpend;
    return [
      {
        period: 'Monthly',
        current: monthlyBase,
        withDiscount: monthlyBase,
        potential: monthlyBase
      },
      {
        period: '3 Months',
        current: monthlyBase,
        withDiscount: monthlyBase * 0.9,
        potential: monthlyBase * 0.85
      },
      {
        period: '6 Months',
        current: monthlyBase,
        withDiscount: monthlyBase * 0.85,
        potential: monthlyBase * 0.75
      },
      {
        period: 'Yearly',
        current: monthlyBase,
        withDiscount: monthlyBase * 0.75,
        potential: monthlyBase * 0.65
      }
    ];
  }, [currentMonthlySpend]);

  const annualSavings = useMemo(() => {
    const monthlyTotal = currentMonthlySpend * 12;
    const yearlyTotal = currentMonthlySpend * 0.65 * 12;
    return Math.round((monthlyTotal - yearlyTotal) * 100) / 100;
  }, [currentMonthlySpend]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Subscription Savings</h2>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pricingData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="period" />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#2563eb" 
              strokeWidth={2}
              name="Current Price"
            />
            <Line 
              type="monotone" 
              dataKey="withDiscount" 
              stroke="#7c3aed" 
              strokeWidth={2}
              name="With Discount"
            />
            <Line 
              type="monotone" 
              dataKey="potential" 
              stroke="#059669" 
              strokeWidth={2}
              name="Potential Savings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Tip: Switching to annual billing could save you ${annualSavings} per year on your {selectedIds.length > 0 ? 'selected' : 'current'} subscriptions. Review your plans to maximize savings.
        </p>
      </div>
    </div>
  );
}