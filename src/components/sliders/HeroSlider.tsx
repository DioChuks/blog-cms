import React, { useState, useEffect } from 'react';

interface SlideData {
  title: string;
  image: string;
  slideColor?: string;
}

interface HeroSliderProps {
  slides: SlideData[];
  autoPlayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides, 
  autoPlayInterval = 3000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoPlayInterval]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div 
      className={`relative w-full h-[105px] lg:h-[184px] overflow-hidden rounded-3xl ${slides[currentSlide].slideColor ?? 'bg-stone-brown'}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div 
        className="absolute inset-y-0 right-0 w-[160px] lg:w-[373px] fade-in-bottom"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between pt-8">
        <h1 className="text-base md:text-4xl font-bold text-black pl-3 lg:pl-0 lg:text-right lg:ml-6 lg:mt-10 max-w-2xl">
          {slides[currentSlide].title}
        </h1>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 pb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-black w-4' 
                  : 'bg-black/40 hover:bg-black/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;