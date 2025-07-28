import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...');
        const [customersResponse, productsResponse, ordersResponse] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/products'),
          fetch('/api/orders')
        ]);

        console.log('API responses:', {
          customers: customersResponse.status,
          products: productsResponse.status,
          orders: ordersResponse.status
        });

        if (!customersResponse.ok || !productsResponse.ok || !ordersResponse.ok) {
          throw new Error('Failed to fetch data from API');
        }

        const customers = await customersResponse.json();
        const products = await productsResponse.json();
        const orders = await ordersResponse.json();

        console.log('Fetched data:', { customers, products, orders });

        setData({ customers, products, orders });
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
        // Fallback to mock data if API fails
        setData({
          customers: [
            { id: 'ALFKI', companyName: 'Alfreds Futterkiste', contactName: 'Maria Anders' },
            { id: 'ANATR', companyName: 'Ana Trujillo Emparedados y helados', contactName: 'Ana Trujillo' },
          ],
          products: [
            { id: 1, name: 'Chai', supplier: 'Exotic Liquids', unitPrice: 18.00 },
            { id: 2, name: 'Chang', supplier: 'Exotic Liquids', unitPrice: 19.00 },
          ],
          orders: [
            { id: 10248, customerId: 'ALFKI', orderDate: '2024-07-04', freight: 32.38 },
            { id: 10249, customerId: 'ANATR', orderDate: '2024-07-05', freight: 11.61 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-dark-text mb-4">Dashboard</h2>
        <p className="text-light-text">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">API Error (using fallback data):</p>
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark-text mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-primary">{data?.customers?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark-text mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-primary">{data?.products?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark-text mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-primary">{data?.orders?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark-text mb-4">Recent Customers</h3>
          <div className="space-y-2">
            {data?.customers?.slice(0, 5).map((customer: any) => (
              <div key={customer.id} className="flex justify-between">
                <span className="text-dark-text">{customer.companyName}</span>
                <span className="text-light-text">{customer.contactName}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-dark-text mb-4">Recent Products</h3>
          <div className="space-y-2">
            {data?.products?.slice(0, 5).map((product: any) => (
              <div key={product.id} className="flex justify-between">
                <span className="text-dark-text">{product.name}</span>
                <span className="text-light-text">${product.unitPrice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Customers: React.FC = () => (
  <div className="container mx-auto px-6 py-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Customers</h2>
    <p className="text-light-text">This is the customers page.</p>
  </div>
);

const Products: React.FC = () => (
  <div className="container mx-auto px-6 py-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Products</h2>
    <p className="text-light-text">This is the products page.</p>
  </div>
);

const Orders: React.FC = () => (
  <div className="container mx-auto px-6 py-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Orders</h2>
    <p className="text-light-text">This is the orders page.</p>
  </div>
);

const App: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap: { [key: string]: string } = {
      '/': 'Dashboard',
      '/customers': 'Customers',
      '/products': 'Products',
      '/orders': 'Orders',
    };
    setPageTitle(pathTitleMap[location.pathname] ?? 'Dashboard');
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-light-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-bg">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
