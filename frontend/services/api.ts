import { Customer, Product, Order } from '../types';

const API_BASE_URL = '/api';

// Generic API service class
class ApiService<T> {
  private baseUrl: string;

  constructor(endpoint: string) {
    this.baseUrl = `${API_BASE_URL}/${endpoint}`;
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  }

  async getById(id: string | number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch item: ${response.statusText}`);
    }
    return response.json();
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create item: ${response.statusText}`);
    }
    return response.json();
  }

  async update(id: string | number, item: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update item: ${response.statusText}`);
    }
    return response.json();
  }

  async patch(id: string | number, partialItem: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partialItem),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to patch item: ${response.statusText}`);
    }
    return response.json();
  }

  async delete(id: string | number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.statusText}`);
    }
  }
}

// Service instances for each entity
export const customerService = new ApiService<Customer>('customers');
export const productService = new ApiService<Product>('products');
export const orderService = new ApiService<Order>('orders');

// Convenience functions for backward compatibility
export const fetchNorthwindData = async () => {
  try {
    const [customers, products, orders] = await Promise.all([
      customerService.getAll(),
      productService.getAll(),
      orderService.getAll()
    ]);

    return { customers, products, orders };
  } catch (error) {
    console.error('Error fetching Northwind data:', error);
    throw error;
  }
};

// Customer-specific functions
export const createCustomer = (customer: Omit<Customer, 'id'>) => 
  customerService.create(customer);

export const updateCustomer = (customer: Customer) => 
  customerService.update(customer.id, customer);

export const patchCustomer = (id: string, partialCustomer: Partial<Customer>) =>
  customerService.patch(id, partialCustomer);

export const deleteCustomer = (id: string) => 
  customerService.delete(id);

// Product-specific functions
export const createProduct = (product: Omit<Product, 'id'>) => 
  productService.create(product);

export const updateProduct = (product: Product) => 
  productService.update(product.id, product);

export const patchProduct = (id: number, partialProduct: Partial<Product>) =>
  productService.patch(id, partialProduct);

export const deleteProduct = (id: number) => 
  productService.delete(id);

// Order-specific functions
export const createOrder = (order: Omit<Order, 'id'>) => 
  orderService.create(order);

export const updateOrder = (order: Order) => 
  orderService.update(order.id, order);

export const patchOrder = (id: number, partialOrder: Partial<Order>) =>
  orderService.patch(id, partialOrder);

export const deleteOrder = (id: number) => 
  orderService.delete(id);
