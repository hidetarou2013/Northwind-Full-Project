import React, { useState, useCallback } from 'react';
import { Customer } from '../types';
import DataTable from '../components/DataTable';
import FormModal, { FormField } from '../components/modals/FormModal';
import ConfirmDialog from '../components/modals/ConfirmDialog';

interface CustomersPageProps {
  customers: Customer[];
  onAdd: (customer: Omit<Customer, 'id'>) => void;
  onUpdate: (customer: Customer) => void;
  onDelete: (id: string | number) => void;
}

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

const CustomersPage: React.FC<CustomersPageProps> = ({ customers, onAdd, onUpdate, onDelete }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Partial<Customer> | null>(null);

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

  const handleSave = useCallback((customer: Customer) => {
    if (customer.id) {
        onUpdate(customer);
    } else {
        onAdd(customer);
    }
    closeModals();
  }, [onUpdate, onAdd]);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCustomer?.id) {
      onDelete(selectedCustomer.id);
    }
    closeModals();
  }, [selectedCustomer, onDelete]);

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