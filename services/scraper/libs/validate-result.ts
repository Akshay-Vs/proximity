import z from 'zod';
import { TRUSTED_SOURCES } from './trusted-sources';
import URLParser from './url-parser';

export const validateResult = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url(),
  date: z.string().datetime(),
  scrapedAt: z.string().datetime(),
  sourceName: z.string().min(1),
  sourceUrl: z.string().url().refine((url) => {
    const host = new URLParser(url);
    return TRUSTED_SOURCES.includes(host.slice());
  }, {
    message: 'URL must be from a trusted source',
  }),
})