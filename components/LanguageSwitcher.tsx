import React from 'react';
import { useLanguage } from '../services/i18n';
import { Icon } from './Icon';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`flex items-center gap-1 bg-[#EAE3C9]/70 p-1 rounded-full border border-[#D8D0B5] shadow-inner ${className}`} title={t.languageToggle}>
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#00A99D] text-white shadow-sm'
            : 'text-gray-600 hover:text-[#333333] hover:bg-white/50'
        }`}
        aria-label="Switch to English"
      >
        <span className="text-sm">🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        onClick={() => setLanguage('id')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
          language === 'id'
            ? 'bg-[#F45D48] text-white shadow-sm'
            : 'text-gray-600 hover:text-[#333333] hover:bg-white/50'
        }`}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        <span className="text-sm">🇮🇩</span>
        <span>ID</span>
      </button>
    </div>
  );
};
