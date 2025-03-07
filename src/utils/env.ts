export const getEnv = () => {
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    appName: import.meta.env.VITE_APP_NAME || 'XTS Frontend',
  };
};
