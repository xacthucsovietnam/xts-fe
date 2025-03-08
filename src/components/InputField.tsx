import { ControllerRenderProps } from 'react-hook-form';

interface InputFieldProps extends ControllerRenderProps {
  label: string;
  error?: string;
  placeholder?: string;
}

export default function InputField({ label, error, placeholder, ...field }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...field}
        className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}