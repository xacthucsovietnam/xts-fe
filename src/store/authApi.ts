import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { components } from '../api/types';

// Định nghĩa các type dữ liệu từ Swagger
type CurrentUserDto = components['schemas']['CurrentUserDto'];
type AuthResponseDto = components['schemas']['AuthResponseDto'];
type LoginWithPasswordDto = components['schemas']['LoginWithPasswordDto'];
type BusinessItemDto = components['schemas']['BusinessItemDto']; // Thay BusinessDto
type DetailBusinessDto = components['schemas']['DetailBusinessDto']; // Thêm cho /business/current
type CreateBusinessDto = components['schemas']['CreateBusinessDto'];
type UpdateBusinessDto = components['schemas']['UpdateBusinessDto'];
type ProductDetailDto = components['schemas']['ProductDetailDto']; // Thay ProductDto
type CreateProductDto = components['schemas']['CreateProductDto'];
type UpdateProductDto = components['schemas']['UpdateProductDto'];
type StampTemplateDetailDto = components['schemas']['StampTemplateDetailDto']; // Thay StampTemplateDto
type CreateStampTemplateDto = components['schemas']['CreateStampTemplateDto'];
type StampGenerationDto = components['schemas']['DetailGenerationDocDto']; // Thay đổi để khớp với response
type CreateGenerationDocDto = components['schemas']['CreateGenerationDocDto'];
type ActivationDto = components['schemas']['DetailActivationDocDto']; // Thay đổi để khớp với response
type CreateActivationDocDto = components['schemas']['CreateActivationDocDto'];
type RetailDto = components['schemas']['DetailRetailOrderDto']; // Thay đổi để khớp với response
type CreateRetailDto = components['schemas']['CreateRetailDto'];
type DestructionDto = components['schemas']['DetailDestructionDto']; // Thay đổi để khớp với response
type CreateDestructionDto = components['schemas']['CreateDestructionDto'];

// Định nghĩa response API (dựa trên ResponseType từ types.ts)
type ResponseType<T> = components['schemas']['ResponseType'] & {
  data?: T;
};

interface PaginatedResponse<T> {
  items: T[];
  pagination: components['schemas']['PaginationInfo'];
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
    // Authentication endpoints
    login: builder.mutation<AuthResponseDto, LoginWithPasswordDto>({
      query: (credentials) => ({
        url: '/auth/login-with-password',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ResponseType<AuthResponseDto>) => response.data!,
    }),
    getCurrentUser: builder.query<CurrentUserDto, void>({
      query: () => '/me',
      transformResponse: (response: ResponseType<CurrentUserDto>) => response.data!,
    }),

    // User endpoints
    createProfile: builder.mutation<CurrentUserDto, FormData>({
      query: (formData) => ({
        url: '/user/create-profile',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ResponseType<CurrentUserDto>) => response.data!,
    }),
    updateProfile: builder.mutation<CurrentUserDto, FormData>({
      query: (formData) => ({
        url: '/user/update-profile',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ResponseType<CurrentUserDto>) => response.data!,
    }),

    // Business endpoints
    getBusinessList: builder.query<BusinessItemDto[], void>({
      query: () => '/business',
      transformResponse: (response: ResponseType<BusinessItemDto[]>) => response.data!,
    }),
    getBusinessDetail: builder.query<DetailBusinessDto, void>({
      query: () => '/business/current',
      transformResponse: (response: ResponseType<DetailBusinessDto>) => response.data!,
    }),
    createBusiness: builder.mutation<DetailBusinessDto, FormData>({
      query: (formData) => ({
        url: '/business/create',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ResponseType<DetailBusinessDto>) => response.data!,
    }),
    updateBusiness: builder.mutation<DetailBusinessDto, FormData>({
      query: (formData) => ({
        url: '/business/update',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ResponseType<DetailBusinessDto>) => response.data!,
    }),

    // Product endpoints
    getProductList: builder.query<PaginatedResponse<ProductDetailDto>, { page: number; perpage: number }>({
      query: ({ page, perpage }) => `/api/product/list?page=${page}&perpage=${perpage}`,
      transformResponse: (response: ResponseType<PaginatedResponse<ProductDetailDto>>) => response.data!,
    }),
    getProductDetail: builder.query<ProductDetailDto, string>({
      query: (id) => `/api/product/detail/${id}`,
      transformResponse: (response: ResponseType<ProductDetailDto>) => response.data!,
    }),
    createProduct: builder.mutation<ProductDetailDto, CreateProductDto>({
      query: (body) => ({
        url: '/api/product/add',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<ProductDetailDto>) => response.data!,
    }),
    updateProduct: builder.mutation<ProductDetailDto, UpdateProductDto>({
      query: ({ id, ...body }) => ({
        url: `/api/product/edit/${id}`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<ProductDetailDto>) => response.data!,
    }),

    // Stamp endpoints
    getStampTemplateList: builder.query<PaginatedResponse<StampTemplateDetailDto>, { page: number; perpage: number }>({
      query: ({ page, perpage }) => `/api/stamp-template/list?page=${page}&perpage=${perpage}`,
      transformResponse: (response: ResponseType<PaginatedResponse<StampTemplateDetailDto>>) => response.data!,
    }),
    createStampTemplate: builder.mutation<StampTemplateDetailDto, CreateStampTemplateDto>({
      query: (body) => ({
        url: '/api/stamp-template/add',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<StampTemplateDetailDto>) => response.data!,
    }),
    createStamp: builder.mutation<StampGenerationDto, CreateGenerationDocDto>({
      query: (body) => ({
        url: '/api/stamp/generation/add',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<StampGenerationDto>) => response.data!,
    }),
    getStampList: builder.query<PaginatedResponse<StampGenerationDto>, { page: number; perpage: number }>({
      query: ({ page, perpage }) => `/api/stamp/generation/list?page=${page}&perpage=${perpage}`,
      transformResponse: (response: ResponseType<PaginatedResponse<StampGenerationDto>>) => response.data!,
    }),
    getStampDetail: builder.query<StampGenerationDto, string>({
      query: (id) => `/api/stamp/generation/detail/${id}`,
      transformResponse: (response: ResponseType<StampGenerationDto>) => response.data!,
    }),

    // Activation endpoints
    createActivation: builder.mutation<ActivationDto, CreateActivationDocDto>({
      query: (body) => ({
        url: '/api/stamp/activation/add',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<ActivationDto>) => response.data!,
    }),
    getActivationList: builder.query<PaginatedResponse<ActivationDto>, { page: number; perpage: number }>({
      query: ({ page, perpage }) => `/api/stamp/activation/list?page=${page}&perpage=${perpage}`,
      transformResponse: (response: ResponseType<PaginatedResponse<ActivationDto>>) => response.data!,
    }),
    getActivationDetail: builder.query<ActivationDto, string>({
      query: (id) => `/api/stamp/activation/detail/${id}`,
      transformResponse: (response: ResponseType<ActivationDto>) => response.data!,
    }),

    // Retail & Destruction endpoints
    createRetail: builder.mutation<RetailDto, CreateRetailDto>({
      query: (body) => ({
        url: '/api/stamp/retail/add',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<RetailDto>) => response.data!,
    }),
    createDestruction: builder.mutation<DestructionDto, CreateDestructionDto>({
      query: (body) => ({
        url: '/api/destruction/add',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ResponseType<DestructionDto>) => response.data!,
    }),
    getRetailList: builder.query<PaginatedResponse<RetailDto>, { page: number; perpage: number }>({
      query: ({ page, perpage }) => `/api/stamp/retail/list?page=${page}&perpage=${perpage}`,
      transformResponse: (response: ResponseType<PaginatedResponse<RetailDto>>) => response.data!,
    }),
    getDestructionList: builder.query<PaginatedResponse<DestructionDto>, { page: number; perpage: number }>({
      query: ({ page, perpage }) => `/api/destruction/list?page=${page}&perpage=${perpage}`,
      transformResponse: (response: ResponseType<PaginatedResponse<DestructionDto>>) => response.data!,
    }),
    getRetailDetail: builder.query<RetailDto, string>({
      query: (id) => `/api/stamp/retail/detail/${id}`,
      transformResponse: (response: ResponseType<RetailDto>) => response.data!,
    }),
    getDestructionDetail: builder.query<DestructionDto, string>({
      query: (id) => `/api/destruction/detail/${id}`,
      transformResponse: (response: ResponseType<DestructionDto>) => response.data!,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetBusinessListQuery,
  useGetBusinessDetailQuery, // Sử dụng hook này thay vì useGetCurrentBusinessQuery
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
  useGetStampDetailQuery,
  useCreateActivationMutation,
  useGetActivationListQuery,
  useGetActivationDetailQuery,
  useCreateRetailMutation,
  useCreateDestructionMutation,
  useGetRetailListQuery,
  useGetDestructionListQuery,
  useGetRetailDetailQuery,
  useGetDestructionDetailQuery,
} = authApi;