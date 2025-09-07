'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';

const BeforeAfterCarousel = ({ beforeImages, afterImages }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        axis: 'y',
        loop: true,
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        duration: 20,
        startIndex: 0
    });

    const [emblaRefAfter, emblaApiAfter] = useEmblaCarousel({
        axis: 'y',
        loop: true,
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        duration: 20,
        startIndex: 0
    });

    const beforeContainerRef = useRef(null);
    const afterContainerRef = useRef(null);

    const scrollPrev = useCallback(() => {
        if (emblaApi && emblaApiAfter) {
            const currentIndex = emblaApi.selectedScrollSnap();
            const prevIndex = currentIndex === 0 ? beforeImages.length - 1 : currentIndex - 1;
            
            emblaApi.scrollTo(prevIndex);
            emblaApiAfter.scrollTo(prevIndex);
            setSelectedIndex(prevIndex);
        }
    }, [emblaApi, emblaApiAfter, beforeImages.length]);

    const scrollNext = useCallback(() => {
        if (emblaApi && emblaApiAfter) {
            const currentIndex = emblaApi.selectedScrollSnap();
            const nextIndex = currentIndex === beforeImages.length - 1 ? 0 : currentIndex + 1;
            
            emblaApi.scrollTo(nextIndex);
            emblaApiAfter.scrollTo(nextIndex);
            setSelectedIndex(nextIndex);
        }
    }, [emblaApi, emblaApiAfter, beforeImages.length]);

    // Sync both carousels and update selected index
    useEffect(() => {
        if (!emblaApi || !emblaApiAfter) return;

        const onSelect = () => {
            const currentIndex = emblaApi.selectedScrollSnap();
            setSelectedIndex(currentIndex);
            // Ensure both carousels are in sync
            if (emblaApiAfter.selectedScrollSnap() !== currentIndex) {
                emblaApiAfter.scrollTo(currentIndex);
            }
        };

        const onSelectAfter = () => {
            const currentIndex = emblaApiAfter.selectedScrollSnap();
            setSelectedIndex(currentIndex);
            // Ensure both carousels are in sync
            if (emblaApi.selectedScrollSnap() !== currentIndex) {
                emblaApi.scrollTo(currentIndex);
            }
        };

        emblaApi.on('select', onSelect);
        emblaApiAfter.on('select', onSelectAfter);

        // Set initial selected index
        setSelectedIndex(emblaApi.selectedScrollSnap());

        return () => {
            emblaApi.off('select', onSelect);
            emblaApiAfter.off('select', onSelectAfter);
        };
    }, [emblaApi, emblaApiAfter]);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo([beforeContainerRef.current, afterContainerRef.current],
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: beforeContainerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative">
            {/* Navigation Buttons */}


            {/* Carousel Container */}
            <div className="flex flex-col md:flex-row md:items-center gap-8 mx-auto relative">
                {/* Before Section */}
                <div ref={beforeContainerRef} className="relative w-full md:flex-1">
                    <div className="text-center mb-6">
                        <h3 className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#CCC0B2] leading-tight">
                            Før
                        </h3>
                        <div className="w-16 h-0.5 bg-[#CCC0B2] mx-auto mt-2"></div>
                    </div>

                    <div className="embla overflow-hidden rounded-lg shadow-2xl mt-6" ref={emblaRef}>
                        <div className="embla__container flex flex-col h-[400px] md:h-[500px]">
                            {beforeImages.map((image, index) => (
                                <div key={index} className="embla__slide flex-shrink-0 h-full relative group">
                                    <img
                                        src={image}
                                        alt={`Before image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Navigation Arrows - Hidden on mobile, shown on desktop */}
                <div className="hidden md:flex flex-col gap-4">
                    <button
                        onClick={scrollPrev}
                        className="group bg-white hover:bg-[#CCC0B2] transition-all duration-300 rounded-full p-4 shadow-lg transform hover:scale-110 border border-[#CCC0B2]/20"
                        aria-label="Previous images"
                    >
                        <svg
                            className="w-6 h-6 text-[#CCC0B2] group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="group bg-white hover:bg-[#CCC0B2] transition-all duration-300 rounded-full p-4 shadow-lg transform hover:scale-110 border border-[#CCC0B2]/20"
                        aria-label="Next images"
                    >
                        <svg
                            className="w-6 h-6 text-[#CCC0B2] group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Arrows - Horizontal layout between sections */}
                <div className="flex md:hidden justify-center gap-4 my-4">
                    <button
                        onClick={scrollPrev}
                        className="group bg-white hover:bg-[#CCC0B2] transition-all duration-300 rounded-full p-3 shadow-lg transform hover:scale-110 border border-[#CCC0B2]/20"
                        aria-label="Previous images"
                    >
                        <svg
                            className="w-5 h-5 text-[#CCC0B2] group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="group bg-white hover:bg-[#CCC0B2] transition-all duration-300 rounded-full p-3 shadow-lg transform hover:scale-110 border border-[#CCC0B2]/20"
                        aria-label="Next images"
                    >
                        <svg
                            className="w-5 h-5 text-[#CCC0B2] group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* After Section */}
                <div ref={afterContainerRef} className="relative w-full md:flex-1">
                    <div className="text-center mb-6">
                        <h3 className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#CCC0B2] leading-tight">
                            Etter
                        </h3>
                        <div className="w-16 h-0.5 bg-[#CCC0B2] mx-auto mt-2"></div>
                    </div>

                    <div className="embla overflow-hidden rounded-lg shadow-2xl mt-6" ref={emblaRefAfter}>
                        <div className="embla__container flex flex-col h-[400px] md:h-[500px]">
                            {afterImages.map((image, index) => (
                                <div key={index} className="embla__slide flex-shrink-0 h-full relative group">
                                    <img
                                        src={image}
                                        alt={`After image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicators */}
            {/* <div className="flex justify-center mt-8 gap-2">
                {beforeImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (emblaApi) emblaApi.scrollTo(index);
                            if (emblaApiAfter) emblaApiAfter.scrollTo(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${index === selectedIndex
                                ? 'bg-[#CCC0B2] scale-125'
                                : 'bg-[#CCC0B2]/30 hover:bg-[#CCC0B2]'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div> */}
        </div>
    );
};

export default BeforeAfterCarousel;