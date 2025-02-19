// middleware.ts
import type { NextRequest } from "next/server"
import { createSessionMiddleware } from "./helpers/ory/next-middleware-helper"

// This function is automatically executed on every request
export default async function middleware(request: NextRequest) {
  return await createSessionMiddleware()(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and auth routes
    '/((?!_next|static|auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
