import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, X, ChevronLeft, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

// Google Drive Base Folders
const MALE_ALL_ID = import.meta.env.VITE_MALE_ALL_ID;
const FEMALE_ALL_ID = import.meta.env.VITE_FEMALE_ALL_ID;

// Morph Categories categorized by Gender IDs
const MORPH_CATEGORIES = [
  { name: 'Normal', maleId: import.meta.env.VITE_MORPH_NORMAL_MALE, femaleId: import.meta.env.VITE_MORPH_NORMAL_FEMALE },
  { name: 'Lilly', maleId: import.meta.env.VITE_MORPH_LILLY_MALE, femaleId: import.meta.env.VITE_MORPH_LILLY_FEMALE },
  { name: 'Cappuccino', maleId: import.meta.env.VITE_MORPH_CAPPUCCINO_MALE, femaleId: import.meta.env.VITE_MORPH_CAPPUCCINO_FEMALE },
  { name: 'Frappuccino', maleId: import.meta.env.VITE_MORPH_FRAPPUCCINO_MALE, femaleId: import.meta.env.VITE_MORPH_FRAPPUCCINO_FEMALE },
  { name: 'Sable', maleId: import.meta.env.VITE_MORPH_SABLE_MALE, femaleId: import.meta.env.VITE_MORPH_SABLE_FEMALE },
  { name: 'Lilly Sable', maleId: import.meta.env.VITE_MORPH_LILLY_SABLE_MALE, femaleId: import.meta.env.VITE_MORPH_LILLY_SABLE_FEMALE },
  { name: 'Axantic', maleId: import.meta.env.VITE_MORPH_AXANTIC_MALE, femaleId: import.meta.env.VITE_MORPH_AXANTIC_FEMALE },
  { name: 'Lilly Axantic', maleId: import.meta.env.VITE_MORPH_LILLY_AXANTIC_MALE, femaleId: import.meta.env.VITE_MORPH_LILLY_AXANTIC_FEMALE },
  { name: 'Chocho', maleId: import.meta.env.VITE_MORPH_CHOCHO_MALE, femaleId: import.meta.env.VITE_MORPH_CHOCHO_FEMALE },
];

const geckos = [
  {
    id: 1,
    morph: 'Drippy white spot',
    nameKey: 'duecoo',
    status: 'Available',
    img: '/images/duecoo.jpg',
    folderId: '1KBK3Pl2kjj_MNrIncMn9A32A6U-fWndX', // Individual gecko folder
  },
  {
    id: 2,
    morph: 'Cappucino',
    nameKey: 'radu',
    status: 'Available',
    img: '/images/radu.jpg',
    folderId: '13AVydnHKx9kP0eUeSDN25GAQoY1hJ325', // Individual gecko folder
  },
  {
    id: 3,
    morph: 'Lilly white',
    nameKey: 'tina',
    status: 'Available',
    img: '/images/tina.jpg',
    folderId: '1u4HPqeDP6-Kz_C4AXAiBeU0FXXrV_tz3', // Individual gecko folder
  },
  {
    id: 4,
    morph: 'Tri Extreme Harliquin',
    nameKey: 'kona',
    status: 'Available',
    img: '/images/kona.jpg',
    folderId: '1KBK3Pl2kjj_MNrIncMn9A32A6U-fWndX', // Individual gecko folder
  },
  // 새로운 5번째 시그니처 개체를 임시로 추가해두었습니다. 실제 정보로 수정해서 사용해 주세요.
  {
    id: 5,
    morph: 'SPT ',
    nameKey: 'polly', // ko.json 등의 파일에 'new_gecko' 키를 추가해야 합니다.
    status: 'Available',
    img: '/images/polly.jpg',
    folderId: '1KBK3Pl2kjj_MNrIncMn9A32A6U-fWndX',
  },
];

const Gallery = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const [selectedMorph, setSelectedMorph] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [genderFilter, setGenderFilter] = useState(null); // 'ALL' | 'MALE' | 'FEMALE'
  const [activeMorph, setActiveMorph] = useState(null);   // the morph category selected

  // Google Drive Integration States
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);
  const [fetchedImages, setFetchedImages] = useState([]);

  const fetchDriveImages = async (folderId) => {
    setFetchedImages([]); // Clear previous images

    // Access the API Key from environment variables
    const API_KEY = import.meta.env.VITE_GDRIVE_API_KEY;

    // If there is no real API Key or Folder ID, mock the fetching for demo purposes
    if (!API_KEY || API_KEY.includes('your_api_key_here') || !folderId || folderId.includes('FOLDER_')) {
      setIsGalleryLoading(true);
      setTimeout(() => {
        setFetchedImages([
          { id: 'mock-1', name: 'duecoo_01.jpg', url: '/images/duecoo.jpg' },
          { id: 'mock-2', name: 'radu_detail.jpg', url: '/images/radu.jpg' },
          { id: 'mock-3', name: 'tina_pose.jpg', url: '/images/tina.jpg' },
          { id: 'mock-4', name: 'kona_macro.jpg', url: '/images/kona.jpg' }
        ]);
        setIsGalleryLoading(false);
      }, 800); // simulate network delay
      return;
    }

    // Real API Fetch Logic
    setIsGalleryLoading(true);
    try {
      const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,thumbnailLink)&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.files) {
        const mapped = data.files.map(file => ({
          id: file.id,
          name: file.name,
          // Replace lower resolution (typically s220) with high resolution (s1000)
          url: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s1000') : ''
        })).filter(img => img.url !== '');

        setFetchedImages(mapped);
      }
    } catch (error) {
      console.error('Failed to fetch from Google Drive:', error);
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const openAlbum = (gecko) => {
    setSelectedMorph(gecko);
    setGenderFilter(null);
    setActiveMorph(null);
    fetchDriveImages(gecko.folderId);
  };

  const handleGenderClick = (gender) => {
    setGenderFilter(gender);
    setActiveMorph(null);
    if (gender === 'MALE') fetchDriveImages(MALE_ALL_ID);
    else if (gender === 'FEMALE') fetchDriveImages(FEMALE_ALL_ID);
  };

  const handleMorphClick = (morph) => {
    setActiveMorph(morph);
    if (genderFilter === 'MALE') fetchDriveImages(morph.maleId);
    else if (genderFilter === 'FEMALE') fetchDriveImages(morph.femaleId);
  };

  const openGenderAlbum = (gender) => {
    setSelectedMorph({ morph: 'GENDER_VIEW' }); // Truthy object to open the overlay
    handleGenderClick(gender);
  };

  // Prevent background scrolling when overlays are open
  useEffect(() => {
    if (selectedMorph || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMorph, selectedImage]);

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.gecko-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: "all"
      });
    }
  }, { scope: containerRef });

  // Album Overlay GSAP animations
  useEffect(() => {
    if (selectedMorph) {
      gsap.fromTo('.album-overlay',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [selectedMorph]);

  // Album Items GSAP animations
  useEffect(() => {
    if (selectedMorph && !isGalleryLoading && fetchedImages.length > 0 && !selectedImage) {
      gsap.fromTo('.album-item',
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
      );
    }
  }, [selectedMorph, isGalleryLoading, fetchedImages, selectedImage]);

  // Detail View GSAP animations
  useEffect(() => {
    if (selectedImage) {
      gsap.fromTo('.detail-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo('.detail-image',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [selectedImage]);

  const albumTitleText = genderFilter
    ? `${genderFilter} ${activeMorph ? activeMorph.name : 'ALL'}`
    : selectedMorph?.morph;

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="pt-10 pb-20 md:py-24 bg-venus-dark"
    >
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl text-white">{t('gallery.title')}</h2>
            <p className="text-white/50 text-lg font-light">{t('gallery.desc')}</p>
          </div>
          <div className="flex gap-8 items-center">
            <button
              onClick={() => openGenderAlbum('MALE')}
              className="text-venus-gold flex items-center gap-2 group tracking-widest text-sm uppercase cursor-pointer bg-transparent border-0"
            >
              {t('gallery.male')}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button
              onClick={() => openGenderAlbum('FEMALE')}
              className="text-venus-gold flex items-center gap-2 group tracking-widest text-sm uppercase cursor-pointer bg-transparent border-0"
            >
              {t('gallery.female')}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* 최적화: 슬라이드(Carousel) 적용. 마우스/터치로 좌우 스와이프가 가능하며 데스크탑에선 4개씩 보여집니다. */}
        <div className="w-full relative px-2">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8 py-4">
              {geckos.map((gecko) => (
                <CarouselItem key={gecko.id} className="pl-4 md:pl-6 lg:pl-8 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card
                    onClick={() => openAlbum(gecko)}
                    className="gecko-card group h-full bg-black/40 border-white/5 overflow-hidden transition-all duration-500 hover:border-venus-gold/50 cursor-pointer rounded-xl backdrop-blur-xl flex flex-col"
                  >
                    <div className="aspect-[4/5] bg-white/5 overflow-hidden flex items-center justify-center p-8 relative">
                      <img
                        src={gecko.img}
                        alt={`${t(`geckos.${gecko.nameKey}`)} - ${gecko.morph} Crested Gecko ${t('geckos.brand_tail')}`}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        onLoad={() => ScrollTrigger.refresh()}
                      />
                      <div className="absolute inset-0 bg-venus-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Badge variant="outline" className="text-white text-xs uppercase tracking-widest border-white/20 py-1.5 px-4 rounded-full bg-black/40 backdrop-blur-md">View More</Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-3 flex-1 flex flex-col justify-end">
                      <div className="mb-auto">
                        <Badge variant="outline" className="text-venus-gold border-venus-gold/30 uppercase tracking-widest text-[10px] rounded-full inline-block mb-3">
                          {gecko.morph}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-2xl font-bold text-white tracking-wide">{t(`geckos.${gecko.nameKey}`)}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* 좌/우 네비게이션 화살표 */}
            <div className="hidden md:block">
              <CarouselPrevious className="-left-4 lg:-left-12 bg-venus-black/80 backdrop-blur border-venus-gold/30 text-venus-gold hover:bg-venus-gold hover:text-venus-black transition-all duration-300 h-12 w-12" />
              <CarouselNext className="-right-4 lg:-right-12 bg-venus-black/80 backdrop-blur border-venus-gold/30 text-venus-gold hover:bg-venus-gold hover:text-venus-black transition-all duration-300 h-12 w-12" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Album Overlay */}
      {selectedMorph && (
        <div className="album-overlay fixed inset-0 z-[2000] bg-venus-black/98 backdrop-blur-xl overflow-y-auto w-full h-full flex flex-col">
          <div className="sticky top-0 w-full p-6 md:p-8 flex items-center justify-between bg-gradient-to-b from-venus-black/95 to-transparent z-20 pt-safe backdrop-blur-xl border-b border-venus-gold/10">
            <Button
              variant="ghost"
              onClick={() => setSelectedMorph(null)}
              className="group text-white/70 hover:text-venus-gold hover:bg-transparent px-0 font-bold uppercase tracking-widest text-[10px] md:text-sm"
            >
              <ChevronLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="hidden xs:inline">Back to Gallery</span>
            </Button>

            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase text-center hidden md:block">
              {albumTitleText} <span className="text-venus-gold font-light">More</span>
            </h3>

            <button
              onClick={() => setSelectedMorph(null)}
              className="text-white/40 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
              aria-label="Close Album"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-20 pt-4 md:pt-8 content-start flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase text-center mb-6 md:hidden">
              {albumTitleText} <span className="text-venus-gold font-light">More</span>
            </h3>

            {/* Gender Navigation Bar */}
            <div className="w-full flex justify-center gap-2 md:gap-4 mb-4">
              {['MALE', 'FEMALE'].map(g => (
                <button
                  key={g}
                  onClick={() => handleGenderClick(g)}
                  className={`px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 border ${genderFilter === g
                    ? 'bg-venus-gold text-venus-black border-venus-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Morphs Navigation Bar (only visible if MALE or FEMALE is selected) */}
            {(genderFilter === 'MALE' || genderFilter === 'FEMALE') && (
              <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 mb-6 md:mb-8 border-b border-white/5">
                <div className="flex gap-2 md:gap-3 w-max mx-auto px-2">
                  {MORPH_CATEGORIES.map(morph => (
                    <button
                      key={morph.name}
                      onClick={() => handleMorphClick(morph)}
                      className={`px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 border ${activeMorph?.name === morph.name
                        ? 'bg-white/20 text-white border-white/30 font-bold'
                        : 'bg-transparent text-white/40 border-white/5 hover:bg-white/5 hover:text-white/80'
                        }`}
                    >
                      {morph.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isGalleryLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 text-white/50 py-24">
                <Loader2 className="animate-spin text-venus-gold" size={48} />
                <p className="tracking-widest uppercase text-xs">Fetching from Drive...</p>
              </div>
            ) : (
              /* Grid of Google Drive images */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
                {fetchedImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="album-item relative aspect-square bg-white/5 border border-white/5 rounded-xl overflow-hidden cursor-pointer group hover:border-venus-gold/50 transition-all duration-300 shadow-xl"
                  >
                    <img
                      src={image.url}
                      alt={`${albumTitleText} ${image.id}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-venus-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs md:text-sm uppercase tracking-widest font-light bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-center max-w-[90%] break-words">
                        {image.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isGalleryLoading && fetchedImages.length === 0 && (
              <div className="py-20 text-center text-white/30 text-sm tracking-widest uppercase">
                No images available in this category.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail Image Overlay */}
      {selectedImage && (
        <div className="detail-overlay fixed inset-0 z-[2010] bg-black/95 backdrop-blur-3xl flex flex-col">
          {/* Navigation Bar for Detail View */}
          <div className="w-full flex justify-between items-center p-6 md:p-10 z-10">
            <button
              onClick={() => setSelectedImage(null)}
              className="flex items-center gap-2 text-white/60 hover:text-venus-gold transition-colors group tracking-widest text-[10px] md:text-xs uppercase font-bold"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Gallery
            </button>

            <button
              onClick={() => {
                setSelectedImage(null);
                setSelectedMorph(null);
                setGenderFilter(null);
                setActiveMorph(null);
              }}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group tracking-widest text-[10px] md:text-xs uppercase font-bold bg-white/5 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10"
            >
              Exit to Gallery
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 w-full h-full flex items-center justify-center p-4 md:p-8">
            <div className="relative group max-w-full max-h-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 detail-image"
              />
            </div>
          </div>

          {/* Subtle footer info for Detail View */}
          <div className="w-full p-8 text-center flex flex-col gap-2">
            <p className="text-white/80 text-sm md:text-base uppercase tracking-widest font-light">
              {selectedImage.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")}
            </p>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">Venus Gecko Premium Collection</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
