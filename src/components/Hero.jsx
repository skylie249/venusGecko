import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function CarouselDots() {
  const { api } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState([])

  React.useEffect(() => {
    if (!api) return

    setScrollSnaps(api.scrollSnapList())
    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-50">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={`h-2 rounded-full transition-all duration-500 ${
            index === selectedIndex 
              ? "w-8 bg-venus-gold shadow-[0_0_10px_rgba(197,160,89,0.7)]" 
              : "w-2 bg-white/30 hover:bg-white/60"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

const Hero = () => {
  const { t } = useTranslation();

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <section id="hero" className="relative h-screen w-full bg-venus-black overflow-hidden">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {/* Slide 1: Image Side */}
          <CarouselItem className="relative h-screen w-full pl-0 basis-full flex-shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/Gemini_Generated_Image_78wpu678wpu678wp.png')",
                filter: "brightness(0.8) contrast(1.1)"
              }}
            />
            {/* Multilingual Text Badge Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-max max-w-[90%] text-center z-10 drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
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
            {/* Subtle Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-venus-black to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-venus-black/80 to-transparent pointer-events-none" />
          </CarouselItem>

          {/* Slide 2: Content Side */}
          <CarouselItem className="relative h-screen w-full pl-0 basis-full flex-shrink-0 bg-venus-black flex flex-col justify-center items-center px-8 md:px-20 text-center">
            {/* Majestic Gecko Eye Background */}
            <div 
              className="absolute inset-0 opacity-50 bg-cover bg-center transition-transform duration-[4000ms] ease-out hover:scale-105 pointer-events-none" 
              style={{
                backgroundImage: "url('/images/hero_slide2_eye.png')"
              }}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-venus-black/40 via-transparent to-venus-black/90 pointer-events-none" />
            <div className="absolute inset-0 bg-venus-black/30 pointer-events-none" />
            
            <div className="z-10 flex flex-col items-center mt-10">
              <h2 className="font-jakarta text-xs md:text-sm font-light tracking-[0.4em] uppercase text-venus-gold mb-8">
                {t('hero.sub')}
              </h2>

              <h1 className="text-4xl md:text-6xl lg:text-7xl flex flex-col items-center gap-4 w-full">
                <span className="block leading-tight text-white break-keep">{t('hero.title1')}</span>
                <span className="block leading-tight text-venus-gold italic break-keep font-playfair">{t('hero.title2')}</span>
              </h1>

              <p className="font-jakarta text-sm md:text-lg tracking-[0.2em] mt-10 font-light text-white/50 max-w-xl leading-relaxed">
                {t('hero.desc')}
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
        
        {/* Dot Pagination positioned bottom center */}
        <CarouselDots />
        
      </Carousel>
    </section>
  );
};

export default Hero;
