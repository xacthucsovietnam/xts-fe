import { useGetBusinessListQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type BusinessDto = components['schemas']['BusinessDto'];

export default function BusinessList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: businesses, isLoading, error } = useGetBusinessListQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{t('business.list.error')}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('business.list.title')}</h2>
        <button
          onClick={() => navigate('/business/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('business.list.create')}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses?.map((business) => (
          <div key={business.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <img
              src={business.logo || 'https://via.placeholder.com/150'}
              alt="Logo"
              className="w-16 h-16 mb-2"
            />
            <h3 className="text-lg font-semibold">{business.name}</h3>
            <p>{t('business.list.phone', { phone: business.phone || 'N/A' })}</p>
            <button
              onClick={() => navigate('/business/detail')}
              className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {t('business.list.viewDetail')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}