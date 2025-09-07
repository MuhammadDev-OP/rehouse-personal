'use client';

import React, { useEffect, useRef } from 'react';
import TextAnimation from '../../TextAnimation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Unlock = ({ data }) => {
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
        <div className="relative max-w-[1920px] mx-auto px-4 md:px-10 mt-16">
            {/* Hero Image */}
            <div ref={propertyImageRef} className="w-full h-[660px] overflow-hidden">
                <img
                    ref={propertyImgRef}
                    src={
                        data?.heroImage
                            ? urlFor(data.heroImage).width(1200).height(660).url()
                            : "/assets/unlock.jpg"
                    }
                    alt="Hero Background"
                    className="w-full h-full object-cover will-change-transform brightness-50"
                    style={{ transform: "translate3d(0,0,0)" }}
                />
            </div>

            {/* Overlay Text + CTA */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <div className="flex flex-col justify-center items-start gap-6 pl-0 sm:pl-16 md:pl-16 lg:pl-20">
                    <div className="leading-none text-center sm:text-left gap-0 px-10 sm:px-0">
                        {/* Title */}
                        {data?.title && (
                        <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[53px] text-[#f8f2eb] leading-tight"
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                                {data.title}
                        </TextAnimation>
                        )}

                        {/* Subtitle 1 */}
                        {data?.subtitle1 && (
                        <TextAnimation
                                className="font-pp-neue font-[500] text-[22px] sm:text-[23px] text-[#ccc0b2] leading-tight"
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                                {data.subtitle1}
                        </TextAnimation>
                        )}

                        {/* Subtitle 2 */}
                        {data?.subtitle2 && (
                        <TextAnimation
                                className="font-pp-neue font-[500] text-[22px] sm:text-[23px] sm:-mt-2 text-[#ccc0b2] leading-tight"
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                                {data.subtitle2}
                        </TextAnimation>
                        )}
                    </div>

                    {/* CTA Button */}
                    {data?.ctaText && (
                        <Link
                            href={data?.ctaLink || "/portfolio"}
                            className="flex justify-center items-center w-full md:justify-start md:items-start"
                        >
                        <AnimatedButton
                                className="text-black hover:bg-[#B4A698] sm:mx-0 mx-auto ease-in duration-150 transition-all bg-[#CCC0B2] font-medium text-[18px] rounded-full px-10 py-2.5"
                            y={30}
                            duration={0.8}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.4}
                        >
                                {data.ctaText}
                        </AnimatedButton>
                    </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Unlock