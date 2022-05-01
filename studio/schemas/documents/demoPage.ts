import { CustomString } from "../objects/CustomString"
export default {
    name: 'demoPage',
    type: 'document',
    title: 'Demo Page',
    icon: () => '🤩',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            hidden: ({ document }) => !document?.title,
            options: {
                source: 'title',
                maxLength: 200
            }
        },
        {
            title: 'Publish Date',
            name: 'date',
            type: 'datetime',
            initialValue: (new Date()).toISOString()
        },
        {
            title: 'Poster',
            name: 'poster',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                    options: {
                        isHighlighted: true
                    }
                },
                {
                    name: 'attribution',
                    type: 'string',
                    title: 'Attribution',
                }
            ]
        },
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'author' }]
        },
        {
            title: 'Multiple related posts',
            name: 'relatedPosts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'post' }
                    ]
                }
            ]
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
                    fields: [
                        {
                            type: 'text',
                            name: 'alt',
                            title: 'Alternative text',
                            options: {
                                isHighlighted: true
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'customString',
            title: 'This is a cool custom string',
            type: 'string',
            inputComponent: CustomString
        },
        {
            name: 'stringWithLimit',
            title: 'This is a string with validation',
            type: 'string',
            validation: Rule => Rule.max(10)
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'author.name',
            media: 'poster'
        }
    }
}
