import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="mb-5 flex justify-center space-x-3">
      <button
        onClick={() => changeLanguage('vi')}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Tiếng Việt
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        English
      </button>
    </div>
  );
}