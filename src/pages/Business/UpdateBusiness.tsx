import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetBusinessDetailQuery, useUpdateBusinessMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';

const updateBusinessSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  taxCode: z.string().optional(),
  phone: z.string().optional(),
});

type UpdateBusinessFormData = z.infer<typeof updateBusinessSchema>;

export default function UpdateBusiness() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: business, isLoading: businessLoading } = useGetBusinessDetailQuery();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateBusinessFormData>({
    resolver: zodResolver(updateBusinessSchema),
    defaultValues: {
      name: '',
      taxCode: '',
      phone: '',
    },
  });
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (business) {
      reset({
        name: business.name || '',
        taxCode: business.taxCode || '',
        phone: business.phone || '',
      });
    }
  }, [business, reset]);

  const onSubmit = async (data: UpdateBusinessFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.taxCode) formData.append('taxCode', data.taxCode);
    if (data.phone) formData.append('phone', data.phone);
    if (logoFile) formData.append('logo', logoFile);

    try {
      await updateBusiness(formData).unwrap();
      navigate('/business/detail');
    } catch (error) {
      console.error('Update business failed:', error);
    }
  };

  if (businessLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('business.update.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.update.name')}</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('business.update.name')} />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.update.taxCode')}</label>
          <Controller
            name="taxCode"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('business.update.taxCode')} />
            )}
          />
          {errors.taxCode && <p className="text-red-500 text-sm mt-1">{errors.taxCode.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.update.phone')}</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('business.update.phone')} />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.update.logo')}</label>
          <FileUpload onChange={setLogoFile} accept="image/*" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {t('business.update.submit')}
        </button>
      </form>
    </div>
  );
}