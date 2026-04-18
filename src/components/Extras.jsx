import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, MessageCircle, List, Users, Plus, X } from 'lucide-react';

export const FloatingCTA = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isGlobal = i18n.language === 'en' || i18n.language === 'ja' || i18n.language === 'zh';
  const feedleUrl = isGlobal
    ? "https://air.feedle.me/profile/dd285e94-18e9-4444-a40f-bc34075d6d06"
    : "https://www.feedle.me/profile/dd285e94-18e9-4444-a40f-bc34075d6d06";

  const toggleDial = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-4 md:bottom-10 md:right-10 flex flex-col items-end gap-4 md:gap-6 z-[1001]">

      {/* Speed Dial Menu Items */}
      <div className={`flex flex-col items-end gap-4 md:gap-6 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>
        <a
          href={feedleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-500 cursor-pointer"
        >
          <List className="w-6 h-6 md:w-8 md:h-8" />
          <span className="absolute right-16 md:right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
            AVAILABLE LIST
          </span>
        </a>

        <a
          href="https://open.kakao.com/o/gZhaGrwg"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 md:w-16 md:h-16 bg-[#FEE500] text-[#3c1e1e] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(254,229,0,0.3)] hover:scale-110 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#FEE500] rounded-full animate-ping opacity-20 group-hover:opacity-40" />
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
          <span className="absolute right-16 md:right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
            KAKAO TALK
          </span>
        </a>

        <a
          href="https://www.instagram.com/venus_gecko"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,39,67,0.3)] hover:scale-110 transition-all duration-500"
        >
          <Instagram className="w-6 h-6 md:w-8 md:h-8" />
          <span className="absolute right-16 md:right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
            INSTAGRAM
          </span>
        </a>

        <a
          href="https://www.band.us/@venusgecko"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-12 h-12 md:w-16 md:h-16 bg-[#00c73c] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,199,60,0.3)] hover:scale-110 transition-all duration-500"
        >
          <Users className="w-6 h-6 md:w-8 md:h-8" />
          <span className="absolute right-16 md:right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
            NAVER BAND
          </span>
        </a>
      </div>

      {/* Main FAB Toggle Button */}
      <button
        onClick={toggleDial}
        className="relative w-14 h-14 md:w-16 md:h-16 bg-venus-gold text-venus-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:scale-110 transition-transform duration-300 z-10"
      >
        <div className={`absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
          <Plus className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
        </div>
        <div className={`absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
          <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
        </div>
      </button>

    </div>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-20 md:pt-24 pb-28 md:pb-12 border-t border-white/5 bg-venus-black overflow-hidden relative">
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-venus-gold/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-4 md:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-12">
          <div className="max-w-md">
            <h2 className="font-playfair text-4xl font-black tracking-widest text-white mb-8">
              VENUS GECKO
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              {t('footer.desc').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="text-venus-gold text-xs tracking-[0.3em] uppercase font-bold">{t('footer.showroom_title')}</h4>
              <p className="text-white/60 text-sm font-light">
                {t('footer.address_info').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-venus-gold text-xs tracking-[0.3em] uppercase font-bold">{t('footer.contact_title')}</h4>
              <p className="text-white/60 text-sm font-light">
                Kakao: Venus Gecko<br />
                Instagram: @venus_gecko
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
            {t('footer.copy')}
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 md:pr-24 lg:pr-32 relative w-full md:w-auto justify-center md:justify-end">
            <span className="text-venus-gold text-[10px] tracking-[0.3em] uppercase font-bold">
              Venus Friends
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.feedle.me/profile/4e273a00-7444-402d-8a99-15a11907bce2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-xs tracking-wider transition-colors"
              >
                TOPS CRE
              </a>
              <span className="text-white/10 text-xs">|</span>
              <a
                href="https://www.dodosi.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-xs tracking-wider transition-colors"
              >
                도도시
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
