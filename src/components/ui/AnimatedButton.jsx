'use client';

import { useEffect, useRef } from 'react';

const AnimatedButton = ({ 
  children, 
  className = '', 
  y = 80, 
  duration = 1.2, 
  ease = "power2.out",
  triggerPosition = "top 70%",
  triggerActions = "play none none none",
  blurEffect = true,
  delay = 0.2,
  onClick,
  type = "button",
  ...props
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await import('gsap/all');
      
      if (!buttonRef.current) return;

      // Set initial state with blur and y offset
      gsap.set(buttonRef.current, { 
        y: y,
        opacity: 0,
        filter: blurEffect ? 'blur(10px)' : 'none',
      });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: buttonRef.current,
          start: triggerPosition,
          toggleActions: triggerActions,
          once: triggerActions.includes('play none none none')
        }
      });

      // Animate button from bottom to top with blur effect
      tl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: duration,
        ease: ease,
        delay: delay
      });
    };

    initAnimation();

    return () => {
      if (typeof window !== 'undefined') {
        const { ScrollTrigger } = require('gsap/all');
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === buttonRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [y, duration, ease, triggerPosition, triggerActions, blurEffect, delay]);

  return (
    <button 
      ref={buttonRef} 
      className={className}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton; 