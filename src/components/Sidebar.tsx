import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: t('dashboard.title'), path: '/dashboard' },
    { label: 'User Management', path: '/user/profile', subItems: [
      { label: 'Profile', path: '/user/profile' },
      { label: 'Create Profile', path: '/user/create-profile' },
      { label: 'Update Profile', path: '/user/update-profile' },
    ]},
    { label: 'Business Management', path: '/business/list', subItems: [
      { label: 'List', path: '/business/list' },
      { label: 'Detail', path: '/business/detail' },
      { label: 'Create', path: '/business/create' },
      { label: 'Update', path: '/business/update' },
    ]},
    { label: 'Product Management', path: '/product/list', subItems: [
      { label: 'List', path: '/product/list' },
      { label: 'Create', path: '/product/create' },
    ]},
    { label: 'Stamp Management', path: '/stamp/template/list', subItems: [
      { label: 'Template List', path: '/stamp/template/list' },
      { label: 'Create Template', path: '/stamp/template/create' },
      { label: 'Create Stamp', path: '/stamp/create' },
      { label: 'Stamp List', path: '/stamp/list' },
    ]},
    { label: 'Activation', path: '/activation/list', subItems: [
      { label: 'Create', path: '/activation/create' },
      { label: 'List', path: '/activation/list' },
    ]},
    { label: 'Retail & Destruction', path: '/retail/list', subItems: [
      { label: 'Create Retail', path: '/retail/create' },
      { label: 'Create Destruction', path: '/destruction/create' },
      { label: 'Retail List', path: '/retail/list' },
      { label: 'Destruction List', path: '/destruction/list' },
    ]},
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform md:transform-none transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">XTS</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </button>
              {item.subItems && (
                <div className="ml-4">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.label}
                      onClick={() => navigate(subItem.path)}
                      className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}