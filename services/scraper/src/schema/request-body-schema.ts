import z, { array } from "zod";

import URLParser from "@/src/libs/url-parser";
import { TRUSTED_SOURCES } from "@/src/libs/trusted-sources";

export const provider = z.object({
  url: z.string().url().refine(url => {
    const host = new URLParser(url);
    return TRUSTED_SOURCES.includes(
      host
        .getHost()
        .replace('www.', '')
    );
  }, {
    message: 'URL must be from a trusted source',
  }),
  driver: z.enum(['puppeteer', 'cheerio']).optional().default('cheerio'),
});

export const requestBodySchema = z.object({
  providers: z.array(provider)
})