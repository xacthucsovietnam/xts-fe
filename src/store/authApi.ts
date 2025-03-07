import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { components } from '../api/types';

type CurrentUserDto = components['schemas']['CurrentUserDto'];
type AuthResponseDto = components['schemas']['AuthResponseDto'];
type LoginWithPasswordDto = components['schemas']['LoginWithPasswordDto'];

interface ApiResponse<T> {
  status: string;
  data: T;
  httpStatus: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // Sử dụng biến môi trường
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<AuthResponseDto, LoginWithPasswordDto>({
      query: credentials => ({
        url: '/api/auth/login-with-password',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ApiResponse<AuthResponseDto>) =>
        response.data,
    }),
    getCurrentUser: builder.query<CurrentUserDto, void>({
      query: () => '/api/me',
      transformResponse: (response: ApiResponse<CurrentUserDto>) =>
        response.data,
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
