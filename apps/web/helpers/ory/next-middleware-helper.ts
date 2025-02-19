import { NextResponse, type NextRequest } from "next/server"
import { orySdkUrl } from "./ory-helper"

/**
 * Checks the session by calling Ory’s `/sessions/whoami` endpoint.
 * If the session is valid (i.e. response.ok is true), the user is considered logged in.
 * Otherwise, we redirect the user to the login page.
 */
export async function validateSession(request: NextRequest) {
  // Skip validation for /auth/* routes to avoid redirect loop
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  // Construct the full URL for the session validation endpoint.
  const sessionUrl = new URL("/sessions/whoami", orySdkUrl()).toString()

  // Forward only the cookie header, which typically holds the session token.
  const response = await fetch(sessionUrl, {
    method: "GET",
    headers: {
      "cookie": request.headers.get("cookie") || "",
    },
    redirect: "manual",
  })

  // If the response is OK, the session is valid—allow the request to continue.
  if (response.ok) {
    return NextResponse.next()
  }

  // Otherwise, consider the user not logged in.
  // Here we choose to redirect them to "/auth/login"
  return NextResponse.redirect(new URL("/auth/login", request.url))
}

/**
 * Creates a middleware function that uses the session validation.
 */
export function createSessionMiddleware() {
  return async (request: NextRequest) => {
    return validateSession(request)
  }
}