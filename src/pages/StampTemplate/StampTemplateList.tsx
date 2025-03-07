import { useState } from 'react';
import { useGetStampTemplateListQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/DataTable';

type StampTemplateDto = components['schemas']['StampTemplateDto'];

export default function StampTemplateList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useGetStampTemplateListQuery({ page, pageSize });

  const columns = [
    { key: 'name', label: t('stamp.template.list.name') },
    { key: 'size', label: t('stamp.template.list.size') },
    { key: 'status', label: t('stamp.template.list.status') },
  ];

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{t('stamp.template.list.error')}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('stamp.template.list.title')}</h2>
        <button
          onClick={() => navigate('/stamp/template/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('stamp.template.list.create')}
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