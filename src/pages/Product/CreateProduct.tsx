import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProductMutation } from '../../store/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gtin: z.string().min(1, 'GTIN is required'),
  price: z.number().min(0, 'Price must be positive'),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export default function CreateProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      gtin: '',
      price: 0,
    },
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (data: CreateProductFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('gtin', data.gtin);
    formData.append('price', data.price.toString());

    try {
      await createProduct(formData).unwrap();
      navigate('/product/list');
    } catch (error) {
      console.error('Create product failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('product.create.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">{t('product.create.name')}</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('product.create.name')} />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('product.create.gtin')}</label>
          <Controller
            name="gtin"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('product.create.gtin')} />
            )}
          />
          {errors.gtin && <p className="text-red-500 text-sm mt-1">{errors.gtin.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('product.create.price')}</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                className="w-full p-2 border rounded"
                placeholder={t('product.create.price')}
              />
            )}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {t('product.create.submit')}
        </button>
      </form>
    </div>
  );
}