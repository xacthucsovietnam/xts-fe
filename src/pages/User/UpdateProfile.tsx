import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetCurrentUserQuery, useUpdateProfileMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';

const updateProfileSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('accessToken'),
  });
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
    },
  });
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
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

  if (userLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('user.update.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.update.full_name')}</label>
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('user.update.full_name')} />
            )}
          />
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.update.email')}</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('user.update.email')} />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.update.phone')}</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('user.update.phone')} />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.update.avatar')}</label>
          <FileUpload onChange={setAvatarFile} accept="image/*" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {t('user.update.submit')}
        </button>
      </form>
    </div>
  );
}