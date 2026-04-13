import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const geckos = [
  {
    id: 1,
    morph: 'Drippy white spot',
    nameKey: 'duecoo',
    status: 'Available',
    img: '/images/duecoo.jpg',
  },
  {
    id: 2,
    morph: 'Cappucino',
    nameKey: 'radu',
    status: 'Available',
    img: '/images/radu.jpg',
  },
  {
    id: 3,
    morph: 'Lilly white',
    nameKey: 'tina',
    status: 'Available',
    img: '/images/tina.jpg',
  },
  {
    id: 4,
    morph: 'Tri Extreme Harliquin',
    nameKey: 'kona',
    status: 'Available',
    img: '/images/kona.jpg',
  },
];

const Gallery = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.gecko-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: "all"
      });
    }
  }, { scope: containerRef });

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="pt-10 pb-20 md:py-24 bg-venus-dark"
    >
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl text-white">{t('gallery.title')}</h2>
            <p className="text-white/50 text-lg font-light">{t('gallery.desc')}</p>
          </div>
          <div className="flex gap-8 items-center">
            <a
              href="https://venus-gecko.qshop.ai/JeOaz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-venus-gold flex items-center gap-2 group tracking-widest text-sm uppercase"
            >
              {t('gallery.male')}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
            <a
              href="https://venus-gecko.qshop.ai/Nt04q"
              target="_blank"
              rel="noopener noreferrer"
              className="text-venus-gold flex items-center gap-2 group tracking-widest text-sm uppercase"
            >
              {t('gallery.female')}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {geckos.map((gecko) => (
            <div
              key={gecko.id}
              className="gecko-card group bg-venus-black border border-white/5 overflow-hidden transition-all duration-500 hover:border-venus-gold/50"
            >
              <div className="aspect-[4/5] bg-white/5 overflow-hidden flex items-center justify-center p-8">
                <img
                  src={gecko.img}
                  alt={`${t(`geckos.${gecko.nameKey}`)} - ${gecko.morph} Crested Gecko ${t('geckos.brand_tail')}`}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
              <div className="p-8 space-y-4">
                <span className="text-venus-gold text-[10px] tracking-widest uppercase font-bold">{gecko.morph}</span>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">{t(`geckos.${gecko.nameKey}`)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
