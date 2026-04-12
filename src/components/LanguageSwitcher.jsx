import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'ko', label: 'KR', flag: '🇰🇷', name: '한국어' },
    { code: 'en', label: 'EN', flag: '🇺🇸', name: 'English' },
    { code: 'ja', label: 'JP', flag: '🇯🇵', name: '日本語' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass hover:border-venus-gold/50 transition-all duration-300 group"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="text-[10px] tracking-widest font-bold text-white/70 group-hover:text-venus-gold">
          {currentLang.label}
        </span>
        <ChevronDown 
          size={12} 
          className={`text-white/30 group-hover:text-venus-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 mt-2 w-36 rounded-2xl border border-white/5 glass-dark overflow-hidden transition-all duration-300 z-[100] ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-all duration-300 hover:bg-white/5 ${
                i18n.language === lang.code ? 'bg-venus-gold/10 text-venus-gold' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wider font-bold">{lang.label}</span>
                <span className="text-[8px] text-white/30 uppercase">{lang.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
