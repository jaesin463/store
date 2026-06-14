import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const change = z.object({
  type: z.enum(['add', 'fix', 'improve']),
  text: z.string(),
});

const apps = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/apps' }),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: z.string(),
    tech: z.array(z.string()),
    platform: z.array(z.string()),
    version: z.string(),
    stars: z.number(),
    downloads: z.number(),
    status: z.enum(['active', 'maintenance', 'deprecated']),
    link: z.string(),
    isNew: z.boolean(),
    isFeatured: z.boolean(),
    draft: z.boolean().default(false),
    features: z.array(z.string()),
    techDetail: z.string(),
    screenshots: z.array(z.object({
      label: z.string(),
      accent: z.string(),
    })),
  }),
});

const patchNotes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/patch-notes' }),
  schema: z.object({
    app: z.string(),
    version: z.string(),
    date: z.string(),
    type: z.enum(['patch', 'minor', 'major']),
    draft: z.boolean().default(false),
    changes: z.array(change),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    category: z.enum(['기술', '트러블슈팅', '개발일지', '회고']),
    tags: z.array(z.string()),
    date: z.string(),
    readTime: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
    sections: z.array(z.object({
      type: z.enum(['h2', 'p', 'code', 'ul']),
      content: z.union([z.string(), z.array(z.string())]),
    })),
  }),
});

export const collections = {
  apps,
  patchNotes,
  posts,
};
