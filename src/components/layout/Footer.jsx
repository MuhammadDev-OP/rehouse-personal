import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='max-w-[1920px] mx-auto mt-20 h-full w-full relative'>
      <div className='px-10 hidden sm:block'>
        <div className='pt-16 border-t border-[#aea293]/80 relative min-h-[400px] w-full flex flex-col '>
          <div className='flex justify-between items-start w-full flex-1'>
            <div className='w-1/2'>
              <Link href="/" className="absolute top-20 left-0 z-[9999] text-[25px] xl:text-[30px] font-medium text-black" style={{ fontFamily: 'Portal, sans-serif' }}>
                Rehouse
              </Link>
              <Image
                src="/assets/footer-img.jpg"
                alt="footer-logo"
                width={1080}
                height={1080}
                className='w-[700px] absolute object-cover opacity-50 object-top left-0 -translate-x-10 top-16'
              />

            </div>
            <div className='w-1/2'>
              <div className='flex gap-10 '>
                <div className='flex-col flex items-start gap-4 font-medium text-base md:text-[18px]'>
                  <div>
                    <Link href="/portfolio" className='hover:opacity-75'>Portefølje</Link>
                  </div>
                  <div>
                    <Link href="/contact" className='hover:opacity-75'>Kontakt oss</Link>
                  </div>
                  <div>
                    <Link href="/privacy-policy" className='hover:opacity-75'>Personvernerklæring</Link>
                  </div>
                  <div>
                    <Link href="https://linkedin.com" className='hover:opacity-75'>LinkedIn</Link>
                  </div>

                </div>
                <div className='flex-col flex items-start gap-4  font-medium text-base md:text-[18px]'>
                  <div>
                    <p className='hover:opacity-75'>Oslo, Norway</p>
                  </div>
                  <div>
                    <a href="mailto:salman@rehouse.no" className='hover:opacity-75'>salman@rehouse.no</a>
                  </div>
                  <div>
                    <a href="tel:+4712345678" className='hover:opacity-75'>+47 123 45 678</a>
                  </div>
                  <div>
                    <p className='hover:opacity-75'>© Rehouse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-end justify-end  w-full'>


          </div>
        </div>

      </div>

      {/* mobile view  */}
      <div className='w-full px-4'>
        <div className=' border-t border-[#aea293]/80 ' />

      </div>
      <div className='pt-6 relative min-h-[400px] w-full flex sm:hidden flex-col justify-center items-center '>
        <Link href={'/'} className='z-[9999] text-[25px] font-medium text-black' style={{ fontFamily: 'Portal, sans-serif' }}>
          REHOUSE
        </Link>
        <div className='flex gap-2 mt-4 flex-col '>
          <div className='flex-col flex items-center gap-2 font-medium text-base md:text-[18px]'>
            <div><Link href="/portfolio" className='hover:opacity-75'>Portefølje</Link></div>
            <div><Link href="/contact" className='hover:opacity-75'>Kontakt oss</Link></div>
            <div><Link href="/privacy-policy" className='hover:opacity-75'>Personvernerklæring</Link></div>
            <div><Link href="https://linkedin.com" className='hover:opacity-75'>LinkedIn</Link></div>

          </div>
          <div className='flex-col flex items-center gap-2  font-medium text-base md:text-[18px]'>
            <div>
              <p className='hover:opacity-75'>Oslo, Norway</p>
            </div>
            <div>
              <a href="mailto:salman@rehouse.no" className='hover:opacity-75'>salman@rehouse.no</a>
            </div>
            <div>
              <a href="tel:+4712345678" className='hover:opacity-75'>+47 123 45 678</a>
            </div>
            <div>
              <p className='hover:opacity-75'>© Rehouse</p>
            </div>
          </div>
        </div>




        <Image
          src="/assets/footer-img.jpg"
          alt="footer-logo"
          width={1080}
          height={1080}
          className='w-full mt-[-2rem] h-[350px] object-cover opacity-50 object-top'
        />

      </div>
    </div>
  )
}

export default Footer