import { useGetCurrentUserQuery } from '../store/authApi';
import { components } from '../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type CurrentUserDto = components['schemas']['CurrentUserDto'];

export default function Dashboard() {
  const { t } = useTranslation();
  const { data: user, isLoading, error } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  });
  const navigate = useNavigate();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error || !user) {
    localStorage.removeItem('accessToken');
    navigate('/login');
    return null;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{t('dashboard.title')}</h1>
      <p className="mb-2">{t('login.welcome', { fullName: user.full_name })}</p>
      <p className="mb-2">{t('login.email', { email: user.email || 'N/A' })}</p>
      <p className="mb-2">{t('login.phone', { phone: user.phone || 'N/A' })}</p>
      <button
        onClick={() => {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        {t('login.logout')}
      </button>
    </div>
  );
}