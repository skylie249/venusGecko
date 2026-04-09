import { MapPin, Instagram, MessageCircle } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-32 bg-venus-black">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl">Visit Our Space</h2>
            <p className="text-white/50 text-xl font-light leading-relaxed">
              살아있는 보석들이 가득한 베누스게코 쇼룸을 직접 경험해 보세요. 
              최고의 환경에서 케어받는 입양 대기 개체들을 만나보실 수 있습니다.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white">
                <MapPin className="text-venus-gold" />
                <span className="text-lg">서울 광진구 동일로 34 지하1층</span>
              </div>
              <div className="flex gap-6 mt-8">
                <a href="https://www.instagram.com/venus_gecko" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-venus-gold transition-colors">
                  <Instagram size={24} />
                  <span>Instagram</span>
                </a>
                <a href="https://open.kakao.com/o/gZhaGrwg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-venus-gold transition-colors">
                  <MessageCircle size={24} />
                  <span>KakaoTalk</span>
                </a>
              </div>
            </div>

            <button className="bg-venus-gold text-venus-black font-bold py-5 px-10 tracking-[0.2em] uppercase hover:bg-white transition-all duration-300">
              방문 예약하기
            </button>
          </div>

          <div className="aspect-square md:aspect-video bg-venus-dark rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
             {/* Mock Map View */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://api.placeholder.com/map')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000" />
             <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-venus-gold rounded-full animate-bounce flex items-center justify-center">
                   <MapPin className="text-venus-black" />
                </div>
                <span className="text-venus-gold font-bold tracking-widest text-sm">OPEN SHOWNROOM</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
