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
    gsap.from('.philosophy-item', {
      scrollTrigger: {
        trigger: '.philosophy-grid',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-32 px-4 md:px-16 container mx-auto bg-venus-black"
    >
      <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
        <div ref={textRef} className="space-y-6">
          <span className="text-venus-gold text-xs tracking-[0.4em] uppercase font-medium">Core Essence</span>
          <h2 className="text-4xl md:text-7xl leading-tight">
            살아있는 보석,<br />그 이상의 가치
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
            베누스게코는 단순히 생명을 분양하는 곳을 넘어, 
            하나의 예술적인 라이프스타일을 제안합니다. 
            MZ 세대의 감각을 일깨우는 독보적인 퀄리티를 경험해 보세요.
          </p>
        </div>

        <div ref={cardRef} className="relative group">
          <div className="glass p-12 rounded-3xl border border-white/5 relative overflow-hidden h-[400px] flex flex-col justify-end">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-1000">
                <Gem size={200} className="text-venus-gold" />
             </div>
             
             <div className="relative z-10">
               <Gem className="text-venus-gold mb-6" size={48} />
               <h3 className="text-3xl font-bold mb-4">The Living Jewel</h3>
               <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                 우리는 게코를 단순한 반려동물이 아닌 '동적 예술'로 정의합니다. 
                 눈을 마주치는 순간 느끼는 경이로움을 전달합니다.
               </p>
             </div>
          </div>
          
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-venus-gold/5 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>

      {/* Philosophy Grid */}
      <div className="philosophy-grid grid md:grid-cols-3 gap-8 mt-20">
        {[
          { title: "Pure Quality", desc: "엄격한 선별 과정을 거친 최상위 모프의 개체만을 선보입니다.", icon: "01" },
          { title: "Artistic Care", desc: "보석을 다루듯 섬세한 환경에서 최고의 컨디션을 유지합니다.", icon: "02" },
          { title: "Premium Trust", desc: "분양 후에도 이어지는 지속적인 관리와 소통을 약속합니다.", icon: "03" }
        ].map((item, idx) => (
          <div key={idx} className="philosophy-item glass-dark p-10 rounded-2xl border border-white/5 hover:border-venus-gold/30 transition-all duration-500 group">
            <span className="text-venus-gold/30 text-4xl block mb-6 font-playfair group-hover:text-venus-gold transition-colors">{item.icon}</span>
            <h4 className="text-xl font-bold mb-4 text-white group-hover:text-venus-gold transition-colors">{item.title}</h4>
            <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
