import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useGetBusinessDetailQuery, useUpdateBusinessMutation } from '../../store/authApi';
import { components } from '../../api/types';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

type DetailBusinessDto = components['schemas']['DetailBusinessDto'];
type UpdateBusinessFormData = {
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

export default function UpdateBusiness() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const businessId = query.get('id');
  const { data: businessData, isLoading: isFetching, error: fetchError } = useGetBusinessDetailQuery(undefined, {
    skip: !businessId,
  });
  const [updateBusiness, { isLoading: isUpdating, error: updateError }] = useUpdateBusinessMutation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateBusinessFormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [business, setBusiness] = useState<DetailBusinessDto | null>(null);

  useEffect(() => {
    if (businessData) {
      setBusiness(businessData);
      reset({
        name: businessData.name,
        shortName: businessData.shortName,
        fullName: businessData.fullName,
        code: businessData.code,
        phone: businessData.phone,
        email: businessData.email,
        taxCode: businessData.taxCode,
        addressFull: businessData.addressFull,
        provinceCode: businessData.provinceCode,
        districtCode: businessData.districtCode,
        wardCode: businessData.wardCode,
        website: businessData.website,
        youtube: businessData.youtube,
      });
    }
  }, [businessData, reset]);

  const onSubmit = async (data: UpdateBusinessFormData) => {
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
      await updateBusiness(formData).unwrap();
      navigate('/business/list');
    } catch (err) {
      setErrorMessage(t('business.update.error'));
    }
  };

  if (isFetching) return <LoadingSpinner />;
  if (fetchError || !business) return <p>{t('business.update.fetchError')}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('business.update.title')}</h2>
        <Button onClick={() => navigate('/business/list')} variant="secondary">
          {t('business.update.back')}
        </Button>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.name')}
            </label>
            <input
              type="text"
              {...register('name', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.shortName')}
            </label>
            <input
              type="text"
              {...register('shortName', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.shortName && <p className="text-red-500 text-sm">{errors.shortName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.fullName')}
            </label>
            <input
              type="text"
              {...register('fullName', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.code')}
            </label>
            <input
              type="text"
              {...register('code', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.phone')}
            </label>
            <input
              type="text"
              {...register('phone', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.email')}
            </label>
            <input
              type="email"
              {...register('email', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.taxCode')}
            </label>
            <input
              type="text"
              {...register('taxCode', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.taxCode && <p className="text-red-500 text-sm">{errors.taxCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.address')}
            </label>
            <input
              type="text"
              {...register('addressFull', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.addressFull && <p className="text-red-500 text-sm">{errors.addressFull.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.provinceCode')}
            </label>
            <input
              type="text"
              {...register('provinceCode', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.provinceCode && <p className="text-red-500 text-sm">{errors.provinceCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.districtCode')}
            </label>
            <input
              type="text"
              {...register('districtCode', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.districtCode && <p className="text-red-500 text-sm">{errors.districtCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.wardCode')}
            </label>
            <input
              type="text"
              {...register('wardCode', { required: t('business.update.required') })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.wardCode && <p className="text-red-500 text-sm">{errors.wardCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.website')}
            </label>
            <input
              type="text"
              {...register('website')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('business.update.youtube')}
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
            {t('business.update.logo')}
          </label>
          {business.logo && (
            <div className="mb-2">
              <img src={business.logo} alt="Current Logo" className="w-24 h-24 rounded-full" />
              <p className="text-sm text-gray-500">{t('business.update.currentLogo')}</p>
            </div>
          )}
          <input
            type="file"
            {...register('logo')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.update.slideImages')}
          </label>
          {business.slideImages && business.slideImages.length > 0 && (
            <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {business.slideImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          <input
            type="file"
            multiple
            {...register('slideImages')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.update.introImages')}
          </label>
          {business.introImages && business.introImages.length > 0 && (
            <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {business.introImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Intro ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          <input
            type="file"
            multiple
            {...register('introImages')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('business.update.registrationScans')}
          </label>
          {business.businessRegistrationScans && business.businessRegistrationScans.length > 0 && (
            <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {business.businessRegistrationScans.map((scan, index) => (
                <img
                  key={index}
                  src={scan}
                  alt={`Scan ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          <input
            type="file"
            multiple
            {...register('businessRegistrationScans')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button type="submit" variant="primary" disabled={isUpdating}>
            {t('business.update.submit')}
          </Button>
          <Button type="button" onClick={() => navigate('/business/list')} variant="secondary">
            {t('business.update.cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
}