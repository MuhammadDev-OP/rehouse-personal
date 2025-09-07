/**
 * Migration script to create initial landing page content in Sanity
 * Run this script after setting up the schema to populate initial content
 */

import { client } from '../src/sanity/lib/client.js';

const initialLandingPageContent = {
  _type: 'landingPage',
  heroSection: {
    title: 'Rehouse – flips som faktisk løfter verdien',
    subtitle1: 'Jeg heter Salman. Jeg kjøper, totalrenoverer og optimaliserer leiligheter i Oslo –',
    subtitle2: 'smart planløsning, solid utførelse og dokumentert samsvar.',
    ctaText: 'Se portefølje',
    ctaLink: '/portfolio',
    // heroImage: null, // Admin will upload this
  },
  portfolioSection: {
    sectionTitle1: 'Nylige',
    sectionTitle2: 'Prosjekter',
    introText: 'Nylige prosjekter med etter-bilde, nøkkelpunkter og lenke til detaljside.',
    aboutText: 'Elektriker under utdanning, praktisk renovatør. Jeg leder små, effektive team og leverer målbare før/etter-resultater på stramme tidslinjer.',
    // featuredProjects: [], // Admin will select these
  },
  statsSection: {
    statsData: {
      type: 'Leilighet',
      acquisitionDate: 'Mars 2024',
      size: '65 m²',
      location: 'Grünerløkka',
      timeline: '8 uker',
      result: 'Solgt over takst',
    },
  },
  processSection: {
    processTitle: 'Slik jobber jeg',
    processSteps: [
      { step: 'Behov & mål' },
      { step: 'Plan & tilbud' },
      { step: 'Utførelse & oppfølging' },
      { step: 'Leveranse med FDV/samsvar' },
    ],
    testimonialsTitle: 'Tilbakemeldinger',
    testimonials: [
      {
        quote: 'Profesjonell og ryddig. Leverte på tid.',
        author: '[Navn]',
      },
      {
        quote: 'Planløsningen ga tydelig verdiøkning.',
        author: '[Navn]',
      },
    ],
  },
};

async function createLandingPageContent() {
  try {
    console.log('Creating initial landing page content...');
    
    // Check if landing page content already exists
    const existingContent = await client.fetch('*[_type == "landingPage"][0]');
    
    if (existingContent) {
      console.log('Landing page content already exists. Skipping creation.');
      return;
    }
    
    // Create the landing page content
    const result = await client.create(initialLandingPageContent);
    
    console.log('✅ Landing page content created successfully!');
    console.log('Document ID:', result._id);
    console.log('\nNext steps:');
    console.log('1. Go to your Sanity Studio');
    console.log('2. Navigate to "Landing Page Content"');
    console.log('3. Upload a hero image');
    console.log('4. Select featured projects for the portfolio section');
    console.log('5. Customize any text as needed');
    
  } catch (error) {
    console.error('❌ Error creating landing page content:', error);
  }
}

// Run the script
createLandingPageContent();