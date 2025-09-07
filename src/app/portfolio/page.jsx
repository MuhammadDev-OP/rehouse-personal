'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextAnimation from '@/components/TextAnimation';
import PortfolioPage from '@/components/pages/portfoliopage/Portfolio';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef(null);
    const propertyImageRef = useRef(null);
    const propertyImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Property image parallax effect
            gsap.fromTo(propertyImgRef.current,
                {
                    y: -150,
                    scale: 1.1,
                },
                {
                    y: 150,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: propertyImageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.3,
                        invalidateOnRefresh: true,
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);
    return (
        <>
            <div ref={containerRef} className="pt-[80px] md:pt-[100px] px-4 sm:px-10">
                <div className="flex xl:flex-row flex-col justify-between w-full items-center h-full">

                    <div className="flex flex-col xl:justify-start xl:items-start justify-center items-center gap-0">

                        <TextAnimation
                            className='font-ppvalvestencil font-[400] text-[50px] sm:text-[70px] md:text-[120px] text-[#ccc0b2] leading-tight'
                            stagger={0.06}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 90%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.1}
                        >
                            Portefølje
                        </TextAnimation>
                        <TextAnimation
                            className='font-pp-neue xl:text-left text-center lg:-mt-[2rem] max-w-[700px] font-[500] text-[18px] text-black leading-tight'
                            stagger={0.01}
                            y={80}
                            duration={1.2}
                            ease="power2.out"
                            triggerPosition="top 90%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.2}
                        >
                           Dette er en portefølje over tidligere boligprosjekter jeg har utviklet og totalrenovert. Nettsiden gir et innblikk i arbeidet mitt de siste årene – med før  og etterbilder, prosjektbeskrivelser og nøkkeltall for å vise prosess og resultat.
                        </TextAnimation>
                    </div>
                    <div ref={propertyImageRef} className='w-full xl:w-1/3 h-[400px] xl:h-[600px] overflow-hidden '>
                        <img
                            ref={propertyImgRef}
                            src="/assets/carousel-img-1.jpg"
                            alt="Heritage Building"
                            className='w-full h-full object-cover will-change-transform'
                            style={{ transform: 'translate3d(0,0,0)' }}
                        />
                    </div>

                </div>
                <div>
                    <PortfolioPage />
                </div>
            </div>
            <Footer />
        </>
    )

}