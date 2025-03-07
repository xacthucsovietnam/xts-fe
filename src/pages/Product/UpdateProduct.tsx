import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetProductDetailQuery, useUpdateProductMutation } from '../../store/authApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gtin: z.string().min(1, 'GTIN is required'),
  price: z.number().min(0, 'Price must be positive'),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

export default function UpdateProduct() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading: productLoading } = useGetProductDetailQuery(id!);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: '',
      gtin: '',
      price: 0,
    },
  });
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        gtin: product.gtin || '',
        price: product.price || 0,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: UpdateProductFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('gtin', data.gtin);
    formData.append('price', data.price.toString());

    try {
      await updateProduct({ id: id!, formData }).unwrap();
      navigate('/product/list');
    } catch (error) {
      console.error('Update product failed:', error);
    }
  };

  if (productLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{t('product.update.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">{t('product.update.name')}</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('product.update.name')} />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('product.update.gtin')}</label>
          <Controller
            name="gtin"
            control={control}
            render={({ field }) => (
              <input {...field} className="w-full p-2 border rounded" placeholder={t('product.update.gtin')} />
            )}
          />
          {errors.gtin && <p className="text-red-500 text-sm mt-1">{errors.gtin.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('product.update.price')}</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                className="w-full p-2 border rounded"
                placeholder={t('product.update.price')}
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
          {t('product.update.submit')}
        </button>
      </form>
    </div>
  );
}