import React, { useState, useEffect } from 'react';
import { ExternalLink, Timer } from 'lucide-react';
import { specialOffers } from '../data';

export function SpecialOffers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === specialOffers.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  const currentOffer = specialOffers[currentIndex];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Special Offers</h2>
      <div className="relative">
        <div
          key={currentOffer.id}
          className="border border-blue-100 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div 
            className="flex items-center space-x-4 mb-4 cursor-pointer group"
            onClick={() => window.open(currentOffer.url, '_blank')}
          >
            <img
              src={currentOffer.logo}
              alt={currentOffer.serviceName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{currentOffer.serviceName}</h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-sm font-medium text-blue-600">{currentOffer.discount} OFF</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{currentOffer.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Timer className="w-4 h-4 mr-2" />
            <span>Valid until {new Date(currentOffer.validUntil).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {specialOffers.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}