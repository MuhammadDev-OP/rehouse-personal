'use client';

import React, { useEffect, useRef } from 'react';
import TextAnimation from '../../TextAnimation';
// Alternative: Use this import if you still experience hydration issues
// import TextAnimation from '../../TextAnimationWrapper';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const Modernity = ({ data }) => {
    const containerRef = useRef(null);
    const propertyImageRef = useRef(null);
    const neighbourhoodImageRef = useRef(null);
    const router = useRouter()

    const propertyImgRef = useRef(null);
    const neighbourhoodImgRef = useRef(null);
    const text1880Ref = useRef(null);
    const centerTextRef = useRef(null);

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

            // Center text parallax effect
            gsap.to(centerTextRef.current, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: centerTextRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1, // Smooth center text movement
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
        <div ref={containerRef} className='sm:mt-20 mt-5 min-h-screen relative max-w-[1920px] mx-auto px-4 md:px-10'>
            <div className='leading-none gap-0'>
                {data?.sectionTitle1 && (
                    <TextAnimation
                        className="font-ppvalvestencil font-[400] text-[40px] sm:text-[70px] md:text-[100px] text-[#ccc0b2] leading-tight"
                        stagger={0.06}
                        y={80}
                        duration={1.2}
                        ease="power2.out"
                        triggerPosition="top 70%"
                        triggerActions="play none none none"
                        blurEffect={true}
                        delay={0.2}
                    >
                        {data.sectionTitle1}
                    </TextAnimation>
                )}

                {data?.sectionTitle2 && (
                    <TextAnimation
                    className='font-ppvalvestencil font-[400] -mt-[0.5rem] sm:-mt-[2rem] text-[40px] sm:text-[70px] md:text-[100px] text-[#ccc0b2] leading-tight'
                    stagger={0.06}
                    y={80}
                    duration={1.2}
                    ease="power2.out"
                    triggerPosition="top 70%"
                    triggerActions="play none none none"
                    blurEffect={true}
                    delay={0.2}
                >
                    {data?.sectionTitle2 || 'Prosjekter'}
                </TextAnimation>
                )}
            </div>

            {/* Three Column Layout */}
            <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
                {/* Column 1: A Landmark + Property Image + Iconic */}
                <div className='flex flex-col gap-y-8'>
                    {/* Portfolio intro */}
                    {data?.introText && (
                    <div>
                        <TextAnimation
                            className='font-pp-neue font-[500] text-[22px] text-black leading-tight'
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 70%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                                {data.introText}
                        </TextAnimation>
                    </div>
                    )}
                    <div className='relative sm:hidden block'>
                        <div className='flex justify-end items-end'>
                            <Image src="/assets/1880-door.png" alt="1880" width={1080} height={1080} className='w-[200px]' />

                        </div>

                        <div className='text-right left-6 -mt-[9rem]  absolute '>
                            <span ref={text1880Ref} className='font-ppvalvestencil  text-[100px] lg:text-[200px] text-[#ccc0b2] opacity-20 leading-none'>
                                2025
                            </span>
                        </div>
                    </div>
                    {/* Property Image Card */}
                    <div className='space-y-4 cursor-pointer '>
                        <div ref={propertyImageRef} className='w-full h-[400px] sm:h-[700px] overflow-hidden '>
                            <img
                                ref={propertyImgRef}
                                src="/assets/carousel-img-1.jpg"
                                alt="Heritage Building"
                                className='w-full h-full object-cover will-change-transform'
                                style={{ transform: 'translate3d(0,0,0)' }}
                            />
                        </div>

                        {/* Project Label and Learn More */}
                        <div className='flex items-center justify-between'>
                            <span className='font-pp-neue text-[18px] sm:text-[21px] font-medium text-black'>
                                Rødtvetveien 35
                            </span>
                            <button onClick={() => router.push("/portfolio")} className='bg-[#ccc0b2] text-black px-10 py-2 rounded-full font-pp-neue text-[18px] font-medium hover:bg-[#b8ab9a] transition-colors'>
                                Se prosjekt
                            </button>
                        </div>
                    </div>

                    {/* Iconic Text */}
                    <div className='mt-8  items-end gap-5 relative sm:flex hidden'>
                        <Image src="/assets/iconic.png" alt="Iconic" width={1080} height={1080} className='w-[150px]' />
                        <span ref={text1880Ref} className='font-ppvalvestencil text-[40px] lg:text-[150px] text-[#ccc0b2] opacity-20 leading-none'>
                            iconic
                        </span>
                    </div>
                </div>

                {/* Column 2: Center Description Text */}
                <div className='flex items-center justify-center h-full'>
                    <div ref={centerTextRef} className='text-center max-w-md sm:mt-0 mt-10'>
                        <p className='font-pp-neue text-[20px] lg:text-[33px] font-[500] text-[#aea293] leading-relaxed'>
                            {data?.aboutText || 'Elektriker under utdanning, praktisk renovatør. Jeg leder små, effektive team og leverer målbare før/etter-resultater på stramme tidslinjer.'}
                        </p>
                    </div>
                </div>

                {/* Column 3: 1880 Text + Neighbourhood Image */}
                <div className='flex flex-col space-y-8  ml-auto'>
                    {/* 1880 Text */}
                    <div className='relative sm:block hidden'>
                        <div className='flex justify-end items-end'>
                            <Image src="/assets/1880-door.png" alt="1880" width={1080} height={1080} className='w-[200px]' />

                        </div>

                        <div className='text-right -left-[12rem] -mt-[9rem]  absolute '>
                            <span ref={text1880Ref} className='font-ppvalvestencil  text-[80px] lg:text-[200px] text-[#ccc0b2] opacity-20 leading-none'>
                                2025
                            </span>
                        </div>
                    </div>

                    {/* Second Featured Project */}
                    {data?.featuredProjects?.[1] && (
                        <div className='space-y-4 sm:mt-20 mt-10 cursor-pointer '>
                            <div ref={neighbourhoodImageRef} className='w-full h-[400px] sm:h-[700px] overflow-hidden '>
                                <img
                                    ref={neighbourhoodImgRef}
                                    src={data.featuredProjects[1].afterImages?.[0] ? urlFor(data.featuredProjects[1].afterImages[0]).width(800).height(700).url() : "/assets/carousel-img-2.jpg"}
                                    alt={data.featuredProjects[1].title}
                                    className='w-full h-full object-cover will-change-transform'
                                    style={{ transform: 'translate3d(0,0,0)' }}
                                />
                            </div>

                            {/* Project Label and Learn More */}
                            <div className='flex items-center justify-between'>
                                <span className='font-pp-neue text-[18px] sm:text-[21px] font-medium text-black'>
                                    {data.featuredProjects[1].title}
                                </span>
                                <Link href={`/portfolio/${data.featuredProjects[1].slug.current}`}>
                                    <button className='bg-[#ccc0b2] text-black px-10 py-2 rounded-full font-pp-neue text-[18px] font-medium hover:bg-[#b8ab9a] transition-colors'>
                                        Se prosjekt
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className='mt-8  items-end gap-5 relative sm:hidden flex'>
                        <Image src="/assets/iconic.png" alt="Iconic" width={1080} height={1080} className='w-[100px]' />
                        <span className='font-ppvalvestencil text-[68px] text-[#ccc0b2] opacity-20 leading-none'>
                            iconic
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modernity