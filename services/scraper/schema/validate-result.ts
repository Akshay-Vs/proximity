import z from 'zod';

import URLParser from '@/libs/url-parser';
import { TRUSTED_SOURCES } from '@/libs/trusted-sources';

const DEFAULT_IMAGE = 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj74ADmHJMZLbSuWmdi2CH4g1NVthMaGDc56Rjw'
export const validateResult = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url().nullable().optional().transform((val) => val ?? DEFAULT_IMAGE),
  date: z.string().datetime(),
  scrapedAt: z.string().datetime(),
  sourceName: z.string().min(1),
  sourceUrl: z.string().url()
  // .refine((url) => {
  //   const host = new URLParser(url);
  //   return TRUSTED_SOURCES.includes(host.slice());
  // }, {
  //   message: 'URL must be from a trusted source',
  // }),
})