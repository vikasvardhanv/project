import React, { useState } from 'react';
import { DashboardOverview } from './components/DashboardOverview';
import { SubscriptionCard } from './components/SubscriptionCard';
import { SpendingChart } from './components/SpendingChart';
import { ChatBot } from './components/ChatBot';
import { RecommendedSubscriptions } from './components/RecommendedSubscriptions';
import { SpecialOffers } from './components/SpecialOffers';
import { subscriptions } from './data';
import { Layout, Bell, Plus, Filter } from 'lucide-react';

function App() {
  const [sortBy, setSortBy] = useState('date');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'name':
        return a.serviceName.localeCompare(b.serviceName);
      case 'date':
      default:
        return new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime();
    }
  });

  const handleSubscriptionSelect = (id: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id]
    );
  };

  const handleAddNew = () => {
    window.open('https://www.google.com/search?q=subscription+services', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Header Image */}
      <div className="w-full h-[300px] relative">
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&h=600&fit=crop" 
          alt="Header" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-16 pt-4">
              <div className="flex items-center">
                <Layout className="w-8 h-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">SubTracker</span>
              </div>
              <button className="p-2 text-white hover:text-gray-200 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="mt-16 text-white">
              <h1 className="text-4xl font-bold mb-2">Manage Your Subscriptions</h1>
              <p className="text-xl opacity-90">Track, optimize, and save on your digital services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardOverview />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main Subscriptions Section */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Active Subscriptions</h2>
              <div className="flex space-x-2">
                <select 
                  className="border rounded-lg px-3 py-2 text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="date">Sort by: Date</option>
                  <option value="price">Sort by: Price</option>
                  <option value="name">Sort by: Name</option>
                </select>
                <button 
                  onClick={handleAddNew}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedSubscriptions.map(subscription => (
                <SubscriptionCard 
                  key={subscription.id} 
                  subscription={subscription}
                  isSelected={selectedSubscriptions.includes(subscription.id)}
                  onSelect={() => handleSubscriptionSelect(subscription.id)}
                />
              ))}
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            <SpendingChart selectedIds={selectedSubscriptions} />
            <SpecialOffers />
          </div>
        </div>

        <RecommendedSubscriptions />
      </main>

      {/* Footer Image */}
      <div className="w-full h-[400px] relative mt-8">
        <img 
          src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=1920&h=800&fit=crop" 
          alt="Footer" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div>
                <h3 className="text-lg font-semibold mb-4">About SubTracker</h3>
                <p className="text-sm opacity-80">
                  Your all-in-one solution for managing digital subscriptions. Track, optimize, and save money effortlessly.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  <li>Dashboard</li>
                  <li>My Subscriptions</li>
                  <li>Special Offers</li>
                  <li>Support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-sm opacity-80">
                  Need help? Our support team is available 24/7 to assist you with any questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}

export default App;