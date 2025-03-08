import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCreateBusinessMutation } from '../../store/authApi';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useState } from 'react';

type CreateBusinessFormData = {
  name: string;
  shortName: string;
  fullName: string;
  code: string;
  phone: string;
  email: string;
  taxCode: string;
  addressFull: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  website?: string;
  youtube?: string;
  logo?: FileList;
  slideImages?: FileList;
  introImages?: FileList;
  businessRegistrationScans?: FileList;
};

export default function CreateBusiness() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [createBusiness, { isLoading, error }] = useCreateBusinessMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateBusinessFormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateBusinessFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('shortName', data.shortName);
    formData.append('fullName', data.fullName);
    formData.append('code', data.code);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('taxCode', data.taxCode);
    formData.append('addressFull', data.addressFull);
    formData.append('provinceCode', data.provinceCode);
    formData.append('districtCode', data.districtCode);
    formData.append('wardCode', data.wardCode);
    if (data.website) formData.append('website', data.website);
    if (data.youtube) formData.append('youtube', data.youtube);
    if (data.logo && data.logo[0]) formData.append('logo', data.logo[0]);
    if (data.slideImages) {
      Array.from(data.slideImages).forEach((file) => formData.append('slideImages', file));
    }
    if (data.introImages) {
      Array.from(data.introImages).forEach((file) => formData.append('introImages', file));
    }
    if (data.businessRegistrationScans) {
      Array.from(data.businessRegistrationScans).forEach((file) =>
        formData.append('businessRegistrationScans', file)
      );
    }

    try {
      await createBusiness(formData).unwrap();
      navigate('/business/list');
    } catch (err) {
      setErrorMessage(t('business.create.error'));
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('business.create.title')}</h2>
        <Button onClick={() => navigate('/business/list')} variant="secondary">
          {t('business.create.back')}
        </Button>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.name')}
            </label>
            <input
              type="text"
              {...register('name', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.shortName')}
            </label>
            <input
              type="text"
              {...register('shortName', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.shortName && <p className="text-red-500 text-sm">{errors.shortName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.fullName')}
            </label>
            <input
              type="text"
              {...register('fullName', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.code')}
            </label>
            <input
              type="text"
              {...register('code', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.phone')}
            </label>
            <input
              type="text"
              {...register('phone', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.email')}
            </label>
            <input
              type="email"
              {...register('email', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.taxCode')}
            </label>
            <input
              type="text"
              {...register('taxCode', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.taxCode && <p className="text-red-500 text-sm">{errors.taxCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.address')}
            </label>
            <input
              type="text"
              {...register('addressFull', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.addressFull && <p className="text-red-500 text-sm">{errors.addressFull.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.provinceCode')}
            </label>
            <input
              type="text"
              {...register('provinceCode', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.provinceCode && <p className="text-red-500 text-sm">{errors.provinceCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.districtCode')}
            </label>
            <input
              type="text"
              {...register('districtCode', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.districtCode && <p className="text-red-500 text-sm">{errors.districtCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.wardCode')}
            </label>
            <input
              type="text"
              {...register('wardCode', { required: t('business.create.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.wardCode && <p className="text-red-500 text-sm">{errors.wardCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.website')}
            </label>
            <input
              type="text"
              {...register('website')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.create.youtube')}
            </label>
            <input
              type="text"
              {...register('youtube')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.create.logo')}
          </label>
          <input
            type="file"
            {...register('logo')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.create.slideImages')}
          </label>
          <input
            type="file"
            multiple
            {...register('slideImages')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.create.introImages')}
          </label>
          <input
            type="file"
            multiple
            {...register('introImages')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.create.registrationScans')}
          </label>
          <input
            type="file"
            multiple
            {...register('businessRegistrationScans')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button type="submit" variant="primary">
            {t('business.create.submit')}
          </Button>
          <Button type="button" onClick={() => navigate('/business/list')} variant="secondary">
            {t('business.create.cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
}