import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Gallery collection schema
const galleryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    src: z.string(),
    alt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
  }),
});

// Export collections
export const collections = {
  'blog': blogCollection,
  'gallery': galleryCollection,
};

// Export types for TypeScript
export type GallerySchema = z.infer<typeof galleryCollection.schema>;
export type BlogSchema = z.infer<typeof blogCollection.schema>; 