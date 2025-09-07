'use client';

import { useEffect, useState } from 'react';
import Footer from "@/components/layout/Footer";
import Hero from "@/components/pages/Landingpage/Hero";
import Modernity from "@/components/pages/Landingpage/Modernity";
import RegisterYourInterest from "@/components/pages/Landingpage/RegisterYourInterest";
import Stats from "@/components/pages/Landingpage/Stats";
import Unlock from "@/components/pages/Landingpage/Unlock";
import { client } from '@/sanity/lib/client';
import { landingPageQuery } from '@/sanity/lib/queries';
import Loader from "@/components/ui/Loader";

export default function Home() {
  const [landingPageData, setLandingPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const data = await client.fetch(landingPageQuery);
        setLandingPageData(data);
      } catch (error) {
        console.error('Error fetching landing page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="32px" />
       
        </div>
      </div>
    );
  }

  return (
    <>
      <main className=" pt-[60px] md:pt-[80px] ">
        <Hero />
        <Modernity data={landingPageData?.portfolioSection} />
        <Stats data={landingPageData?.statsSection} />
        <RegisterYourInterest data={landingPageData?.processSection} />
        <Stats data={landingPageData?.statsSection} />
        <Unlock data={landingPageData?.heroSection} />
        <Footer />
      </main>
    </>
  );
}
