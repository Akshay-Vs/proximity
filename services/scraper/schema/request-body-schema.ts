import z, { array } from "zod";

import URLParser from "@/libs/url-parser";
import { TRUSTED_SOURCES } from "@/libs/trusted-sources";

const requestBody = z.object({
  url: z.string().url().refine(url => {
    const host = new URLParser(url);
    return TRUSTED_SOURCES.includes(host.slice());
  }, {
    message: 'URL must be from a trusted source',
  }),
  driver: z.enum(['puppeteer', 'cheerio']).optional().default('cheerio'),
});

export const requestBodySchema = z.object({
  providers: z.array(requestBody)
})