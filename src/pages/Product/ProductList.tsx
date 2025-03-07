import { useState } from 'react';
import { useGetProductListQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/DataTable';

type ProductDto = components['schemas']['ProductDto'];

export default function ProductList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useGetProductListQuery({ page, pageSize });

  const columns = [
    { key: 'name', label: t('product.list.name') },
    { key: 'gtin', label: t('product.list.gtin') },
    { key: 'price', label: t('product.list.price') },
    {
      key: 'actions',
      label: t('product.list.actions'),
      render: (item: ProductDto) => (
        <button
          onClick={() => navigate(`/product/detail/${item.id}`)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('product.list.view')}
        </button>
      ),
    },
  ];

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{t('product.list.error')}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('product.list.title')}</h2>
        <button
          onClick={() => navigate('/product/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('product.list.create')}
        </button>
      </div>
      {data && (
        <DataTable
          data={data.items}
          columns={columns}
          total={data.total}
          page={data.page}
          pageSize={data.pageSize}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}