// Run this script to migrate your existing portfolio data to Sanity
// Usage: node scripts/migrate-portfolio-data.js

import { createClient } from '@sanity/client'
import { portfolioData } from '../data/portfolioData.js'

// Create Sanity client for data migration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-04',
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env.local
  useCdn: false
})

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Helper function to map category names to Norwegian values
function mapCategory(category) {
  const categoryMap = {
    'Restoration': 'restaurering',
    'Modern Design': 'moderne-design', 
    'Commercial': 'kommersiell',
    'Estate': 'eiendom',
    'Urban Development': 'urban-utvikling'
  }
  return categoryMap[category] || category.toLowerCase().replace(/\s+/g, '-')
}

async function migratePortfolioData() {
  console.log('Starting portfolio data migration...')
  
  try {
    const documents = portfolioData.map((project, index) => ({
      _type: 'portfolio',
      title: project.title,
      slug: {
        _type: 'slug',
        current: createSlug(project.title)
      },
      category: mapCategory(project.category),
      description: project.description,
      fullDescription: project.fullDescription,
      // Note: You'll need to manually upload images to Sanity and reference them
      // For now, we'll create placeholder references
      heroImage: {
        _type: 'image',
        // You'll need to upload the actual images and get their asset references
        asset: {
          _type: 'reference',
          _ref: 'image-placeholder' // Replace with actual asset reference
        }
      },
      beforeImages: project.beforeImages?.map(() => ({
        _type: 'image',
        asset: {
          _type: 'reference', 
          _ref: 'image-placeholder' // Replace with actual asset references
        }
      })) || [],
      afterImages: project.afterImages?.map(() => ({
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-placeholder' // Replace with actual asset references  
        }
      })) || [],
      location: project.location,
      year: project.year,
      area: project.area,
      featured: index < 2, // Mark first 2 as featured
      order: index
    }))

    // Create documents in Sanity
    const result = await client.createOrReplace(documents)
    console.log('Migration completed successfully!')
    console.log(`Created ${documents.length} portfolio documents`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration
migratePortfolioData()

console.log(`
📝 MIGRATION NOTES:
1. Add SANITY_API_TOKEN to your .env.local file
2. Upload your images to Sanity Studio manually
3. Update the image asset references in the created documents
4. This script creates placeholder image references that need to be replaced
`)