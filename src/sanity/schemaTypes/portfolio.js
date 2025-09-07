import { defineField, defineType } from 'sanity'

export const portfolio = defineType({
    name: 'portfolio',
    title: 'Portfolio Projects',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Restaurering', value: 'restaurering' },
                    { title: 'Moderne Design', value: 'moderne-design' },
                    { title: 'Kommersiell', value: 'kommersiell' },
                    { title: 'Eiendom', value: 'eiendom' },
                    { title: 'Urban Utvikling', value: 'urban-utvikling' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'fullDescription',
            title: 'Full Description',
            type: 'text',
            rows: 6,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'beforeImages',
            title: 'Before Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'afterImages',
            title: 'After Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'area',
            title: 'Area',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            description: 'Mark this project as featured to show it prominently',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this project should appear (lower numbers first)',
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            media: 'heroImage',
            year: 'year',
        },
        prepare(selection) {
            const { title, category, year } = selection
            return {
                title,
                subtitle: `${category} • ${year}`,
                media: selection.media,
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Year (Newest First)',
            name: 'yearDesc',
            by: [{ field: 'year', direction: 'desc' }],
        },
    ],
})