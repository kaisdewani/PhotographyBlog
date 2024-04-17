// Import types from Sanity
import {Rule, SanityDocument} from '@sanity/types'

interface IImage {
  _type: 'image'
  asset: SanityDocument
  crop?: any
  hotspot?: any
}

export default {
  name: 'eventAlbum',
  title: 'Event Picture Albums',
  type: 'document',
  fields: [
    {
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(5).max(100),
      description: 'The name of the event.',
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: Rule) => Rule.required(),
      description: 'The date when the event took place.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'eventName',
        maxLength: 200, // Will trim the slug if it exceeds this length
      },
      validation: (Rule: Rule) => Rule.required(),
      description: 'The slug for the URL, generated from the event name.',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true, // Enables image hotspot positioning
      },
      description: 'Upload images from the event here.',
    },
  ] as const,

  preview: {
    select: {
      title: 'eventName',
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
