import React from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { recommendations } from '../data';

export function RecommendedSubscriptions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <h2 className="text-xl font-semibold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div 
              className="flex items-center space-x-4 mb-4 cursor-pointer group"
              onClick={() => window.open(recommendation.url, '_blank')}
            >
              <img
                src={recommendation.logo}
                alt={recommendation.serviceName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{recommendation.serviceName}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-sm text-gray-500">${recommendation.price}/mo</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{recommendation.description}</p>
            <p className="text-sm text-blue-600 mb-4">{recommendation.reason}</p>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Subscription</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}