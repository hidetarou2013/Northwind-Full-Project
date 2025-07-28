import React, { useState, useCallback } from 'react';
import { Product } from '../types';
import DataTable from '../components/DataTable';
import FormModal, { FormField } from '../components/modals/FormModal';
import ConfirmDialog from '../components/modals/ConfirmDialog';

interface ProductsPageProps {
  products: Product[];
  onAdd: (product: Omit<Product, 'id'>) => void;
  onUpdate: (product: Product) => void;
  onDelete: (id: string | number) => void;
}

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    supplier: '',
    category: '',
    unitPrice: 0,
    unitsInStock: 0,
};

const formFields: FormField<Product>[] = [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'supplier', label: 'Supplier', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
    { name: 'unitsInStock', label: 'Units In Stock', type: 'number', required: true },
];

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAdd, onUpdate, onDelete }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Partial<Product> | null>(null);

  const handleAdd = useCallback(() => {
    setSelectedProduct(emptyProduct);
    setIsFormOpen(true);
  }, []);
  
  const handleEdit = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsConfirmOpen(true);
  }, []);

  const handleSave = useCallback((product: Product) => {
    if (product.id) {
        onUpdate(product);
    } else {
        onAdd(product);
    }
    closeModals();
  }, [onUpdate, onAdd]);

  const handleConfirmDelete = useCallback(() => {
    if (selectedProduct?.id) {
      onDelete(selectedProduct.id);
    }
    closeModals();
  }, [selectedProduct, onDelete]);

  const closeModals = useCallback(() => {
    setIsFormOpen(false);
    setIsConfirmOpen(false);
    setSelectedProduct(null);
  }, []);

  const columns = [
    { key: 'id' as keyof Product, header: 'ID' },
    { key: 'name' as keyof Product, header: 'Name' },
    { key: 'category' as keyof Product, header: 'Category' },
    { key: 'unitPrice' as keyof Product, header: 'Price', render: (p: Product) => `$${p.unitPrice.toFixed(2)}` },
    { key: 'unitsInStock' as keyof Product, header: 'Stock' },
  ];

  return (
    <>
      <DataTable 
        data={products} 
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Product"
      />
      <FormModal 
        isOpen={isFormOpen}
        onClose={closeModals}
        onSave={handleSave}
        entity={selectedProduct}
        fields={formFields}
        title={selectedProduct?.id ? 'Edit Product' : 'Add New Product'}
      />
      {selectedProduct && (
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={closeModals}
          onConfirm={handleConfirmDelete}
          title="Delete Product"
          message={<>Are you sure you want to delete <strong>{selectedProduct.name}</strong>? This action cannot be undone.</>}
        />
      )}
    </>
  );
};

export default ProductsPage;