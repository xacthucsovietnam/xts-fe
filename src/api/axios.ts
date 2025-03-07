import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://dev.xacthucso.com.vn',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý token (nếu cần)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Ví dụ: lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;