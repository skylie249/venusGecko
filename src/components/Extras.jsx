import { Instagram, MessageCircle } from 'lucide-react';

export const FloatingCTA = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[1001]">
       <a 
        href="https://open.kakao.com/o/gZhaGrwg" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#FEE500] text-[#3c1e1e] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle size={28} />
      </a>
      <a 
        href="https://www.instagram.com/venus_gecko" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <Instagram size={28} />
      </a>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-venus-black">
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-playfair text-2xl font-black tracking-widest text-white">
          VENUS GECKO
        </div>
        <p className="text-white/30 text-xs tracking-widest uppercase">
          &copy; 2026 Venus Gecko. All Rights Reserved. Designed for premium experience.
        </p>
        <div className="flex gap-8 text-white/40 text-xs tracking-widest uppercase">
           <a href="#" className="hover:text-venus-gold">Privacy Policy</a>
           <a href="#" className="hover:text-venus-gold">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
