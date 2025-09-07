'use client';

import React, { useEffect, useRef } from 'react';
import TextAnimation from '../../TextAnimation';
import AnimatedButton from '../../ui/AnimatedButton';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RegisterYourInterest = ({ data }) => {
    const containerRef = useRef(null);
    const propertyImageRef = useRef(null);
    const neighbourhoodImageRef = useRef(null);

    const propertyImgRef = useRef(null);
    const neighbourhoodImgRef = useRef(null);
    const text1880Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Enhanced Property image parallax - Smooth upward movement with scale
            gsap.fromTo(propertyImgRef.current,
                {
                    y: -150,
                    scale: 1.1,
                    rotationZ: 0.01, // Hardware acceleration trick
                },
                {
                    y: 150,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: propertyImageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.3, // Even smoother for opposite direction
                        invalidateOnRefresh: true,
                    }
                }
            );

            // Enhanced Neighbourhood image parallax - Smooth downward movement with scale
            gsap.fromTo(neighbourhoodImgRef.current,
                {
                    y: -150,
                    scale: 1.1,
                    rotationZ: 0.01, // Hardware acceleration trick
                },
                {
                    y: 150,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: neighbourhoodImageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.3, // Even smoother for opposite direction
                        invalidateOnRefresh: true,
                    }
                }
            );

            // Enhanced 1880s text parallax - Smoother diagonal movement
            gsap.to(text1880Ref.current, {
                y: -120,
                x: -50,
                rotation: 0.01, // Hardware acceleration
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8, // Smoother text movement
                    invalidateOnRefresh: true,
                }
            });

            // Add subtle container movement for depth
            gsap.to(containerRef.current, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2, // Very subtle background movement
                    invalidateOnRefresh: true,
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className='mt-20 mb-5 border-t w-full border-[#d3d3d3] pt-20 max-w-[1920px] mx-auto px-4 md:px-10'>

            {/* Process Section */}
            <div className='mb-20'>
                <div className='leading-none text-center gap-0 mb-12'>
                    {data?.processTitle && (
                        <TextAnimation
                            className='font-ppvalvestencil font-[400] text-[26px] sm:text-[53px] text-[#aea293] leading-tight'
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                            {data.processTitle}
                        </TextAnimation>
                    )}
                </div>

                {/* Process Steps */}
                {data?.processSteps?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {data.processSteps.map((processStep, index) => (
                            <div key={index} className='text-center'>
                                <div className='w-12 h-12 bg-[#ccc0b2] rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <span className='font-pp-neue font-bold text-black'>{index + 1}</span>
                                </div>
                                <TextAnimation
                                    className='font-pp-neue font-[500] text-[18px] text-black'
                                    stagger={0.06}
                                    y={30}
                                    duration={0.8}
                                    ease="power2.out"
                                    triggerPosition="top 80%"
                                    triggerActions="play none none none"
                                    blurEffect={true}
                                    delay={0.1 + index * 0.1}
                                >
                                    {processStep.step}
                                </TextAnimation>
                                {processStep.description && (
                                    <p className='font-pp-neue text-[14px] text-[#aea293] mt-2'>
                                        {processStep.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Testimonials Section */}
            <div className='mb-20'>
                <div className='leading-none text-center gap-0 mb-12'>
                    {data?.testimonialsTitle && (
                        <TextAnimation
                            className='font-ppvalvestencil font-[400] text-[26px] sm:text-[53px] text-[#aea293] leading-tight'
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                            {data.testimonialsTitle}
                        </TextAnimation>
                    )}
                </div>

                {data?.testimonials?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
                        {data.testimonials.map((testimonial, index) => (
                            <div key={index} className='text-center p-6'>
                                {testimonial.quote && (
                                    <TextAnimation
                                        className='font-pp-neue text-[18px] text-[#aea293] italic mb-4'
                                        stagger={0.06}
                                        y={30}
                                        duration={0.8}
                                        ease="power2.out"
                                        triggerPosition="top 80%"
                                        triggerActions="play none none none"
                                        blurEffect={true}
                                        delay={0.1 + index * 0.2}
                                    >
                                        «{testimonial.quote}»
                                    </TextAnimation>
                                )}
                                {testimonial.author && (
                                    <TextAnimation
                                        className='font-pp-neue font-[500] text-[16px] text-black'
                                        stagger={0.06}
                                        y={30}
                                        duration={0.8}
                                        ease="power2.out"
                                        triggerPosition="top 80%"
                                        triggerActions="play none none none"
                                        blurEffect={true}
                                        delay={0.2 + index * 0.2}
                                    >
                                        – {testimonial.author}
                                    </TextAnimation>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='border-t w-full border-[#d3d3d3]' />
        </div>
    )
}

export default RegisterYourInterest     