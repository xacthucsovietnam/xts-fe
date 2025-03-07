import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from './locales/vi.json';
import enTranslation from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: viTranslation },
      en: { translation: enTranslation },
    },
    lng: 'vi', // Ngôn ngữ mặc định là Tiếng Việt
    fallbackLng: 'vi', // Ngôn ngữ dự phòng nếu không tìm thấy
    interpolation: {
      escapeValue: false, // Không escape giá trị (React đã xử lý)
    },
  });

export default i18n;