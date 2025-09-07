import { defineField, defineType } from 'sanity'

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page Content",
  type: "document",
  fields: [
    // Hero Section (Unlock component)
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Hero Title",
          type: "string",
        }),
        defineField({
          name: "subtitle1",
          title: "Subtitle Line 1",
          type: "string",
        }),
        defineField({
          name: "subtitle2",
          title: "Subtitle Line 2",
          type: "string",
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Button Link",
          type: "string",
        }),
        defineField({
          name: "heroImage",
          title: "Hero Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // Portfolio Teaser Section (Modernity component)
    defineField({
      name: "portfolioSection",
      title: "Portfolio Teaser Section",
      type: "object",
      fields: [
        defineField({
          name: "sectionTitle1",
          title: "Section Title Line 1",
          type: "string",
        }),
        defineField({
          name: "sectionTitle2",
          title: "Section Title Line 2",
          type: "string",
        }),
        defineField({
          name: "introText",
          title: "Introduction Text",
          type: "string",
        }),
        defineField({
          name: "aboutText",
          title: "About Text (Center)",
          type: "text",
        }),
        defineField({
          name: "featuredProjects",
          title: "Featured Projects",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "portfolio" }],
            },
          ],
          validation: (Rule) => Rule.max(2),
          description: "Select up to 2 projects to feature in this section",
        }),
      ],
    }),

    // Stats Section
    defineField({
      name: "statsSection",
      title: "Stats Section",
      type: "object",
      fields: [
        defineField({
          name: "statsData",
          title: "Project Stats",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
            }),
            defineField({
              name: "acquisitionDate",
              title: "Oppkjøp",
              type: "string",
            }),
            defineField({
              name: "size",
              title: "Størrelse",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Område",
              type: "string",
            }),
            defineField({
              name: "timeline",
              title: "Tidsramme",
              type: "string",
            }),
            defineField({
              name: "result",
              title: "Resultat",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    // Process & Testimonials Section (RegisterYourInterest component)
    defineField({
      name: "processSection",
      title: "Process & Testimonials Section",
      type: "object",
      fields: [
        defineField({
          name: "processTitle",
          title: "Process Section Title",
          type: "string",
        }),
        defineField({
          name: "processSteps",
          title: "Process Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "step",
                  title: "Step Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Step Description (Optional)",
                  type: "text",
                  rows: 2,
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "testimonialsTitle",
          title: "Testimonials Section Title",
          type: "string",
        }),
        defineField({
          name: "testimonials",
          title: "Testimonials",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "quote",
                  title: "Quote",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "author",
                  title: "Author Name",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Landing Page Content",
        subtitle: "Homepage content management",
      };
    },
  },
});