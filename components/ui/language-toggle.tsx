'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();
  const [isGlitching, setIsGlitching] = useState(false);

  const handleLanguageChange = (newLang: 'id' | 'en') => {
    if (newLang === language) return;
    
    setIsGlitching(true);
    setTimeout(() => {
      setLanguage(newLang);
      setIsGlitching(false);
    }, 100);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Globe Icon */}
      <Globe className="h-4 w-4 text-gray-400" />
      
      {/* Language Toggle */}
      <div className="flex border border-black rounded-none overflow-hidden">
        <button
          onClick={() => handleLanguageChange('id')}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 ${
            language === 'id'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-50'
          } ${isGlitching ? 'animate-pulse' : ''}`}
        >
          ID
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest border-l border-black transition-colors duration-0 ${
            language === 'en'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-50'
          } ${isGlitching ? 'animate-pulse' : ''}`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
