import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { components } from '../api/types';

type CurrentUserDto = components['schemas']['CurrentUserDto'];
type AuthResponseDto = components['schemas']['AuthResponseDto'];
type LoginWithPasswordDto = components['schemas']['LoginWithPasswordDto'];
type BusinessDto = components['schemas']['BusinessDto'];
type ProductDto = components['schemas']['ProductDto'];
type StampTemplateDto = components['schemas']['StampTemplateDto'];
type StampGenerationDto = components['schemas']['StampGenerationDto'];
type ActivationDto = components['schemas']['ActivationDto'];
type RetailDto = components['schemas']['RetailDto'];
type DestructionDto = components['schemas']['DestructionDto'];

interface ApiResponse<T> {
  status: string;
  data: T;
  httpStatus: number;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseDto, LoginWithPasswordDto>({
      query: (credentials) => ({
        url: '/api/auth/login-with-password',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ApiResponse<AuthResponseDto>) => response.data,
    }),
    getCurrentUser: builder.query<CurrentUserDto, void>({
      query: () => '/api/me',
      transformResponse: (response: ApiResponse<CurrentUserDto>) => response.data,
    }),
    createProfile: builder.mutation<CurrentUserDto, FormData>({
      query: (formData) => ({
        url: '/api/user/create-profile',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<CurrentUserDto>) => response.data,
    }),
    updateProfile: builder.mutation<CurrentUserDto, FormData>({
      query: (formData) => ({
        url: '/api/user/update-profile',
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<CurrentUserDto>) => response.data,
    }),
    getBusinessList: builder.query<BusinessDto[], void>({
      query: () => '/api/business',
      transformResponse: (response: ApiResponse<BusinessDto[]>) => response.data,
    }),
    getBusinessDetail: builder.query<BusinessDto, void>({
      query: () => '/api/business/current',
      transformResponse: (response: ApiResponse<BusinessDto>) => response.data,
    }),
    createBusiness: builder.mutation<BusinessDto, FormData>({
      query: (formData) => ({
        url: '/api/business/create',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<BusinessDto>) => response.data,
    }),
    updateBusiness: builder.mutation<BusinessDto, FormData>({
      query: (formData) => ({
        url: '/api/business/update',
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<BusinessDto>) => response.data,
    }),
    getProductList: builder.query<PaginatedResponse<ProductDto>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `/api/product/list?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<PaginatedResponse<ProductDto>>) => response.data,
    }),
    getProductDetail: builder.query<ProductDto, string>({
      query: (id) => `/api/product/detail/${id}`,
      transformResponse: (response: ApiResponse<ProductDto>) => response.data,
    }),
    createProduct: builder.mutation<ProductDto, FormData>({
      query: (formData) => ({
        url: '/api/product/add',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<ProductDto>) => response.data,
    }),
    updateProduct: builder.mutation<ProductDto, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/api/product/edit/${id}`,
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<ProductDto>) => response.data,
    }),
    getStampTemplateList: builder.query<PaginatedResponse<StampTemplateDto>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `/api/stamp-template/list?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<PaginatedResponse<StampTemplateDto>>) => response.data,
    }),
    createStampTemplate: builder.mutation<StampTemplateDto, FormData>({
      query: (formData) => ({
        url: '/api/stamp-template/add',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<StampTemplateDto>) => response.data,
    }),
    createStamp: builder.mutation<StampGenerationDto, { quantity: number; stampTemplateId: string }>({
      query: (data) => ({
        url: '/api/stamp/generation/add',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: ApiResponse<StampGenerationDto>) => response.data,
    }),
    getStampList: builder.query<PaginatedResponse<StampGenerationDto>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `/api/stamp/generation/list?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<PaginatedResponse<StampGenerationDto>>) => response.data,
    }),
    createActivation: builder.mutation<ActivationDto, FormData>({
      query: (formData) => ({
        url: '/api/stamp/activation/add',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<ActivationDto>) => response.data,
    }),
    getActivationList: builder.query<PaginatedResponse<ActivationDto>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `/api/stamp/activation/list?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<PaginatedResponse<ActivationDto>>) => response.data,
    }),
    createRetail: builder.mutation<RetailDto, { bizStampIds: string[] }>({
      query: (data) => ({
        url: '/api/stamp/retail/add',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: ApiResponse<RetailDto>) => response.data,
    }),
    createDestruction: builder.mutation<DestructionDto, FormData>({
      query: (formData) => ({
        url: '/api/destruction/add',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ApiResponse<DestructionDto>) => response.data,
    }),
    getRetailList: builder.query<PaginatedResponse<RetailDto>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `/api/stamp/retail/list?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<PaginatedResponse<RetailDto>>) => response.data,
    }),
    getDestructionList: builder.query<PaginatedResponse<DestructionDto>, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `/api/destruction/list?page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: ApiResponse<PaginatedResponse<DestructionDto>>) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetBusinessListQuery,
  useGetBusinessDetailQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useGetProductListQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetStampTemplateListQuery,
  useCreateStampTemplateMutation,
  useCreateStampMutation,
  useGetStampListQuery,
  useCreateActivationMutation,
  useGetActivationListQuery,
  useCreateRetailMutation,
  useCreateDestructionMutation,
  useGetRetailListQuery,
  useGetDestructionListQuery,
} = authApi;