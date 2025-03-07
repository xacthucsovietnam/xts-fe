import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">XTS</h1>
      <LanguageSwitcher />
    </header>
  );
}