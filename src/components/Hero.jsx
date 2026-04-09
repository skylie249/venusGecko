import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const sectionRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(subRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
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
      delay: 0.5,
    });
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1510137600163-2729bc6959a6?q=80&w=2000&auto=format&fit=crop')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-venus-black/50 to-venus-black" />
      </div>

      <div className="relative z-10 px-4">
        <h2 
          ref={subRef}
          className="font-jakarta text-xs md:text-sm font-light tracking-[0.4em] uppercase text-venus-gold mb-6"
        >
          Eye-contact addicts.
        </h2>
        
        <h1 className="text-5xl md:text-8xl flex flex-col items-center">
          <span ref={title1Ref} className="block leading-tight">눈을 맞추는 순간</span>
          <span ref={title2Ref} className="block leading-tight text-venus-gold italic">시작되는 묘한 중독</span>
        </h1>
        
        <p className="font-jakarta text-sm md:text-lg tracking-widest mt-8 font-light text-white/80">
          Venus Gecko: Your Living Jewel
        </p>

        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] font-light text-venus-gold">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-venus-gold to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
