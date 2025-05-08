import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSessionToken } from "./lib/auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/signup", "/"];
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) || path.includes("/admin");
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  // 3. Decrypt the session from the cookie
  // const session = await decrypt(cookie);
  const session = await validateSessionToken();

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /admin if the user is authenticated
  if (session?.id && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
