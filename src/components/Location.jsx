import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Instagram, MessageCircle } from 'lucide-react';

const Location = () => {
  const { t } = useTranslation();
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const { kakao } = window;
      if (!kakao || !kakao.maps) {
        // If not available yet, try again in a bit or wait for script load
        return;
      }

      kakao.maps.load(() => {
        if (!mapRef.current) return;

        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.5411, 127.0706),
          level: 3
        };

        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch('서울 광진구 동일로 34', (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords
            });

            const infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:10px;font-family:sans-serif;font-size:12px;color:#333;font-weight:bold;background:#fff;border-radius:4px;">VENUS GECKO</div>'
            });
            infowindow.open(map, marker);
            map.setCenter(coords);
          }
        });
      });
    };

    // Check availability with a small delay or retry logic
    const checkInterval = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        initMap();
        clearInterval(checkInterval);
      }
    }, 100);

    // Timeout after 5 seconds
    const timeout = setTimeout(() => clearInterval(checkInterval), 5000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="location" className="py-20 md:py-24 bg-venus-black px-4 md:px-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl text-white">{t('location.title')}</h2>
            <p className="text-white/50 text-xl font-light leading-relaxed">
              {t('location.desc')}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white">
                <MapPin className="text-venus-gold" />
                <span className="text-lg">{t('location.address')}</span>
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

            <a
              href="https://open.kakao.com/o/sU7s17pg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-venus-gold text-venus-black font-bold py-5 px-10 tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 text-center"
            >
              {t('location.reservation')}
            </a>
          </div>

          <div className="aspect-square md:aspect-video bg-venus-dark rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-venus-gold/50">
            <div ref={mapRef} className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
