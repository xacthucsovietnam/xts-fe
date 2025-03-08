import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetCurrentUserQuery, useUpdateProfileMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { components } from '../../api/types';
import { useEffect, useState } from 'react';

type CurrentUserDto = components['schemas']['CurrentUserDto'];

const updateProfileSchema = z.object({
  full_name: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email' }).optional().or(z.literal('')),
  phone: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  });
  const [updateProfile, { isLoading: isUpdateLoading }] = useUpdateProfileMutation();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      await updateProfile(formData).unwrap();
      navigate('/user/profile');
    } catch (error) {
      console.error('Update profile failed:', error);
    }
  };

  if (isUserLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('user.update.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <InputField
              label={t('user.update.full_name')}
              error={errors.full_name?.message}
              placeholder={t('user.update.full_name')}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              label={t('user.update.email')}
              error={errors.email?.message}
              placeholder={t('user.update.email')}
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputField
              label={t('user.update.phone')}
              error={errors.phone?.message}
              placeholder={t('user.update.phone')}
              {...field}
            />
          )}
        />
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.update.avatar')}</label>
          <FileUpload onChange={setAvatarFile} accept="image/*" />
        </div>
        <Button type="submit" variant="primary" disabled={isUpdateLoading}>
          {t('user.update.submit')}
        </Button>
      </form>
    </div>
  );
}