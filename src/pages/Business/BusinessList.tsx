import { useState } from 'react';
import { useGetBusinessListQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/DataTable';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

type BusinessItemDto = components['schemas']['BusinessItemDto'];

export default function BusinessList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useGetBusinessListQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error || !data) return <p>{t('business.list.error')}</p>;

  const columns = [
    { key: 'id', label: t('business.list.id') },
    { key: 'name', label: t('business.list.name'), render: (item: BusinessItemDto) => <span>{item.name}</span> },
    { key: 'address', label: t('business.list.address'), render: (item: BusinessItemDto) => <span>{item.addressFull || 'N/A'}</span> },
    {
      key: 'actions',
      label: t('business.list.actions'),
      render: (item: BusinessItemDto) => (
        <div className="space-x-2">
          <Button
            onClick={() => navigate(`/business/detail?id=${item.id}`)}
            variant="primary"
            size="small"
          >
            {t('business.list.view')}
          </Button>
          <Button
            onClick={() => navigate(`/business/update?id=${item.id}`)}
            variant="secondary"
            size="small"
          >
            {t('business.list.edit')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('business.list.title')}</h2>
        <Button onClick={() => navigate('/business/create')} variant="primary">
          {t('business.list.create')}
        </Button>
      </div>
      <DataTable
        data={data}
        columns={columns}
        total={data.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}