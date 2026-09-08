import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cityContent = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cityContent' }),
  schema: z.object({
    city: z.string(),
    citySlug: z.string(),
    intent: z.string(),
    intentSlug: z.string(),
    region: z.string().optional(),
    indexable: z.boolean().default(false),
    metaTitle: z.string(),
    metaDescription: z.string(),
    generatedAt: z.string().optional(),
    generatedBy: z.enum(['llm', 'manual']).default('manual'),
  }),
});

// Editorial blog. Hand-written topical-authority / link content, not
// programmatic. One markdown file per post in src/content/blog/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('The Double Glazing Expert team'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    indexable: z.boolean().default(true),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { cityContent, blog };
