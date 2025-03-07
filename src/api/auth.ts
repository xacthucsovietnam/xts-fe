import apiClient from './axios';
import { components } from './types';

type CurrentUserDto = components['schemas']['CurrentUserDto'];
type AuthResponseDto = components['schemas']['AuthResponseDto'];
type LoginWithPasswordDto = components['schemas']['LoginWithPasswordDto'];

export const getCurrentUser = async (): Promise<CurrentUserDto> => {
  const response = await apiClient.get('/api/me');
  return response.data.data;
};

export const loginWithPassword = async (
  credentials: LoginWithPasswordDto
): Promise<AuthResponseDto> => {
  const response = await apiClient.post(
    '/api/auth/login-with-password',
    credentials
  );
  return response.data.data;
};
