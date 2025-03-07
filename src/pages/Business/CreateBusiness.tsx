import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateBusinessMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../components/FileUpload';

const createBusinessSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  taxCode: z.string().optional(),
  phone: z.string().optional(),
});

type CreateBusinessFormData = z.infer<typeof createBusinessSchema>;

export default function CreateBusiness() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<CreateBusinessFormData>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      name: '',
      taxCode: '',
      phone: '',
    },
  });
  const [createBusiness, { isLoading }] = useCreateBusinessMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const onSubmit = async (data: CreateBusinessFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.taxCode) formData.append('taxCode', data.taxCode);
    if (data.phone) formData.append('phone', data.phone);
    if (logoFile) formData.append('logo', logoFile);

    try {
      await createBusiness(formData).unwrap();
      navigate('/business/list');
    } catch (error) {
      console.error('Create business failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('business.create.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.create.name')}</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('business.create.name')} />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.create.taxCode')}</label>
          <Controller
            name="taxCode"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('business.create.taxCode')} />
            )}
          />
          {errors.taxCode && <p className="text-red-500 text-sm mt-1">{errors.taxCode.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.create.phone')}</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('business.create.phone')} />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('business.create.logo')}</label>
          <FileUpload onChange={setLogoFile} accept="image/*" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {t('business.create.submit')}
        </button>
      </form>
    </div>
  );
}