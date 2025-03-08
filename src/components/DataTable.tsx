import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DataTableProps<T> {
  data: T[];
  columns: { key: string; label: string; render?: (item: T) => JSX.Element }[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function DataTable<T>({ data, columns, total, page, pageSize, onPageChange }: DataTableProps<T>) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 border-b text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border-b">
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <p>
          {t('pagination.showing', { count: data.length, total })}
        </p>
        <div className="space-x-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            {t('pagination.previous')}
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            {t('pagination.next')}
          </button>
        </div>
      </div>
    </div>
  );
}