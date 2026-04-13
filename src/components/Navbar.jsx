import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.showroom'), href: '#gallery' },
    { name: t('nav.visit'), href: '#location' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full flex justify-between items-center z-[1000] transition-all duration-500 px-8 py-6 md:px-16 ${isScrolled ? 'bg-venus-black/95 py-4 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
        <div className="font-playfair text-xl md:text-2xl font-black tracking-widest text-white">
          VENUS GECKO
        </div>

        <ul className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white hover:text-venus-gold transition-colors duration-300 tracking-wide uppercase text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-8">
        <LanguageSwitcher />
        <a
          href="https://open.kakao.com/o/sU7s17pg"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-venus-gold text-venus-black px-6 py-2 text-sm font-bold tracking-widest hover:bg-venus-gold/80 transition-all duration-300 hidden sm:block"
        >
          {t('nav.contact')}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
