import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard: React.FC = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Dashboard</h2>
    <p className="text-light-text">This is the dashboard page.</p>
  </div>
);

const Customers: React.FC = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Customers</h2>
    <p className="text-light-text">This is the customers page.</p>
  </div>
);

const Products: React.FC = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Products</h2>
    <p className="text-light-text">This is the products page.</p>
  </div>
);

const Orders: React.FC = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-dark-text mb-4">Orders</h2>
    <p className="text-light-text">This is the orders page.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-light-bg">
      {/* Simple sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-dark-text">Northwind</h1>
        </div>
        <nav className="mt-6">
          <a href="#/" className="block px-6 py-3 text-dark-text hover:bg-light-bg">Dashboard</a>
          <a href="#/customers" className="block px-6 py-3 text-dark-text hover:bg-light-bg">Customers</a>
          <a href="#/products" className="block px-6 py-3 text-dark-text hover:bg-light-bg">Products</a>
          <a href="#/orders" className="block px-6 py-3 text-dark-text hover:bg-light-bg">Orders</a>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-dark-text">Northwind Dashboard</h2>
        </header>
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
