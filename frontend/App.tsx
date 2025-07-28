import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { Customer, Product, Order } from './types';
import { 
  fetchNorthwindData, 
  createCustomer, updateCustomer, deleteCustomer,
  createProduct, updateProduct, deleteProduct,
  createOrder, updateOrder, deleteOrder
} from './data/mockData';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const location = useLocation();

  const loadData = useCallback(async () => {
    try {
      const northwindData = await fetchNorthwindData();
      setCustomers(northwindData.customers);
      setProducts(northwindData.products);
      setOrders(northwindData.orders);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const pathTitleMap: { [key: string]: string } = {
      '/': 'Dashboard',
      '/customers': 'Customers',
      '/products': 'Products',
      '/orders': 'Orders',
    };
    setPageTitle(pathTitleMap[location.pathname] ?? 'Dashboard');
  }, [location.pathname]);

  // --- CRUD Handlers ---
  // These handlers now make actual API calls to the Spring Boot backend

  // Customers
  const handleAddCustomer = useCallback(async (customer: Omit<Customer, 'id'>) => {
    try {
      const newCustomer = await createCustomer(customer);
      setCustomers(prev => [newCustomer, ...prev]);
    } catch (error) {
      console.error('Failed to add customer:', error);
      // Optionally show error message to user
    }
  }, []);

  const handleUpdateCustomer = useCallback(async (customer: Customer) => {
    try {
      const updatedCustomer = await updateCustomer(customer);
      setCustomers(prev => prev.map(c => c.id === customer.id ? updatedCustomer : c));
    } catch (error) {
      console.error('Failed to update customer:', error);
      // Optionally show error message to user
    }
  }, []);

  const handleDeleteCustomer = useCallback(async (id: string | number) => {
    try {
      await deleteCustomer(id as string);
      setCustomers(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete customer:', error);
      // Optionally show error message to user
    }
  }, []);
  
  // Products
  const handleAddProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [newProduct, ...prev]);
    } catch (error) {
      console.error('Failed to add product:', error);
      // Optionally show error message to user
    }
  }, []);

  const handleUpdateProduct = useCallback(async (product: Product) => {
    try {
      const updatedProduct = await updateProduct(product);
      setProducts(prev => prev.map(p => p.id === product.id ? updatedProduct : p));
    } catch (error) {
      console.error('Failed to update product:', error);
      // Optionally show error message to user
    }
  }, []);

  const handleDeleteProduct = useCallback(async (id: string | number) => {
    try {
      await deleteProduct(id as number);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      // Optionally show error message to user
    }
  }, []);

  // Orders
  const handleAddOrder = useCallback(async (order: Omit<Order, 'id'>) => {
    try {
      const newOrder = await createOrder(order);
      setOrders(prev => [newOrder, ...prev]);
    } catch (error) {
      console.error('Failed to add order:', error);
      // Optionally show error message to user
    }
  }, []);

  const handleUpdateOrder = useCallback(async (order: Order) => {
    try {
      const updatedOrder = await updateOrder(order);
      setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));
    } catch (error) {
      console.error('Failed to update order:', error);
      // Optionally show error message to user
    }
  }, []);

  const handleDeleteOrder = useCallback(async (id: string | number) => {
    try {
      await deleteOrder(id as number);
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (error) {
      console.error('Failed to delete order:', error);
      // Optionally show error message to user
    }
  }, []);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center bg-light-bg">
            <div className="text-2xl font-semibold text-dark-text">Loading Application...</div>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-light-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-bg">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={
                <CustomersPage 
                  customers={customers} 
                  onAdd={handleAddCustomer} 
                  onUpdate={handleUpdateCustomer} 
                  onDelete={handleDeleteCustomer}
                />} 
              />
              <Route path="/products" element={
                <ProductsPage 
                  products={products}
                  onAdd={handleAddProduct}
                  onUpdate={handleUpdateProduct}
                  onDelete={handleDeleteProduct}
                />} 
              />
              <Route path="/orders" element={
                <OrdersPage 
                  orders={orders}
                  onAdd={handleAddOrder}
                  onUpdate={handleUpdateOrder}
                  onDelete={handleDeleteOrder}
                />} 
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;