import React from 'react';
import { MoreVertical, Pause, XCircle, ExternalLink, Check } from 'lucide-react';
import { Subscription } from '../types';

interface SubscriptionCardProps {
  subscription: Subscription;
  isSelected: boolean;
  onSelect: () => void;
}

export function SubscriptionCard({ subscription, isSelected, onSelect }: SubscriptionCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
    trial: 'bg-blue-100 text-blue-800',
  };

  const handleServiceClick = () => {
    window.open(subscription.url, '_blank');
  };

  const handleAction = (action: 'pause' | 'cancel') => {
    window.open(subscription.url, '_blank');
  };

  return (
    <div 
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="flex items-center justify-between mb-3">
        <div 
          className="flex items-center space-x-3 group"
          onClick={(e) => {
            e.stopPropagation();
            handleServiceClick();
          }}
        >
          <img
            src={subscription.logo}
            alt={subscription.serviceName}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{subscription.serviceName}</h3>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-sm text-gray-500">{subscription.planName}</p>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500">Monthly Cost</p>
          <p className="font-medium">
            ${subscription.billingCycle === 'yearly' 
              ? (subscription.price / 12).toFixed(2) 
              : subscription.price}/mo
          </p>
        </div>
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[subscription.status]}`}>
            {subscription.status}
          </span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAction('pause');
          }}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Pause className="w-3 h-3" />
          <span>Pause</span>
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAction('cancel');
          }}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
        >
          <XCircle className="w-3 h-3" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}