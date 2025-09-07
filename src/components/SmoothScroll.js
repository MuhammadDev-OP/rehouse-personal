'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Register the ScrollSmoother and ScrollTrigger plugins
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    // Create the smooth scroller with optimized settings
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.5, // Reduced for better performance
      effects: false, // Disabled to prevent interference with hover effects
      normalizeScroll: true,
      ignoreMobileResize: true,
      ease: "power2.out", // Smoother easing
      preventDefault: false, // Allow normal hover interactions
      allowNestedScroll: true, // Better compatibility with other interactions
      smoothTouch: false, // Disable smooth scrolling on touch devices
      renderFixed: true, // Better handling of fixed elements
    });

    // Improve performance for hover interactions
    ScrollTrigger.config({
      limitCallbacks: true, // Limit callback frequency
      syncInterval: 50, // Reduce sync frequency for better performance
    });

    // Refresh ScrollTrigger to account for fixed header
    ScrollTrigger.refresh();

    return () => {
      // Cleanup
      smoother && smoother.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
} 