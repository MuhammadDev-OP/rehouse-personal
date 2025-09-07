import { groq } from 'next-sanity'

// Get all portfolio projects ordered by display order
export const portfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    fullDescription,
    heroImage,
    beforeImages,
    afterImages,
    location,
    year,
    area,
    featured,
    order
  }
`

// Get a single portfolio project by slug
export const portfolioBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    fullDescription,
    heroImage,
    beforeImages,
    afterImages,
    location,
    year,
    area,
    featured,
    order
  }
`

// Get featured portfolio projects
export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    heroImage,
    location,
    year,
    area
  }
`

// Get portfolio projects by category
export const portfolioByCategoryQuery = groq`
  *[_type == "portfolio" && category == $category] | order(order asc) {
    _id,
    title,
    slug,
    category,
    description,
    heroImage,
    location,
    year,
    area
  }
`

// Get landing page content
export const landingPageQuery = groq`
  *[_type == "landingPage"][0] {
    heroSection {
      title,
      subtitle1,
      subtitle2,
      ctaText,
      ctaLink,
      heroImage
    },
    portfolioSection {
      sectionTitle1,
      sectionTitle2,
      introText,
      aboutText,
      featuredProjects[]-> {
        _id,
        title,
        slug,
        category,
        description,
        heroImage,
        afterImages,
        location,
        year,
        area
      }
    },
    statsSection {
      statsData {
        type,
        acquisitionDate,
        size,
        location,
        timeline,
        result
      }
    },
    processSection {
      processTitle,
      processSteps[] {
        step,
        description
      },
      testimonialsTitle,
      testimonials[] {
        quote,
        author
      }
    }
  }
`