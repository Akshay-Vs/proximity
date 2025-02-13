import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const KRATOS_PUBLIC_URL = process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL;

// Paths that should bypass authentication
const PUBLIC_PATHS = ["/_next", "/static", "/auth", "/api/auth"];

export async function middleware(request: NextRequest) {
  // Skip middleware for public paths
  if (PUBLIC_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  try {
    const sessionToken = request.cookies.get("session_token");

    // Redirect to login if no session token exists
    if (!sessionToken?.value) {
      return createRedirectResponse(request);
    }

    // Validate session with Kratos
    const sessionResponse = await fetch(`${KRATOS_PUBLIC_URL}/sessions/whoami`, {
      headers: {
        Cookie: `session_token=${sessionToken.value}`,
        Authorization: `Bearer ${sessionToken.value}`,
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!sessionResponse.ok) {
      console.log("Session validation failed:", sessionResponse.status);

      // Try refreshing session silently
      const refreshResponse = await fetch(`${KRATOS_PUBLIC_URL}/self-service/login/browser`, {
        headers: {
          Cookie: `session_token=${sessionToken.value}`,
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        console.log("Session refreshed successfully");
        const refreshData = await refreshResponse.json();

        const response = NextResponse.next();
        response.headers.set(
          "Set-Cookie",
          `session_token=${refreshData.session_token}; Path=/; HttpOnly; Secure; SameSite=Lax`
        );
        return response;
      }

      // If refresh fails, redirect to login
      return createRedirectResponse(request);
    }

    // Create response and apply security headers
    const response = NextResponse.next();
    setSecurityHeaders(response);

    // Preserve session cookie
    response.headers.set(
      "Set-Cookie",
      `session_token=${sessionToken.value}; Path=/; HttpOnly; Secure; SameSite=Lax`
    );

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return createRedirectResponse(request);
  }
}

function createRedirectResponse(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login", request.url));

  // Preserve session cookie if available
  const sessionToken = request.cookies.get("session_token");
  if (sessionToken?.value) {
    response.headers.set(
      "Set-Cookie",
      `session_token=${sessionToken.value}; Path=/; HttpOnly; Secure; SameSite=Lax`
    );
  }

  setSecurityHeaders(response);
  return response;
}

function setSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("x-middleware-cache", "no-cache");

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

// Optimize the matcher to exclude API routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth|api).*)",
  ],
};
