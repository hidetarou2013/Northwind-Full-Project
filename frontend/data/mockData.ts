import { Customer, Product, Order } from '../types';

// API base URL
const API_BASE_URL = '/api';

// Simulate API fetch. In a real app, this would be removed and API calls
// would be made from the components or a dedicated API service layer.
export const fetchNorthwindData = async () => {
  try {
    // Fetch data from actual backend API
    const [customersResponse, productsResponse, ordersResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/customers`),
      fetch(`${API_BASE_URL}/products`),
      fetch(`${API_BASE_URL}/orders`)
    ]);

    if (!customersResponse.ok || !productsResponse.ok || !ordersResponse.ok) {
      throw new Error('Failed to fetch data from backend API');
    }

    const customers = await customersResponse.json();
    const products = await productsResponse.json();
    const orders = await ordersResponse.json();

    return {
      customers,
      products,
      orders,
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    // Fallback to mock data if API fails
    return {
      customers: mockCustomers,
      products: mockProducts,
      orders: mockOrders,
    };
  }
};

// CRUD operations for Customers
export const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new Error('Failed to create customer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new Error('Failed to update customer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

// CRUD operations for Products
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// CRUD operations for Orders
export const createOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (order: Order): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to update order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete order');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Mock data as fallback
export const mockCustomers: Customer[] = [
  { id: 'ALFKI', companyName: 'Alfreds Futterkiste', contactName: 'Maria Anders', contactTitle: 'Sales Representative', city: 'Berlin', country: 'Germany' },
  { id: 'ANATR', companyName: 'Ana Trujillo Emparedados y helados', contactName: 'Ana Trujillo', contactTitle: 'Owner', city: 'México D.F.', country: 'Mexico' },
  { id: 'ANTON', companyName: 'Antonio Moreno Taquería', contactName: 'Antonio Moreno', contactTitle: 'Owner', city: 'México D.F.', country: 'Mexico' },
  { id: 'BERGS', companyName: 'Berglunds snabbköp', contactName: 'Christina Berglund', contactTitle: 'Order Administrator', city: 'Luleå', country: 'Sweden' },
  { id: 'BLAUS', companyName: 'Blauer See Delikatessen', contactName: 'Hanna Moos', contactTitle: 'Sales Representative', city: 'Mannheim', country: 'Germany' },
];

export const mockProducts: Product[] = [
  { id: 1, name: 'Chai', supplier: 'Exotic Liquids', category: 'Beverages', unitPrice: 18.00, unitsInStock: 39 },
  { id: 2, name: 'Chang', supplier: 'Exotic Liquids', category: 'Beverages', unitPrice: 19.00, unitsInStock: 17 },
  { id: 3, name: 'Aniseed Syrup', supplier: 'Exotic Liquids', category: 'Condiments', unitPrice: 10.00, unitsInStock: 13 },
  { id: 4, name: 'Chef Anton\'s Cajun Seasoning', supplier: 'New Orleans Cajun Delights', category: 'Condiments', unitPrice: 22.00, unitsInStock: 53 },
  { id: 5, name: 'Chef Anton\'s Gumbo Mix', supplier: 'New Orleans Cajun Delights', category: 'Condiments', unitPrice: 21.35, unitsInStock: 0 },
];

export const mockOrders: Order[] = [
  { id: 10248, customerId: 'VINET', orderDate: '2024-07-04', requiredDate: '2024-08-01', shippedDate: '2024-07-16', shipVia: 'Federal Shipping', freight: 32.38, shipCity: 'Reims', shipCountry: 'France' },
  { id: 10249, customerId: 'TOMSP', orderDate: '2024-07-05', requiredDate: '2024-08-16', shippedDate: '2024-07-10', shipVia: 'Speedy Express', freight: 11.61, shipCity: 'Münster', shipCountry: 'Germany' },
  { id: 10250, customerId: 'HANAR', orderDate: '2024-07-08', requiredDate: '2024-08-05', shippedDate: '2024-07-12', shipVia: 'United Package', freight: 65.83, shipCity: 'Rio de Janeiro', shipCountry: 'Brazil' },
  { id: 10251, customerId: 'VICTE', orderDate: '2024-07-08', requiredDate: '2024-08-05', shippedDate: '2024-07-15', shipVia: 'Speedy Express', freight: 41.34, shipCity: 'Lyon', shipCountry: 'France' },
  { id: 10252, customerId: 'SUPRD', orderDate: '2024-07-09', requiredDate: '2024-08-06', shippedDate: '2024-07-11', shipVia: 'United Package', freight: 51.30, shipCity: 'Charleroi', shipCountry: 'Belgium' },
];