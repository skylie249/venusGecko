import { useTranslation } from 'react-i18next';
import { Instagram, MessageCircle, List, Users } from 'lucide-react';

export const FloatingCTA = () => {
  const { t, i18n } = useTranslation();
  const isGlobal = i18n.language === 'en' || i18n.language === 'ja' || i18n.language === 'zh';
  const feedleUrl = isGlobal
    ? "https://air.feedle.me/profile/dd285e94-18e9-4444-a40f-bc34075d6d06"
    : "https://www.feedle.me/profile/dd285e94-18e9-4444-a40f-bc34075d6d06";

  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-6 z-[1001]">
      <a
        href={feedleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-500 cursor-pointer"
      >
        <List size={32} />
        <span className="absolute right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
          AVAILABLE LIST
        </span>
      </a>

      <a
        href="https://open.kakao.com/o/gZhaGrwg"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 bg-[#FEE500] text-[#3c1e1e] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(254,229,0,0.3)] hover:scale-110 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[#FEE500] rounded-full animate-ping opacity-20 group-hover:opacity-40" />
        <MessageCircle size={32} />
        <span className="absolute right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
          KAKAO TALK
        </span>
      </a>

      <a
        href="https://www.instagram.com/venus_gecko"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,39,67,0.3)] hover:scale-110 transition-all duration-500"
      >
        <Instagram size={32} />
        <span className="absolute right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
          INSTAGRAM
        </span>
      </a>

      <a
        href="https://www.band.us/@venusgecko"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-16 h-16 bg-[#00c73c] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,199,60,0.3)] hover:scale-110 transition-all duration-500"
      >
        <Users size={32} />
        <span className="absolute right-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
          NAVER BAND
        </span>
      </a>
    </div>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-20 md:pt-24 pb-12 border-t border-white/5 bg-venus-black overflow-hidden relative">
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
        </div>
      </div>
    </footer>
  );
};
