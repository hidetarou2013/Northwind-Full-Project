import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchNorthwindData } from '../data/mockData';
import { getBusinessInsights } from '../services/geminiService';
import { Customer, Product, Order } from '../types';
import { UsersIcon, ProductsIcon, OrdersIcon, SparklesIcon } from './ui/Icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="bg-primary p-3 rounded-full">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div className="ml-4">
      <p className="text-sm text-light-text">{title}</p>
      <p className="text-2xl font-bold text-dark-text">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<{ customers: Customer[]; products: Product[]; orders: Order[] } | null>(null);
  const [insights, setInsights] = useState<string>('');
  const [isLoadingInsights, setIsLoadingInsights] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      const northwindData = await fetchNorthwindData();
      setData(northwindData);
    };
    loadData();
  }, []);

  const handleGenerateInsights = useCallback(async () => {
    if (!data) return;
    setIsLoadingInsights(true);
    setError('');
    setInsights('');
    try {
      const result = await getBusinessInsights(data);
      setInsights(result);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoadingInsights(false);
    }
  }, [data]);

  const chartData = data?.orders.reduce((acc, order) => {
    const month = new Date(order.orderDate).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.name === month);
    if (existingMonth) {
      existingMonth.orders += 1;
    } else {
      acc.push({ name: month, orders: 1 });
    }
    return acc;
  }, [] as { name: string; orders: number }[]);

  if (!data) {
    return <div className="text-center p-10">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Customers" value={data.customers.length} icon={UsersIcon} />
        <StatCard title="Total Products" value={data.products.length} icon={ProductsIcon} />
        <StatCard title="Total Orders" value={data.orders.length} icon={OrdersIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-dark-text">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#0D47A1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-dark-text">AI Business Insights</h3>
          <div className="flex-grow">
            {isLoadingInsights && <p className="text-light-text">Generating insights with Gemini...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {insights && (
              <div className="prose prose-sm max-w-none text-dark-text" dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br />').replace(/\* /g, '• ') }} />
            )}
            {!isLoadingInsights && !insights && <p className="text-light-text">Click the button to generate business insights using AI.</p>}
          </div>
          <button
            onClick={handleGenerateInsights}
            disabled={isLoadingInsights}
            className="mt-4 w-full bg-secondary text-primary-dark font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            {isLoadingInsights ? 'Thinking...' : 'Generate AI Insights'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;