"use client"
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const tl = useRef(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut"
      })
      .from(menuRef.current.querySelectorAll('a, button'), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.2")
  }, [])

  useEffect(() => {
    if (isOpen) {
      tl.current.play()
      document.body.style.overflow = 'hidden'
    } else {
      tl.current.reverse()
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className='max-w-[1920px] mx-auto'>
      <div className='fixed-header flex items-center justify-between fixed top-0 left-0 w-full px-4 md:px-10 py-3 md:h-[80px] bg-[#F8F2EB] backdrop-blur-sm z-50 border-b border-transparent'>
        <Link href={'/'} className='text-[28px] xl:text-[51px] font-medium flex items-center gap-2 md:gap-4 z-[9999]'>
          <span className={`${isOpen ? 'text-white xl:text-black' : 'text-black'}`} style={{ fontFamily: 'Portal, sans-serif' }}>Rehouse</span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden lg:flex items-center md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 font-medium text-base md:text-[18px]'>
          <div>
            <Link href="/portfolio" className='hover:opacity-75'>Portefølje</Link>
          </div>
          <div>
            <Link href="/contact" className='hover:opacity-75'>Kontakt</Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className='lg:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6px] bg-white' : ''}`}></span>
          <span className={`w-10 h-0.5 bg-black my-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[10px] bg-white' : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          ref={menuRef}
          className='fixed top-0 right-0 w-full h-screen bg-black transform translate-x-full md:hidden flex flex-col items-center justify-center text-white gap-8 z-40'
        >
          <Link href="/portfolio" className='text-2xl hover:opacity-75' onClick={() => setIsOpen(false)}>Portefølje</Link>
          <Link href="/contact" className='text-2xl hover:opacity-75' onClick={() => setIsOpen(false)}>Kontakt</Link>
        </div>
      </div>
    </div>
  )
}

export default Header