import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCurrentUserQuery, useLoginMutation } from '../store/authApi';
import { components } from '../api/types';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginFormData } from '../utils/validation';
import { useTranslation } from 'react-i18next';

type CurrentUserDto = components['schemas']['CurrentUserDto'];

export default function Login() {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const { refetch: refetchUser } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      localStorage.setItem('accessToken', response.accessToken);
      await refetchUser();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">{t('login.title')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('login.identifier')}</label>
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border rounded"
                type="text"
                placeholder={t('login.identifier')}
              />
            )}
          />
          {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('login.password')}</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border rounded"
                type="password"
                placeholder={t('login.password')}
              />
            )}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loginLoading}
        >
          {t('login.submit')}
        </button>
      </form>
    </div>
  );
}