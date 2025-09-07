'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import TextAnimation from '@/components/TextAnimation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { portfolioQuery } from '@/sanity/lib/queries';
import Loader from '@/components/ui/Loader';

gsap.registerPlugin(ScrollTrigger);



export default function PortfolioPage() {
    const containerRef = useRef(null);
    const imageRefs = useRef([]);
    const router = useRouter();
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch portfolio data from Sanity
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                setLoading(true);
                const data = await client.fetch(portfolioQuery);
                setPortfolioData(data);
            } catch (err) {
                console.error('Error fetching portfolio data:', err);
                setError('Failed to load portfolio data');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    // GSAP animations
    useEffect(() => {
        if (portfolioData.length === 0) return;

        const ctx = gsap.context(() => {
            // Optimized image parallax effects for each portfolio item
            imageRefs.current.forEach((imgRef, index) => {
                if (imgRef) {
                    gsap.fromTo(imgRef,
                        {
                            y: -50,
                            scale: 1.05,
                        },
                        {
                            y: 50,
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: imgRef.parentElement,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1.5, // Increased for smoother performance
                                invalidateOnRefresh: true,
                                refreshPriority: -1, // Lower priority
                            }
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [portfolioData]);

    // Loading state
    if (loading) {
        return (
            <div ref={containerRef} className="mt-20 flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <Loader size="32px" />
                    <p className="mt-4 text-[#CCC0B2] font-pp-neue">Loading Portfolio...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div ref={containerRef} className="mt-20 text-center">
                <div className="bg-red-50 border border-red-200 p-8">
                    <h3 className="text-red-800 font-semibold text-lg mb-2">Error Loading Portfolio</h3>
                    <p className="text-red-600">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (portfolioData.length === 0) {
        return (
            <div ref={containerRef} className="mt-20 text-center">
                <div className="bg-gray-50 border border-gray-200 p-8">
                    <h3 className="text-gray-800 font-semibold text-lg mb-2">No Portfolio Projects</h3>
                    <p className="text-gray-600">No portfolio projects have been added yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="mt-20 space-y-20">
            {portfolioData.map((project, index) => {
                const isEven = index % 2 === 0;
                const heroImageUrl = project.heroImage ? urlFor(project.heroImage).width(800).height(600).url() : null;

                return (
                    <div key={project._id} className={`flex xl:flex-row flex-col gap-8 xl:gap-16 items-center ${!isEven ? 'xl:flex-row-reverse' : ''}`}>
                        {/* Image Section */}
                        <div className="w-full xl:w-1/2 h-[400px] xl:h-[500px] overflow-hidden">
                            {heroImageUrl ? (
                                <img
                                    ref={el => imageRefs.current[index] = el}
                                    src={heroImageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover will-change-transform"
                                    style={{ transform: 'translate3d(0,0,0)' }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="w-full xl:w-1/2 flex flex-col gap-6">
                            <div className="space-y-4">
                                <TextAnimation
                                    className="font-pp-neue font-[400] text-[14px] text-[#CCC0B2] uppercase tracking-wider"
                                    stagger={0.02}
                                    y={30}
                                    duration={0.8}
                                    ease="power2.out"
                                    triggerPosition="top 85%"
                                    triggerActions="play none none none"
                                    blurEffect={true}
                                    delay={0.1}
                                >
                                    {project.category}
                                </TextAnimation>

                                <TextAnimation
                                    className="font-ppvalvestencil font-[400] text-[32px] sm:text-[48px] md:text-[56px] text-[#ccc0b2] leading-tight"
                                    stagger={0.04}
                                    y={60}
                                    duration={1}
                                    ease="power2.out"
                                    triggerPosition="top 85%"
                                    triggerActions="play none none none"
                                    blurEffect={true}
                                    delay={0.2}
                                >
                                    {project.title}
                                </TextAnimation>

                                <TextAnimation
                                    className="font-pp-neue font-[400] text-[16px] md:text-[18px] text-black leading-relaxed max-w-[600px]"
                                    stagger={0.01}
                                    y={40}
                                    duration={0.9}
                                    ease="power2.out"
                                    triggerPosition="top 85%"
                                    triggerActions="play none none none"
                                    blurEffect={true}
                                    delay={0.3}
                                >
                                    {project.description}
                                </TextAnimation>
                            </div>

                            {/* View Details Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => router.push(`/portfolio/${project.slug.current}`)}
                                    className="bg-[#CCC0B2] hover:bg-[#B4A698] transition-colors duration-300 cursor-pointer rounded-full px-8 py-3 text-black font-pp-neue font-[500] text-[16px]"
                                >
                                    Se detaljer
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}