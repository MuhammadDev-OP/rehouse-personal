'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({ 
  children, 
  className = '', 
  stagger = 0.05, 
  y = 30, 
  duration = 0.8, 
  ease = "power2.out",
  triggerPosition = "top 80%",
  triggerActions = "play none none none",
  blurEffect = false,
  popScale = 1.2,
  delay = 0
}) => {
  const textRef = useRef(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useLayoutEffect(() => {
    setIsHydrated(true); // Ensures spans only render on client

    let ctx;
    const timeout = setTimeout(() => {
      if (!textRef.current) return;

      const wordElements = textRef.current.querySelectorAll('.word-inner');

      // Set initial animation state
      gsap.set(wordElements, {
        y: y,
        opacity: 0,
        filter: blurEffect ? 'blur(10px)' : 'none',
        scale: popScale !== 1.2 ? 0.8 : 1
      });

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: textRef.current,
          start: triggerPosition,
          toggleActions: triggerActions,
          once: triggerActions.includes('play none none none'),
          onEnter: () => {
            const tl = gsap.timeline();
            
            // Main animation
            tl.to(wordElements, {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: popScale !== 1.2 ? 1 : 1,
              duration,
              ease,
              stagger,
              delay,
            });

            // Add pop effect if specified
            if (popScale !== 1.2) {
              tl.to(wordElements, {
                scale: popScale,
                duration: 0.1,
                ease: "power2.out",
                stagger: stagger
              }, `-=${duration * 0.5}`)
              .to(wordElements, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
                stagger: stagger
              }, `-=${duration * 0.3}`);
            }
          },
        });
      }, textRef);
    }, 20); // 1 frame delay for font/layout stabilization

    return () => {
      clearTimeout(timeout);
      ctx?.revert();
    };
  }, [children, stagger, y, duration, ease, triggerPosition, triggerActions, blurEffect, popScale, delay]);

  // Split words on first client render only - prevents hydration mismatch
  const renderWords = (text) => {
    // Ensure text is a string before splitting
    const textString = typeof text === 'string' ? text : String(text);
    const words = textString.split(' ');
    return words.map((word, i) => (
      <span key={i}>
        <span className="inline-block overflow-hidden">
          <span className="inline-block word-inner">{word}</span>
        </span>
        {i < words.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <div 
      ref={textRef} 
      className={className}
      style={{
        visibility: isHydrated ? 'visible' : 'hidden'
      }}
    >
      {isHydrated ? renderWords(children) : children}
    </div>
  );
};

export default TextAnimation; 