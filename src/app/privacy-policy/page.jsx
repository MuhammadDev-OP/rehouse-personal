'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextAnimation from '@/components/TextAnimation';
import Footer from '@/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
    const containerRef = useRef(null);
    const heroImageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero image parallax effect
            gsap.fromTo(heroImageRef.current,
                {
                    y: -100,
                    scale: 1.1,
                },
                {
                    y: 100,
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

            // Fade in animations for content sections
            gsap.fromTo('.privacy-section',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: '.privacy-content',
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef} className="pt-[80px] md:pt-[100px]">
                {/* Hero Section */}
                <div className="px-4 sm:px-10 pb-20  min-h-[90vh] flex items-center">
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
                                Privacy Policy
                            </TextAnimation>
                            <TextAnimation
                                className="font-pp-neue font-[500] text-[18px] md:text-[25px] text-black leading-relaxed"
                                stagger={0.01}
                                y={40}
                                duration={0.9}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Rehouse ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                            </TextAnimation>
                        </div>
                       
                    </div>
                </div>

                {/* Privacy Policy Content */}
                <div className="privacy-content px-4 sm:px-10 pb-10">
                    <div className=" mx-auto">
                        
                       

                    

                        {/* Information We Collect */}
                        <div className="privacy-section mb-10">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Information We Collect
                            </TextAnimation>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-pp-neue font-[600] text-[20px] text-black mb-3">Personal Information</h3>
                                    <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                        We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="font-pp-neue font-[600] text-[20px] text-black mb-3">Automatically Collected Information</h3>
                                    <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                        We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and other technical information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Information */}
                        <div className="privacy-section mb-16">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                How We Use Your Information
                            </TextAnimation>
                            
                            <div className="space-y-4">
                                <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                    We use personal information collected via our website for a variety of business purposes described below:
                                </p>
                                <ul className="font-pp-neue text-[16px] text-black leading-relaxed space-y-2 ml-6">
                                    <li className="list-disc">To facilitate account creation and logon process</li>
                                    <li className="list-disc">To send you marketing and promotional communications</li>
                                    <li className="list-disc">To send administrative information to you</li>
                                    <li className="list-disc">To protect our services and investigate potential violations</li>
                                    <li className="list-disc">To respond to legal requests and prevent harm</li>
                                    <li className="list-disc">To manage user accounts and provide customer service</li>
                                </ul>
                            </div>
                        </div>

                        {/* Information Sharing */}
                        <div className="privacy-section mb-16">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Information Sharing
                            </TextAnimation>
                            
                            <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                We may process or share your data that we hold based on the following legal basis: consent, legitimate interests, performance of a contract, compliance with legal obligations, and protection of vital interests. We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                            </p>
                        </div>

                        {/* Data Security */}
                        <div className="privacy-section mb-16">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Data Security
                            </TextAnimation>
                            
                            <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div className="privacy-section mb-16">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Your Privacy Rights
                            </TextAnimation>
                            
                            <div className="space-y-4">
                                <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                    In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may:
                                </p>
                                <ul className="font-pp-neue text-[16px] text-black leading-relaxed space-y-2 ml-6">
                                    <li className="list-disc">Request access and obtain a copy of your personal information</li>
                                    <li className="list-disc">Request rectification or erasure of your personal information</li>
                                    <li className="list-disc">Restrict the processing of your personal information</li>
                                    <li className="list-disc">Request data portability</li>
                                    <li className="list-disc">Withdraw your consent at any time</li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="privacy-section mb-16">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Contact Us
                            </TextAnimation>
                            
                            <div className="space-y-4">
                                <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                    If you have questions or comments about this policy, you may contact us at:
                                </p>
                                <div className="bg-[#F8F2EB] p-6 rounded-lg">
                                    <p className="font-pp-neue font-[600] text-[18px] text-black mb-2">Rehouse</p>
                                    <p className="font-pp-neue text-[16px] text-black">Ethn. Antistaseos Ave., Tsamadou Str.</p>
                                    <p className="font-pp-neue text-[16px] text-black">Piraeus, Greece</p>
                                    <p className="font-pp-neue text-[16px] text-black mt-2">Email: [email]</p>
                                </div>
                            </div>
                        </div>

                        {/* Updates to Policy */}
                        <div className="privacy-section mb-16">
                            <TextAnimation
                                className="font-ppvalvestencil font-[400] text-[32px] sm:text-[40px] text-[#ccc0b2] leading-tight mb-8"
                                stagger={0.04}
                                y={60}
                                duration={1}
                                ease="power2.out"
                                triggerPosition="top 85%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1}
                            >
                                Updates to This Policy
                            </TextAnimation>
                            
                            <p className="font-pp-neue text-[16px] text-black leading-relaxed">
                                We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
                            </p>
                        </div>

                        {/* Back to Home Button */}
                        <div className="privacy-section text-center">
                            <a
                                href="/"
                                className="bg-[#CCC0B2] hover:bg-[#B4A698] transition-all duration-300 cursor-pointer rounded-full px-12 py-4 text-black font-pp-neue font-[500] text-[16px] transform hover:scale-105 inline-block"
                            >
                                Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}