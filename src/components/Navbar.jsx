import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Showroom', href: '#gallery' },
    { name: 'Visit', href: '#location' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full flex justify-between items-center z-[1000] transition-all duration-500 px-8 py-6 md:px-16 ${
        isScrolled ? 'bg-venus-black/95 py-4 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="font-playfair text-2xl font-black tracking-widest text-white">
        VENUS GECKO
      </div>
      
      <ul className="hidden md:flex gap-12">
        {navLinks.map((link) => (
          <li key={link.name}>
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

      <div className="flex items-center gap-4">
        <a 
          href="https://open.kakao.com/o/gZhaGrwg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="border border-venus-gold px-6 py-2 text-sm tracking-widest hover:bg-venus-gold hover:text-venus-black transition-all duration-300"
        >
          INQUIRY
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
