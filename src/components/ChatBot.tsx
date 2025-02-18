import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { spendingTrends, subscriptions } from '../data';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface LlamaResponse {
  response: {
    message: string;
    recommendations?: string[];
    analysis?: {
      trend: string;
      difference: number;
      averageSpending: number;
    };
  };
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hello! I can help you analyze your subscription trends and provide recommendations. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const LLAMA_API_ENDPOINT = 'YOUR_LLAMA_API_ENDPOINT';

  const generateContextData = () => {
    return {
      subscriptions,
      spendingTrends,
      currentTime: new Date().toISOString(),
    };
  };

  const callLlamaAPI = async (userInput: string): Promise<LlamaResponse> => {
    try {
      const response = await fetch(LLAMA_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required API keys or authentication headers
        },
        body: JSON.stringify({
          message: userInput,
          context: generateContextData(),
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling Llama API:', error);
      throw error;
    }
  };

  const formatLlamaResponse = (llamaResponse: LlamaResponse): string => {
    const { response } = llamaResponse;
    let formattedMessage = response.message;

    if (response.analysis) {
      formattedMessage += `\n\nAnalysis:\n`;
      formattedMessage += `- Trend: ${response.analysis.trend}\n`;
      formattedMessage += `- Difference: $${response.analysis.difference.toFixed(2)}\n`;
      formattedMessage += `- Average Spending: $${response.analysis.averageSpending.toFixed(2)}`;
    }

    if (response.recommendations?.length) {
      formattedMessage += `\n\nRecommendations:\n`;
      formattedMessage += response.recommendations.map(rec => `- ${rec}`).join('\n');
    }

    return formattedMessage;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const llamaResponse = await callLlamaAPI(userMessage);
      const formattedResponse = formatLlamaResponse(llamaResponse);

      setMessages(prev => [...prev, { type: 'bot', content: formattedResponse }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: 'I apologize, but I encountered an error processing your request. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Subscription Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className={`bg-blue-600 text-white p-2 rounded-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}