// Import types from Sanity
import {Rule, SanityDocument} from '@sanity/types'

interface IImage {
  _type: 'image'
  asset: SanityDocument
  crop?: any
  hotspot?: any
}

export default {
  name: 'parallaxPictures',
  title: 'Parallax Pictures',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(5).max(100),
      description: 'A title for this set of images.',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true, // Enables image hotspot positioning
      },
      description:
        'Upload images here for the parallax animation section.',
    },
  ] as const,

  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
    prepare(selection: {title: string; media: IImage}) {
      const {title, media} = selection
      return {
        title: title,
        media: media,
      }
    },
  },
}
