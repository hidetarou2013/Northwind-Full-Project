import React, { useState, useMemo } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from './ui/Icons';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  addLabel?: string;
}

const DataTable = <T extends { id: string | number }>(
  { data, columns, onAdd, onEdit, onDelete, addLabel }: DataTableProps<T>
) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const hasActions = onEdit || onDelete;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center flex-wrap gap-4">
        <div className="w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search table"
            />
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            {addLabel || 'Add New'}
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-light-text uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <div className="flex justify-end items-center space-x-4">
                      {onEdit && (
                        <button onClick={() => onEdit(item)} className="text-primary hover:text-primary-dark" aria-label={`Edit ${item.id}`}>
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800" aria-label={`Delete ${item.id}`}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;