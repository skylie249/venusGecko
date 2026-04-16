import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ko', label: 'KR', flagUrl: 'https://flagcdn.com/w20/kr.png', name: '한국어' },
    { code: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w20/us.png', name: 'English' },
    { code: 'ja', label: 'JP', flagUrl: 'https://flagcdn.com/w20/jp.png', name: '日本語' },
    { code: 'zh', label: 'CN', flagUrl: 'https://flagcdn.com/w20/cn.png', name: '中文' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 rounded-full border-white/10 glass bg-transparent hover:bg-white/5 hover:border-venus-gold/50 hover:text-venus-gold transition-all duration-300 h-8 px-3"
        >
          <img src={currentLang.flagUrl} alt={currentLang.label} className="w-4 h-auto object-cover rounded-sm opacity-90 transition-opacity" />
          <span className="text-[10px] tracking-widest font-bold text-white/70">
            {currentLang.label}
          </span>
          <ChevronDown size={12} className="text-white/30 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-36 rounded-2xl glass-dark border-white/5 z-[100] p-2 bg-black/60 backdrop-blur-xl">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-3 px-2 py-2 cursor-pointer transition-all duration-300 rounded-xl outline-none ${
              i18n.language === lang.code ? 'bg-venus-gold/10 text-venus-gold hover:bg-venus-gold/20 hover:text-venus-gold' : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <img src={lang.flagUrl} alt={lang.label} className="w-5 h-auto object-cover rounded-sm" />
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider font-bold leading-tight">{lang.label}</span>
              <span className="text-[8px] text-white/30 uppercase leading-tight">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
