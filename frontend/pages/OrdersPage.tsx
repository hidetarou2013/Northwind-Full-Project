import React, { useState, useCallback } from 'react';
import { Order } from '../types';
import DataTable from '../components/DataTable';
import FormModal, { FormField } from '../components/modals/FormModal';
import ConfirmDialog from '../components/modals/ConfirmDialog';

interface OrdersPageProps {
  orders: Order[];
  onAdd: (order: Omit<Order, 'id'>) => void;
  onUpdate: (order: Order) => void;
  onDelete: (id: string | number) => void;
}

const emptyOrder: Omit<Order, 'id'> = {
    customerId: '',
    orderDate: new Date().toISOString().split('T')[0],
    requiredDate: '',
    shippedDate: null,
    shipVia: '',
    freight: 0,
    shipCity: '',
    shipCountry: '',
};

const formFields: FormField<Order>[] = [
    { name: 'customerId', label: 'Customer ID', type: 'text', required: true },
    { name: 'orderDate', label: 'Order Date', type: 'date', required: true },
    { name: 'requiredDate', label: 'Required Date', type: 'date' },
    { name: 'shippedDate', label: 'Shipped Date', type: 'date' },
    { name: 'shipVia', label: 'Ship Via', type: 'text' },
    { name: 'freight', label: 'Freight', type: 'number' },
    { name: 'shipCity', label: 'Ship City', type: 'text' },
    { name: 'shipCountry', label: 'Ship Country', type: 'text' },
];

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onAdd, onUpdate, onDelete }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Partial<Order> | null>(null);

  const handleAdd = useCallback(() => {
    setSelectedOrder(emptyOrder);
    setIsFormOpen(true);
  }, []);
  
  const handleEdit = useCallback((order: Order) => {
    // Ensure dates are in yyyy-mm-dd format for the input[type=date]
    const formattedOrder = {
        ...order,
        orderDate: order.orderDate ? new Date(order.orderDate).toISOString().split('T')[0] : '',
        requiredDate: order.requiredDate ? new Date(order.requiredDate).toISOString().split('T')[0] : '',
        shippedDate: order.shippedDate ? new Date(order.shippedDate).toISOString().split('T')[0] : null,
    };
    setSelectedOrder(formattedOrder);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((order: Order) => {
    setSelectedOrder(order);
    setIsConfirmOpen(true);
  }, []);

  const handleSave = useCallback((order: Order) => {
    if (order.id) {
        onUpdate(order);
    } else {
        onAdd(order);
    }
    closeModals();
  }, [onUpdate, onAdd]);

  const handleConfirmDelete = useCallback(() => {
    if (selectedOrder?.id) {
      onDelete(selectedOrder.id);
    }
    closeModals();
  }, [selectedOrder, onDelete]);

  const closeModals = useCallback(() => {
    setIsFormOpen(false);
    setIsConfirmOpen(false);
    setSelectedOrder(null);
  }, []);

  const columns = [
    { key: 'id' as keyof Order, header: 'Order ID' },
    { key: 'customerId' as keyof Order, header: 'Customer ID' },
    { key: 'orderDate' as keyof Order, header: 'Order Date' },
    { key: 'shipCountry' as keyof Order, header: 'Ship Country' },
    { key: 'freight' as keyof Order, header: 'Freight', render: (o: Order) => `$${o.freight.toFixed(2)}` },
  ];

  return (
    <>
      <DataTable 
        data={orders} 
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Order"
      />
      <FormModal 
        isOpen={isFormOpen}
        onClose={closeModals}
        onSave={handleSave}
        entity={selectedOrder}
        fields={formFields}
        title={selectedOrder?.id ? `Edit Order #${selectedOrder.id}` : 'Add New Order'}
      />
      {selectedOrder && (
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={closeModals}
          onConfirm={handleConfirmDelete}
          title="Delete Order"
          message={<>Are you sure you want to delete Order ID <strong>{selectedOrder.id}</strong>? This action cannot be undone.</>}
        />
      )}
    </>
  );
};

export default OrdersPage;