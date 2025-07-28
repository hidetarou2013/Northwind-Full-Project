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
            { id: 'ALFKI', companyName: 'Alfreds Futterkiste', contactName: 'Maria Anders', city: 'Berlin', country: 'Germany' },
            { id: 'ANATR', companyName: 'Ana Trujillo Emparedados y helados', contactName: 'Ana Trujillo', city: 'México D.F.', country: 'Mexico' },
            { id: 'ANTON', companyName: 'Antonio Moreno Taquería', contactName: 'Antonio Moreno', city: 'México D.F.', country: 'Mexico' },
            { id: 'BERGS', companyName: 'Berglunds snabbköp', contactName: 'Christina Berglund', city: 'Luleå', country: 'Sweden' },
            { id: 'BLAUS', companyName: 'Blauer See Delikatessen', contactName: 'Hanna Moos', city: 'Mannheim', country: 'Germany' },
          ],
          products: [
            { id: 1, name: 'Chai', supplier: 'Exotic Liquids', category: 'Beverages', unitPrice: 18.00, unitsInStock: 39 },
            { id: 2, name: 'Chang', supplier: 'Exotic Liquids', category: 'Beverages', unitPrice: 19.00, unitsInStock: 17 },
            { id: 3, name: 'Aniseed Syrup', supplier: 'Exotic Liquids', category: 'Condiments', unitPrice: 10.00, unitsInStock: 13 },
            { id: 4, name: 'Chef Anton\'s Cajun Seasoning', supplier: 'New Orleans Cajun Delights', category: 'Condiments', unitPrice: 22.00, unitsInStock: 53 },
            { id: 5, name: 'Chef Anton\'s Gumbo Mix', supplier: 'New Orleans Cajun Delights', category: 'Condiments', unitPrice: 21.35, unitsInStock: 0 },
          ],
          orders: [
            { id: 10248, customerId: 'ALFKI', orderDate: '2024-07-04', freight: 32.38, shipCity: 'Berlin', shipCountry: 'Germany' },
            { id: 10249, customerId: 'ANATR', orderDate: '2024-07-05', freight: 11.61, shipCity: 'México D.F.', shipCountry: 'Mexico' },
            { id: 10250, customerId: 'ANTON', orderDate: '2024-07-08', freight: 65.83, shipCity: 'México D.F.', shipCountry: 'Mexico' },
            { id: 10251, customerId: 'BERGS', orderDate: '2024-07-08', freight: 41.34, shipCity: 'Luleå', shipCountry: 'Sweden' },
            { id: 10252, customerId: 'BLAUS', orderDate: '2024-07-09', freight: 51.30, shipCity: 'Mannheim', shipCountry: 'Germany' },
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-lg text-light-text">Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {error && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">API Connection Issue</p>
              <p className="mt-1 text-sm text-yellow-700">Using fallback data. {error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-4.325" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{data?.customers?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7v10l8 4m0-14L4 7" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{data?.products?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{data?.orders?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Customers</h3>
            <p className="text-sm text-gray-500 mt-1">Latest customer registrations</p>
          </div>
          <div className="divide-y divide-gray-100">
            {data?.customers?.slice(0, 5).map((customer: any, index: number) => (
              <div key={customer.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {customer.companyName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {customer.contactName} • {customer.city}, {customer.country}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {customer.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50">
            <a href="#/customers" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-150">
              View all customers →
            </a>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
            <p className="text-sm text-gray-500 mt-1">Product inventory overview</p>
          </div>
          <div className="divide-y divide-gray-100">
            {data?.products?.slice(0, 5).map((product: any, index: number) => (
              <div key={product.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {product.category} • {product.supplier}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium text-gray-900">${product.unitPrice}</p>
                    <p className={`text-xs ${product.unitsInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.unitsInStock} in stock
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50">
            <a href="#/products" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-150">
              View all products →
            </a>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Latest order transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data?.orders?.slice(0, 5).map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.freight.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.shipCity}, {order.shipCountry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50">
          <a href="#/orders" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-150">
            View all orders →
          </a>
        </div>
      </div>
    </div>
  );
};

const Customers: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Customers Management</h2>
      <p className="text-gray-500 mb-6">Manage your customer database and relationships</p>
      <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-4.325" />
        </svg>
        Coming Soon
      </div>
    </div>
  </div>
);

const Products: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Products Management</h2>
      <p className="text-gray-500 mb-6">Manage your product catalog and inventory</p>
      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7v10l8 4m0-14L4 7" />
        </svg>
        Coming Soon
      </div>
    </div>
  </div>
);

const Orders: React.FC = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders Management</h2>
      <p className="text-gray-500 mb-6">Track and manage customer orders</p>
      <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-lg">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Coming Soon
      </div>
    </div>
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
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
