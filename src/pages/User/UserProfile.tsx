import { useGetCurrentUserQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type CurrentUserDto = components['schemas']['CurrentUserDto'];

export default function UserProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error || !user) {
    localStorage.removeItem('accessToken');
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('user.profile.title')}</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user.avatar || 'https://via.placeholder.com/100'}
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{user.full_name}</h3>
            <p>{t('user.profile.email', { email: user.email || 'N/A' })}</p>
            <p>{t('user.profile.phone', { phone: user.phone || 'N/A' })}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/user/update-profile')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('user.profile.edit')}
        </button>
      </div>
    </div>
  );
}