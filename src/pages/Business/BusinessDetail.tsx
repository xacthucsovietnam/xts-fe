import { useGetBusinessDetailQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type BusinessDto = components['schemas']['BusinessDto'];

export default function BusinessDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: business, isLoading, error } = useGetBusinessDetailQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{t('business.detail.error')}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('business.detail.title')}</h2>
        <button
          onClick={() => navigate('/business/update')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('business.detail.edit')}
        </button>
      </div>
      {business && (
        <div className="bg-white p-6 rounded-lg shadow">
          <img
            src={business.logo || 'https://via.placeholder.com/150'}
            alt="Logo"
            className="w-24 h-24 mb-4"
          />
          <p className="mb-2"><strong>{t('business.detail.name')}:</strong> {business.name}</p>
          <p className="mb-2"><strong>{t('business.detail.taxCode')}:</strong> {business.taxCode || 'N/A'}</p>
          <p className="mb-2"><strong>{t('business.detail.phone')}:</strong> {business.phone || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}