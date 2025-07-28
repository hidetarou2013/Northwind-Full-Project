import React, { useState, useCallback, useEffect } from 'react';
import { Customer } from '../types';
import DataTable from '../components/DataTable';
import FormModal, { FormField } from '../components/modals/FormModal';
import ConfirmDialog from '../components/modals/ConfirmDialog';
import { createCustomer, updateCustomer, patchCustomer, deleteCustomer, customerService } from '../services/api';

const emptyCustomer: Omit<Customer, 'id'> = {
    companyName: '',
    contactName: '',
    contactTitle: '',
    city: '',
    country: '',
};

const formFields: FormField<Customer>[] = [
    { name: 'companyName', label: 'Company Name', type: 'text', required: true },
    { name: 'contactName', label: 'Contact Name', type: 'text', required: true },
    { name: 'contactTitle', label: 'Contact Title', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'country', label: 'Country', type: 'text' },
];

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Partial<Customer> | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await customerService.getAll();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to load customers:', error);
      }
    };

    loadCustomers();
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedCustomer(emptyCustomer);
    setIsFormOpen(true);
  }, []);
  
  const handleEdit = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setIsConfirmOpen(true);
  }, []);

  const handleSave = useCallback(async (customer: Customer) => {
    try {
      if (customer.id) {
        const updatedCustomer = await updateCustomer(customer);
        setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
      } else {
        const newCustomer = await createCustomer(customer);
        setCustomers(prev => [...prev, newCustomer]);
      }
      closeModals();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedCustomer?.id) {
      try {
        await deleteCustomer(selectedCustomer.id);
        setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
    closeModals();
  }, [selectedCustomer]);

  const closeModals = useCallback(() => {
    setIsFormOpen(false);
    setIsConfirmOpen(false);
    setSelectedCustomer(null);
  }, []);

  const columns = [
    { key: 'id' as keyof Customer, header: 'ID' },
    { key: 'companyName' as keyof Customer, header: 'Company Name' },
    { key: 'contactName' as keyof Customer, header: 'Contact Name' },
    { key: 'city' as keyof Customer, header: 'City' },
    { key: 'country' as keyof Customer, header: 'Country' },
  ];

  return (
    <>
      <DataTable 
        data={customers} 
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Customer"
      />
      <FormModal 
        isOpen={isFormOpen}
        onClose={closeModals}
        onSave={handleSave}
        entity={selectedCustomer}
        fields={formFields}
        title={selectedCustomer?.id ? 'Edit Customer' : 'Add New Customer'}
      />
      {selectedCustomer && (
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={closeModals}
          onConfirm={handleConfirmDelete}
          title="Delete Customer"
          message={<>Are you sure you want to delete <strong>{selectedCustomer.companyName}</strong>? This action cannot be undone.</>}
        />
      )}
    </>
  );
};

export default CustomersPage;