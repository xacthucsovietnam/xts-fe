import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBusinessDetailQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';

type DetailBusinessDto = components['schemas']['DetailBusinessDto'];

export default function BusinessDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const businessId = query.get('id');
  const { data, isLoading, error } = useGetBusinessDetailQuery(undefined, {
    skip: !businessId,
  });
  const [business, setBusiness] = useState<DetailBusinessDto | null>(null);

  useEffect(() => {
    if (data) {
      setBusiness(data); // Sử dụng trực tiếp data thay vì data.data
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (error || !business) return <p>{t('business.detail.error')}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('business.detail.title')}</h2>
        <Button onClick={() => navigate('/business/list')} variant="secondary">
          {t('business.detail.back')}
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          {business.logo && (
            <img src={business.logo} alt="Logo" className="w-24 h-24 rounded-full mr-4" />
          )}
          <div>
            <h3 className="text-xl font-semibold">{business.name}</h3>
            <p className="text-gray-600">{business.shortName}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>{t('business.detail.code')}:</strong> {business.code}
            </p>
            <p>
              <strong>{t('business.detail.fullName')}:</strong> {business.fullName}
            </p>
            <p>
              <strong>{t('business.detail.address')}:</strong> {business.addressFull || 'N/A'}
            </p>
            <p>
              <strong>{t('business.detail.phone')}:</strong> {business.phone || 'N/A'}
            </p>
            <p>
              <strong>{t('business.detail.email')}:</strong> {business.email || 'N/A'}
            </p>
          </div>
          <div>
            <p>
              <strong>{t('business.detail.taxCode')}:</strong> {business.taxCode || 'N/A'}
            </p>
            <p>
              <strong>{t('business.detail.website')}:</strong> {business.website || 'N/A'}
            </p>
            <p>
              <strong>{t('business.detail.youtube')}:</strong> {business.youtube || 'N/A'}
            </p>
            <p>
              <strong>{t('business.detail.createdBy')}:</strong> {business.createdBy || 'N/A'}
            </p>
          </div>
        </div>
        {business.slideImages && business.slideImages.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">{t('business.detail.slideImages')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {business.slideImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
        {business.introImages && business.introImages.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">{t('business.detail.introImages')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {business.introImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Intro ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
        {business.businessRegistrationScans && business.businessRegistrationScans.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">{t('business.detail.registrationScans')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {business.businessRegistrationScans.map((scan, index) => (
                <img
                  key={index}
                  src={scan}
                  alt={`Scan ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}