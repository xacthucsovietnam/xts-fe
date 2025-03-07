import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProfileMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';

const createProfileSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
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

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('user.create.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.create.full_name')}</label>
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('user.create.full_name')} />
            )}
          />
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.create.email')}</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('user.create.email')} />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.create.phone')}</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('user.create.phone')} />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('user.create.avatar')}</label>
          <FileUpload onChange={setAvatarFile} accept="image/*" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {t('user.create.submit')}
        </button>
      </form>
    </div>
  );
}