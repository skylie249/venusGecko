import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const geckos = [
  {
    id: 1,
    morph: 'Lilly White',
    name: 'Snow Queen',
    status: 'Available',
    img: 'https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    morph: 'Dark Axanthic',
    name: 'Midnight Phantom',
    status: 'Showroom Only',
    img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    morph: 'Extreme Harlequin',
    name: 'Golden Flare',
    status: 'Available',
    img: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?q=80&w=1000&auto=format&fit=crop',
  },
];

const Gallery = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from('.gecko-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="py-32 bg-venus-dark"
    >
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl">Digital Showroom</h2>
            <p className="text-white/50 text-lg font-light">베누스게코의 희소성 있는 라인업을 확인하세요.</p>
          </div>
          <button className="text-venus-gold flex items-center gap-2 group tracking-widest text-sm uppercase">
            View All Collection
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {geckos.map((gecko) => (
            <div 
              key={gecko.id} 
              className="gecko-card group bg-venus-black border border-white/5 overflow-hidden transition-all duration-500 hover:border-venus-gold/50"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={gecko.img} 
                  alt={gecko.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 space-y-4">
                <span className="text-venus-gold text-[10px] tracking-widest uppercase font-bold">{gecko.morph}</span>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{gecko.name}</h3>
                  <span className={`text-[10px] px-2 py-1 border ${
                    gecko.status === 'Available' ? 'border-venus-gold text-venus-gold' : 'border-white/20 text-white/40'
                  }`}>
                    {gecko.status}
                  </span>
                </div>
                <button className="w-full py-4 text-xs tracking-[0.2em] font-bold uppercase border border-white/10 hover:border-venus-gold hover:text-venus-gold transition-colors duration-300">
                  Detailed Inventory
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
