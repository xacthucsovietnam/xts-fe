import { Button, Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCurrentUserQuery, useLoginMutation } from '../store/authApi';
import { components } from '../api/types';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginFormData } from '../utils/validation';
import { Spin, message } from 'antd';
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
      message.success(t('messages.loginSuccess'));
      navigate('/dashboard');
    } catch (error) {
      message.error(t('messages.loginFailed', { message: (error as any)?.data?.message || 'Unknown error' }));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>{t('login.title')}</h1>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item
          label={t('login.identifier')}
          validateStatus={errors.identifier ? 'error' : ''}
          help={errors.identifier?.message}
        >
          <Controller
            name="identifier"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label={t('login.password')}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loginLoading}>
            {t('login.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}