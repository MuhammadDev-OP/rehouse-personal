"use client";

import React from 'react';
import TextAnimation from '../../TextAnimation';

const Stats = ({ data }) => {
    const statsData = data?.statsData || {
        type: "Leilighet",
        acquisitionDate: "Mars 2024",
        size: "65 m²",
        location: "Grünerløkka",
        timeline: "8 uker",
        result: "Solgt over takst"
    };

    const headers = [
        "Type",
        "Oppkjøp",
        "Størrelse", 
        "Område",
        "Tidsramme",
        "Resultat"
    ];

    const values = Object.values(statsData);

    return (
        <div className="mx-auto px-4 sm:px-6 md:px-10">
            {/* Mobile Layout - Stacked Cards */}
            <div className="block sm:hidden space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center ">
                {headers.map((header, index) => (
                    <div key={`mobile-${index}`} className={`p-4 ${index === 1 || index === 3 || index === 5 ? '' : 'border-r border-[#aea293]/80'}`}>
                        <TextAnimation
                            className="font-pp-neue font-[500] text-[16px] text-[#aea293] mb-2"
                            stagger={0.06}
                            y={30}
                            duration={0.8}
                            ease="power2.out"
                            triggerPosition="top 80%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.1 + index * 0.1}
                        >
                            {header}
                        </TextAnimation>
                        <TextAnimation
                            className="font-pp-neue font-medium text-[18px] text-black"
                            stagger={0.06}
                            y={30}
                            duration={0.8}
                            ease="power2.out"
                            triggerPosition="top 80%"
                            triggerActions="play none none none"
                            blurEffect={true}
                            delay={0.4 + index * 0.1}
                        >
                            {values[index]}
                        </TextAnimation>
                    </div>
                ))}
              </div>
            </div>

            {/* Tablet Layout - 2 columns */}
            <div className="hidden sm:block lg:hidden">
                <div className="grid grid-cols-2 gap-4 text-center">
                    {headers.map((header, index) => (
                        <div key={`tablet-${index}`} className={`p-4 ${index === 1 || index === 3 || index === 5 ? '' : 'border-r border-[#aea293]/80'}`}>
                            <TextAnimation
                                className="font-pp-neue font-[500] text-[16px] text-[#aea293] mb-2"
                                stagger={0.06}
                                y={30}
                                duration={0.8}
                                ease="power2.out"
                                triggerPosition="top 80%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1 + index * 0.1}
                            >
                                {header}
                            </TextAnimation>
                            <TextAnimation
                                className="font-pp-neue font-medium text-[18px] text-black"
                                stagger={0.06}
                                y={30}
                                duration={0.8}
                                ease="power2.out"
                                triggerPosition="top 80%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.4 + index * 0.1}
                            >
                                {values[index]}
                            </TextAnimation>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Layout - Original 6 column grid */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-6 text-center">
                    {headers.map((header, index) => (
                        <div
                            key={`header-${index}`}
                            className={`pt-8 flex justify-center items-center ${index < headers.length - 1 ? 'border-r border-[#aea293]/80' : ''
                                }`}
                        >
                            <TextAnimation
                                className="font-pp-neue font-[500] text-[16px] md:text-[21px] text-[#aea293]"
                                stagger={0.06}
                                y={30}
                                duration={0.8}
                                ease="power2.out"
                                triggerPosition="top 80%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.1 + index * 0.1}
                            >
                                {header}
                            </TextAnimation>
                        </div>
                    ))}

                    {values.map((value, index) => (
                        <div
                            key={`value-${index}`}
                            className={`-mt-[1rem] pb-6 flex justify-center items-center ${index < values.length - 1 ? 'border-r border-[#aea293]/80' : ''
                                } ${index === values.length - 1 ? 'mt-6' : ''}`}
                        >
                            <TextAnimation
                                className="font-pp-neue font-medium px-3 text-[18px] md:text-[21px] text-black"
                                stagger={0.06}
                                y={30}
                                duration={0.8}
                                ease="power2.out"
                                triggerPosition="top 80%"
                                triggerActions="play none none none"
                                blurEffect={true}
                                delay={0.4 + index * 0.1}
                            >
                                {value}
                            </TextAnimation>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
