import { useEffect, useRef } from 'react';
import { Gem } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-32 px-4 md:px-16 container mx-auto bg-venus-black"
    >
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div ref={textRef} className="space-y-6">
          <span className="text-venus-gold text-xs tracking-[0.3em] uppercase">Our Story</span>
          <h2 className="text-4xl md:text-6xl leading-tight">
            살아있는 보석,<br />그 이상의 가치
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-lg">
            단순한 샵을 넘어 하나의 브랜드로. 베누스게코는 개체 하나하나를 예술 작품처럼 대합니다. 
            MZ 세대의 감각을 일깨우는 독보적인 퀄리티와 감성을 직접 경험해 보세요.
          </p>
        </div>

        <div ref={cardRef} className="relative group">
          <div className="glass p-12 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <Gem size={120} className="text-venus-gold" />
            </div>
            
            <Gem className="text-venus-gold mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Living Jewel</h3>
            <p className="text-white/50 text-base leading-relaxed">
              우리는 게코를 단순한 반려동물이 아닌 '동적 예술'로 정의합니다. 
              눈을 마주치는 순간 느끼는 경이로움을 전달합니다.
            </p>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-venus-gold/10 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default About;
