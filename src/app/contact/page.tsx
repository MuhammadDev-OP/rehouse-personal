'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextAnimation from '@/components/TextAnimation';
import ContactForm from '@/components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef(null);
    const contactImageRef = useRef(null);
    const contactImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Contact image parallax effect
            gsap.fromTo(contactImgRef.current,
                {
                    y: -150,
                    scale: 1.1,
                },
                {
                    y: 150,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: contactImageRef.current,
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
                            Kontakt
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
                            Ta kontakt med oss for å diskutere ditt neste prosjekt. Vi er her for å realisere din visjon med vår ekspertise innen arkitektur og design.
                        </TextAnimation>
                    </div>
                    <div ref={contactImageRef} className='w-full xl:w-1/3 h-[400px] xl:h-[600px] overflow-hidden'>
                        <img
                            ref={contactImgRef}
                            src="/assets/carousel-img-1.jpg"
                            alt="Contact Us"
                            className='w-full h-full object-cover will-change-transform'
                        />
                    </div>
                </div>
            </div>
            
            {/* Contact Form Section */}
            <div className="px-4 sm:px-10 py-16">
                <ContactForm />
            </div>
        </>
        
    );
}