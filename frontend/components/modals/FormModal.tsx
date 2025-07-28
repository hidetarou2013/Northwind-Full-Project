import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon } from '../ui/Icons';

export interface FormField<T> {
  name: keyof T;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  required?: boolean;
}

// A helper type to handle partial data for new entities
type EntityData<T> = Partial<T> & { id?: string | number | null };


interface FormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entity: T) => void;
  entity: EntityData<T> | null;
  fields: FormField<T>[];
  title: string;
}

const FormModal = <T extends { id?: string | number | null }>({
  isOpen,
  onClose,
  onSave,
  entity,
  fields,
  title,
}: FormModalProps<T>) => {
  const [formData, setFormData] = useState<EntityData<T> | null>(null);

  useEffect(() => {
    // When the modal opens or the entity changes, update the form data
    if (isOpen && entity) {
      setFormData({ ...entity });
    }
  }, [entity, isOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => {
        if (!prev) return null;
        const newValue = type === 'number' ? (value === '' ? '' : parseFloat(value)) : value;
        return { ...prev, [name]: newValue };
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData as T);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" aria-modal="true" role="dialog" aria-labelledby="form-modal-title">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 id="form-modal-title" className="text-lg font-medium text-dark-text">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <div className="p-6 space-y-4">
            {fields.map(field => (
              <div key={String(field.name)}>
                <label htmlFor={String(field.name)} className="block text-sm font-medium text-light-text">{field.label}</label>
                {field.type === 'textarea' ? (
                   <textarea
                    id={String(field.name)}
                    name={String(field.name)}
                    value={String(formData[field.name] ?? '')}
                    onChange={handleChange}
                    required={field.required}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary sm:text-sm"
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={String(field.name)}
                    name={String(field.name)}
                    value={String(formData[field.name] ?? '')}
                    onChange={handleChange}
                    required={field.required}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary sm:text-sm"
                    step={field.type === 'number' ? '0.01' : undefined}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50 rounded-b-lg">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;