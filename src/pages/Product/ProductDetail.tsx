import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../../store/authApi';
import { components } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ProductDto = components['schemas']['ProductDto'];

export default function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductDetailQuery(id!);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{t('product.detail.error')}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('product.detail.title')}</h2>
        <button
          onClick={() => navigate(`/product/edit/${id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t('product.detail.edit')}
        </button>
      </div>
      {product && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-2"><strong>{t('product.detail.name')}:</strong> {product.name}</p>
          <p className="mb-2"><strong>{t('product.detail.gtin')}:</strong> {product.gtin}</p>
          <p className="mb-2"><strong>{t('product.detail.price')}:</strong> {product.price}</p>
        </div>
      )}
    </div>
  );
}