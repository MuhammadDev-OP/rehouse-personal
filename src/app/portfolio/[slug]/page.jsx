'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams, useRouter } from 'next/navigation';
import TextAnimation from '@/components/TextAnimation';
import Footer from '@/components/layout/Footer';
import BeforeAfterCarousel from '@/components/BeforeAfterCarousel';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { portfolioBySlugQuery } from '@/sanity/lib/queries';
import Loader from '@/components/ui/Loader';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioDetail() {
    const params = useParams();
    const router = useRouter();
    const containerRef = useRef(null);
    const heroImageRef = useRef(null);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const data = await client.fetch(portfolioBySlugQuery, { slug: params.slug });
                if (data) {
                    setProject(data);
                } else {
                    // Redirect to portfolio if project not found
                    router.push('/portfolio');
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                router.push('/portfolio');
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchProject();
        }
    }, [params.slug, router]);

    useEffect(() => {
        if (!project) return;

        const ctx = gsap.context(() => {
            // Hero image parallax effect - only apply after image is loaded
            if (heroImageRef.current) {
                gsap.set(heroImageRef.current, {
                    y: 0,
                    scale: 1,
                    opacity: 1
                });

                gsap.fromTo(heroImageRef.current,
                    {
                        y: -50,
                        scale: 1.05,
                    },
                    {
                        y: 50,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: heroImageRef.current?.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.3,
                            invalidateOnRefresh: true,
                        }
                    }
                );
            }

            // Fade in animations
            gsap.fromTo('.detail-content',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.detail-content',
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [project]);

    if (loading || !project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader size="32px" />
                   
                </div>
            </div>
        );
    }

    const heroImageUrl = project.heroImage ? urlFor(project.heroImage).width(1200).height(800).url() : null;
    const beforeImages = project.beforeImages?.map(img => urlFor(img).width(800).height(600).url()) || [];
    const afterImages = project.afterImages?.map(img => urlFor(img).width(800).height(600).url()) || [];

    return (
        <>
            <div ref={containerRef} className="pt-[80px] md:pt-[80px]">
                {/* Hero Section */}
                <div className="relative h-[70vh] overflow-hidden">
                    {heroImageUrl ? (
                        <img
                            ref={heroImageRef}
                            src={heroImageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover will-change-transform"
                            style={{ transform: 'translate3d(0,0,0)' }}
                            onError={(e) => {
                                console.error('Hero image failed to load:', heroImageUrl);
                            }}
                            onLoad={() => {
                                console.log('Hero image loaded successfully:', heroImageUrl);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image Available</span>
                        </div>
                    )}
                    <div className="absolute inset-0 flex bg-black/50 items-end">
                        <div className="px-4 sm:px-10 pb-16 text-white">
                            <TextAnimation
                                className="font-pp-neue font-[400] text-[14px] text-white uppercase tracking-wider mb-4"
                                stagger={0.02}
                                y={30}
                                duration={0.8}
                                ease="power2.out"
                                triggerPosition="top 90%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                {project.category}
                            </TextAnimation>
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[40px] sm:text-[60px] md:text-[80px] text-white leading-tight"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 90%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.2}
                            >
                                {project.title}
                            </TextAnimation>
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="px-4 sm:px-10 py-20">
                    <div className=" mx-auto">
                        {/* Project Info Grid */}
                        <div className="detail-content grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            <div>
                                <h3 className="font-ppvalvestencil  text-[18px] text-[#CCC0B2] uppercase tracking-wider mb-2">Location</h3>
                                <p className="font-pp-neue text-[18px] text-black">{project.location}</p>
                            </div>
                            <div>
                                <h3 className="font-ppvalvestencil  text-[18px] text-[#CCC0B2] uppercase tracking-wider mb-2">Year</h3>
                                <p className="font-pp-neue text-[18px] text-black">{project.year}</p>
                            </div>
                            <div>
                                <h3 className="font-ppvalvestencil  text-[18px] text-[#CCC0B2] uppercase tracking-wider mb-2">Area</h3>
                                <p className="font-pp-neue text-[18px] text-black">{project.area}</p>
                            </div>
                            <div>
                                <h3 className="font-ppvalvestencil  text-[18px] text-[#CCC0B2] uppercase tracking-wider mb-2">Category</h3>
                                <p className="font-pp-neue text-[18px] text-black">{project.category}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="detail-content mb-20">
                            <TextAnimation
                                className="font-pp-neue font-[400] text-[18px] md:text-[20px] text-black leading-relaxed max-w-4xl"
                                stagger={0.01}
                                y={40}
                                duration={0.9}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                {project.fullDescription}
                            </TextAnimation>
                        </div>

                        {/* Before & After Section */}
                        {beforeImages.length > 0 && afterImages.length > 0 && (
                            <div className="detail-content">
                                <TextAnimation
                                    className="font-ppvalvestencil font-[400] text-[40px] sm:text-[60px] text-[#ccc0b2] leading-tight text-center mb-16"
                                    stagger={0.04}
                                    y={60}
                                    duration={1}
                                    ease="power2.out"
                                    triggerPosition="top 85%"
                                    triggerActions="play none none none"
                                    blurEffect={true}
                                    delay={0.1}
                                >
                                    Før & Etter
                                </TextAnimation>

                                <BeforeAfterCarousel
                                    beforeImages={beforeImages}
                                    afterImages={afterImages}
                                />
                            </div>
                        )}

                        {/* Back Button */}
                        <div className="detail-content text-center mt-20">
                            <button
                                onClick={() => router.push('/portfolio')}
                                className="bg-[#CCC0B2] hover:bg-[#B4A698] transition-all duration-300 cursor-pointer rounded-full px-12 py-4 text-black font-pp-neue font-[500] text-[16px] transform hover:scale-105"
                            >
                                Tilbake til Portefølje
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}