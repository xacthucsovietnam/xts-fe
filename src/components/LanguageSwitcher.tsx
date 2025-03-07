import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Button onClick={() => changeLanguage('vi')}>Tiếng Việt</Button>
      <Button onClick={() => changeLanguage('en')} style={{ marginLeft: '10px' }}>
        English
      </Button>
    </div>
  );
}