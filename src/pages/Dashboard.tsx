import { Button, Spin, message } from 'antd';
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

  if (isLoading) return <Spin />;
  if (error || !user) {
    localStorage.removeItem('accessToken');
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('login.welcome', { fullName: user.full_name })}</p>
      <p>{t('login.email', { email: user.email || 'N/A' })}</p>
      <p>{t('login.phone', { phone: user.phone || 'N/A' })}</p>
      <Button
        onClick={() => {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }}
      >
        {t('login.logout')}
      </Button>
    </div>
  );
}