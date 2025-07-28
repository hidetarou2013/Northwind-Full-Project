export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  city: string;
  country: string;
}

export interface Product {
  id: number;
  name: string;
  supplier: string;
  category: string;
  unitPrice: number;
  unitsInStock: number;
}

export interface Order {
  id: number;
  customerId: string;
  orderDate: string;
  requiredDate: string;
  shippedDate: string | null;
  shipVia: string;
  freight: number;
  shipCity: string;
  shipCountry: string;
}