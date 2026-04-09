import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const sectionRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subRef = useRef(null);
  const imageSideRef = useRef(null);
  const contentSideRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial reveal animation
    tl.from(imageSideRef.current, {
      xPercent: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
    })
    .from(contentSideRef.current, {
      xPercent: -20,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=1.0')
    .from(subRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
    .from(title1Ref.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.7')
    .from(title2Ref.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=1.0')
    .from('.scroll-indicator', {
      opacity: 0,
      duration: 1,
    }, '-=0.5');
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center overflow-hidden bg-venus-black"
    >
      {/* Content Side (Split Layout) */}
      <div 
        ref={contentSideRef}
        className="w-full md:w-[45%] h-full flex flex-col justify-center items-start px-8 md:px-20 z-10 pt-32 md:pt-0"
      >
        <h2 
          ref={subRef}
          className="font-jakarta text-xs md:text-sm font-light tracking-[0.4em] uppercase text-venus-gold mb-6"
        >
          Eye-contact addicts.
        </h2>
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl flex flex-col items-start gap-2">
          <span ref={title1Ref} className="block leading-tight text-white whitespace-nowrap">눈을 맞추는 순간</span>
          <span ref={title2Ref} className="block leading-tight text-venus-gold italic whitespace-nowrap">시작되는 묘한 중독</span>
        </h1>
        
        <p className="font-jakarta text-sm md:text-lg tracking-[0.2em] mt-8 font-light text-white/60 max-w-md">
          Venus Gecko: Your Living Jewel. 인공물의 화려함보다 생명의 경이로움에 주목합니다.
        </p>

        <div className="scroll-indicator mt-16 flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] font-light text-venus-gold">SCROLL</span>
            <div className="w-px h-16 bg-gradient-to-b from-venus-gold to-transparent" />
          </div>
          <span className="text-white/20 text-[10px] tracking-[0.2em] font-light hidden md:block uppercase">Explore the Collection</span>
        </div>
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
        {/* Subtle overlay for the image side */}
        <div className="absolute inset-0 bg-gradient-to-r from-venus-black via-transparent to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-venus-black via-transparent to-transparent md:hidden" />
      </div>
    </section>
  );
};

export default Hero;
