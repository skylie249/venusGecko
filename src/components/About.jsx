import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Gem } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (textRef.current) {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (cardRef.current) {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }

    const philosophyGrid = containerRef.current.querySelector('.philosophy-grid');
    const items = containerRef.current.querySelectorAll('.philosophy-item');
    if (philosophyGrid && items.length > 0) {
      gsap.from(items, {
        scrollTrigger: {
          trigger: philosophyGrid,
          start: 'top 90%',
        },
        y: 20,
        opacity: 1, // Ensure visibility is maintained
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, { scope: containerRef });

  const philosophyItems = [
    { title: t('about.philosophy.item1.title'), desc: t('about.philosophy.item1.desc'), icon: "01" },
    { title: t('about.philosophy.item2.title'), desc: t('about.philosophy.item2.desc'), icon: "02" },
    { title: t('about.philosophy.item3.title'), desc: t('about.philosophy.item3.desc'), icon: "03" }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="pt-20 pb-20 md:py-32 px-4 md:px-16 container mx-auto bg-venus-black"
    >
      <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
        <div ref={textRef} className="space-y-6">
          <span className="text-venus-gold text-xs tracking-[0.4em] uppercase font-medium">{t('about.sub')}</span>
          <h2 className="text-4xl md:text-7xl leading-tight">
            {t('about.title').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
            {t('about.desc')}
          </p>
        </div>

        <div ref={cardRef} className="relative group">
          <div className="glass p-12 rounded-3xl border border-white/5 relative overflow-hidden h-[400px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-1000">
              <Gem size={200} className="text-venus-gold" />
            </div>

            <div className="relative z-10">
              <Gem className="text-venus-gold mb-6" size={48} />
              <h3 className="text-3xl font-bold mb-4">{t('about.gem_title')}</h3>
              <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                {t('about.gem_desc')}
              </p>
            </div>
          </div>

          <div className="absolute -top-10 -left-10 w-40 h-40 bg-venus-gold/5 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>

      {/* Philosophy Grid */}
      <div className="philosophy-grid grid md:grid-cols-3 gap-8 mt-20">
        {philosophyItems.map((item, idx) => (
          <div key={idx} className="philosophy-item glass-dark p-10 rounded-2xl border border-white/5 hover:border-venus-gold/30 transition-all duration-500 group flex flex-col h-full">
            <span className="text-venus-gold/20 text-5xl block mb-8 font-playfair tabular-nums group-hover:text-venus-gold transition-all duration-700 leading-none">
              {item.icon}
            </span>
            <h4 className="text-xl font-bold mb-4 text-white group-hover:text-venus-gold transition-colors">{item.title}</h4>
            <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/70 transition-colors flex-grow">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
