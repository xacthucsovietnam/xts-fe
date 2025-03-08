import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProfileMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useState } from 'react';

const createProfileSchema = z.object({
  full_name: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email' }).optional().or(z.literal('')),
  phone: z.string().optional(),
});

type CreateProfileFormData = z.infer<typeof createProfileSchema>;

export default function CreateProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<CreateProfileFormData>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
    },
  });
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const onSubmit = async (data: CreateProfileFormData) => {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      await createProfile(formData).unwrap();
      navigate('/user/profile');
    } catch (error) {
      console.error('Create profile failed:', error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('user.create.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <InputField
              label={t('user.create.full_name')}
              error={errors.full_name?.message}
              placeholder={t('user.create.full_name')}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              label={t('user.create.email')}
              error={errors.email?.message}
              placeholder={t('user.create.email')}
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputField
              label={t('user.create.phone')}
              error={errors.phone?.message}
              placeholder={t('user.create.phone')}
              {...field}
            />
          )}
        />
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.create.avatar')}</label>
          <FileUpload onChange={setAvatarFile} accept="image/*" />
        </div>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {t('user.create.submit')}
        </Button>
      </form>
    </div>
  );
}