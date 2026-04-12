import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subRef = useRef(null);
  const imageSideRef = useRef(null);
  const contentSideRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();

    // Initial reveal animation
    if (imageSideRef.current) {
      tl.from(imageSideRef.current, {
        xPercent: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });
    }

    if (contentSideRef.current) {
      tl.from(contentSideRef.current, {
        xPercent: -20,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0');
    }

    if (subRef.current) {
      tl.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.5');
    }

    if (title1Ref.current) {
      tl.from(title1Ref.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.7');
    }

    if (title2Ref.current) {
      tl.from(title2Ref.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0');
    }

  }, { scope: sectionRef });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden bg-venus-black"
    >
      {/* Content Side (Split Layout) */}
      <div
        ref={contentSideRef}
        className="w-full md:w-[45%] flex flex-col justify-center items-start px-8 md:px-20 z-10 pt-32 md:pt-0"
      >
        <h2
          ref={subRef}
          className="font-jakarta text-xs md:text-sm font-light tracking-[0.4em] uppercase text-venus-gold mb-6"
        >
          {t('hero.sub')}
        </h2>

        <h1 className="text-4xl md:text-6xl lg:text-7xl flex flex-col items-start gap-3 w-full pr-4">
          <span ref={title1Ref} className="block leading-tight text-white break-keep">{t('hero.title1')}</span>
          <span ref={title2Ref} className="block leading-tight text-venus-gold italic break-keep">{t('hero.title2')}</span>
        </h1>

        <p className="font-jakarta text-sm md:text-lg tracking-[0.2em] mt-8 font-light text-white/60 max-w-md">
          {t('hero.desc')}
        </p>

      </div>

      {/* Image Side (Split Layout) */}
      <div
        ref={imageSideRef}
        className="w-full md:w-[55%] h-[50vh] md:h-screen relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
          style={{
            backgroundImage: "url('/images/Gemini_Generated_Image_78wpu678wpu678wp.png')",
            filter: "brightness(0.8) contrast(1.1)"
          }}
        />
        
        {/* Multilingual Text Badge Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-max max-w-[90%] text-center z-10 
          drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
          <p className="text-sm md:text-lg text-white font-medium tracking-[0.1em] mb-1">
            {t('hero.badge.top')}
          </p>
          <div className="flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-0" 
                style={{ fontFamily: "'Noto Serif KR', serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)"}}>
              {t('hero.badge.brand_kr')}
            </h2>
            <h3 className="text-3xl md:text-5xl text-venus-gold font-playfair tracking-[0.15em] mb-4">
              {t('hero.badge.brand_en')}
            </h3>
          </div>
          <p className="text-xs md:text-base text-white/90 tracking-widest font-medium">
            {t('hero.badge.bottom')}
          </p>
        </div>

        {/* Subtle overlay for the image side */}
        <div className="absolute inset-0 bg-gradient-to-r from-venus-black via-transparent to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-venus-black via-transparent to-transparent md:hidden" />
      </div>

    </section>
  );
};

export default Hero;
