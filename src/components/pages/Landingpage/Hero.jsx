"use client"
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTimelineTransition, setIsTimelineTransition] = useState(false);
  const progressRefs = useRef([]);
  const intervalRef = useRef(null);
  
  const carouselImages = [
    "/assets/carousel-img-1.webp",
    "/assets/carousel-img-2.webp",
    "/assets/carousel-img-3.webp"
  ];

  const sections = [
    "Portefølje",
    "Om meg",
    "Kontakt"
  ];

  const transitionToNextSlide = useCallback(() => {
    setIsTransitioning(true);
    setIsTimelineTransition(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % carouselImages.length);
      setIsTransitioning(false);
      setIsTimelineTransition(false);
    }, 50);
  }, [carouselImages.length]);

  // Optimized progress animation using CSS animation
  const startProgressAnimation = useCallback((index) => {
    // Reset all progress bars
    progressRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.style.width = '0%';
        ref.style.animation = 'none';
      }
    });

    // Start animation for active progress bar
    const activeProgressRef = progressRefs.current[index];
    if (activeProgressRef) {
      // Force reflow to reset animation
      activeProgressRef.offsetHeight;
      activeProgressRef.style.animation = 'progressAnimation 7s linear forwards';
    }
  }, []);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }

    // Start progress animation for current slide
    startProgressAnimation(activeIndex);

    // Set up the slide change timer
    intervalRef.current = setTimeout(() => {
      transitionToNextSlide();
    }, 7000);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [activeIndex, transitionToNextSlide, startProgressAnimation]);

  const handleSectionClick = (index) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setIsTimelineTransition(false);
    
    // Clear current interval
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-10">
      {/* Add CSS for progress animation */}
      <style jsx>{`
        @keyframes progressAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .progress-bar {
          will-change: width;
          transform: translateZ(0);
        }
        
        .section-button {
          will-change: opacity;
          transform: translateZ(0);
        }
      `}</style>
      
      <div className="flex flex-col relative justify-center items-center w-full h-[60vh] md:h-[87vh] overflow-hidden">
        {carouselImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`hero-${index + 1}`}
            width={1920}
            height={1080}
            className={`absolute w-full h-full object-cover transform ${
              activeIndex === index 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            } ${isTimelineTransition 
                ? 'transition-all ease-in-out duration-50' 
                : 'transition-all ease-in-out duration-1000'
            } ease-in-out`}
            priority={index === 0}
          />
        ))}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent">
          <div className="flex justify-between text-[18px] font-medium items-end px-2 pb-2 md:px-10 md:pb-10 gap-x-10 w-full h-full">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`flex flex-col text-white justify-end items-start w-full min-h-[60px] ${
                  activeIndex === index ? 'block' : 'hidden md:flex'
                }`}
              >
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => handleSectionClick(index)}
                    className={`section-button transition-opacity duration-300 text-left whitespace-nowrap ${
                      activeIndex === index 
                        ? "opacity-100" 
                        : "opacity-40 hover:opacity-70"
                    } ${isTransitioning ? 'pointer-events-none' : ''}`}
                  >
                    {section}
                  </button>
                  <div className="relative w-full h-[1px] overflow-hidden hidden md:block">
                    <span className="absolute top-0 left-0 w-full bg-white/20 h-full"></span>
                    <span
                      ref={(el) => (progressRefs.current[index] = el)}
                      className={`progress-bar absolute top-0 left-0 bg-white h-full transition-opacity duration-300 ease-out ${
                        activeIndex === index ? 'opacity-100' : 'opacity-40'
                      }`}
                      style={{ width: '0%' }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
