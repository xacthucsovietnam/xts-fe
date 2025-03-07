import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  accept?: string;
}

export default function FileUpload({ onChange, accept }: FileUploadProps) {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onChange(file);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {t('upload.chooseFile')}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <span>{fileName || t('upload.noFile')}</span>
    </div>
  );
}