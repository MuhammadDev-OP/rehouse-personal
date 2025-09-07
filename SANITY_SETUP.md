# Sanity CMS Integration for Rehouse Portfolio

This document explains how to set up and use Sanity CMS for managing your portfolio content.

## 🚀 Quick Setup

### 1. Environment Variables
Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-04
SANITY_API_TOKEN=your_api_token_with_write_permissions
```

### 2. Access Sanity Studio
Visit: `http://localhost:3000/studio` to access your Sanity Studio

### 3. Create Portfolio Projects
In Sanity Studio:
1. Click "Portfolio Projects"
2. Click "Create" 
3. Fill in all required fields:
   - **Title**: Project name
   - **Slug**: Auto-generated URL slug
   - **Category**: Choose from dropdown
   - **Description**: Short description (max 300 chars)
   - **Full Description**: Detailed project description
   - **Hero Image**: Main project image
   - **Before Images**: Upload multiple "before" images
   - **After Images**: Upload multiple "after" images
   - **Location**: Project location
   - **Year**: Project year
   - **Area**: Project area/size
   - **Featured**: Mark as featured project
   - **Display Order**: Order for display (0 = first)

## 📁 File Structure

```
src/
├── sanity/
│   ├── lib/
│   │   ├── client.js          # Sanity client configuration
│   │   ├── image.js           # Image URL builder
│   │   └── queries.js         # GROQ queries
│   ├── schemaTypes/
│   │   ├── index.js           # Schema exports
│   │   └── portfolio.js       # Portfolio schema definition
│   └── env.js                 # Environment variables
├── components/
│   ├── pages/portfoliopage/
│   │   └── Portfolio.jsx      # Portfolio listing (Sanity-powered)
│   ├── BeforeAfterCarousel.jsx # Before/after image carousel
│   └── ui/
│       └── SanityImage.jsx    # Image component with loading states
└── app/
    └── portfolio/
        ├── page.jsx           # Portfolio listing page
        └── [slug]/
            └── page.jsx       # Individual project page
```

## 🎨 Features

### Portfolio Listing
- ✅ Fetches all projects from Sanity
- ✅ Loading states with skeleton UI
- ✅ Error handling
- ✅ Responsive design
- ✅ GSAP animations
- ✅ Norwegian translations

### Individual Project Pages
- ✅ Dynamic routing by slug
- ✅ Before/after image carousel
- ✅ Full project details
- ✅ Hero image with parallax
- ✅ Norwegian translations

### Before/After Carousel
- ✅ Synchronized vertical carousels
- ✅ Smooth animations
- ✅ Touch/swipe support
- ✅ Navigation arrows
- ✅ Norwegian labels ("Før" / "Etter")

## 🔧 Data Migration

To migrate existing portfolio data:

1. Add your Sanity API token to `.env.local`
2. Run: `node scripts/migrate-portfolio-data.js`
3. Upload images manually in Sanity Studio
4. Update image references in created documents

## 📝 Content Management

### Adding New Projects
1. Go to Sanity Studio (`/studio`)
2. Click "Portfolio Projects" → "Create"
3. Fill in all fields
4. Upload before/after images
5. Set display order
6. Publish

### Editing Projects
1. Find project in Studio
2. Make changes
3. Click "Publish"
4. Changes appear immediately on site

### Image Management
- Upload high-quality images (recommended: 1200x800px+)
- Use descriptive alt text
- Sanity automatically optimizes images
- Before/after images should be same aspect ratio

## 🌐 Norwegian Translations

All UI text is in Norwegian:
- "Portefølje" (Portfolio)
- "Se detaljer" (View Details)
- "Før" / "Etter" (Before/After)
- "Transformasjon" (Transformation)
- "Tilbake til Portefølje" (Back to Portfolio)

## 🚨 Troubleshooting

### Common Issues

**Images not loading:**
- Check image asset references in Sanity
- Verify CORS settings in Sanity project
- Ensure images are published

**Data not fetching:**
- Verify environment variables
- Check Sanity project ID and dataset
- Ensure API version is correct

**Studio not accessible:**
- Check if running on correct port
- Verify Sanity configuration
- Clear browser cache

### Performance Tips

- Use appropriate image sizes
- Enable CDN in production
- Consider ISR for better performance
- Optimize GROQ queries

## 🔗 Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URLs](https://www.sanity.io/docs/image-url)
- [Schema Types](https://www.sanity.io/docs/schema-types)

## 📞 Support

For issues with this integration, check:
1. Console errors in browser
2. Sanity Studio logs
3. Network requests in DevTools
4. Environment variable configuration