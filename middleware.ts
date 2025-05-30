import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("🔐 TOKEN:", token);
  console.log("🍪 COOKIE:", req.cookies.get("next-auth.session-token")?.value);

  const { pathname } = req.nextUrl;
  const lowerPath = pathname.toLowerCase();

  const publicPaths = ["/", "/home", "/contact", "/login", "/register", "/api/auth"];
  const isPublic = publicPaths.some((path) => lowerPath === path || lowerPath.startsWith(path));

  if (isPublic) return NextResponse.next();
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  if (lowerPath.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (lowerPath.startsWith("/client") && token.role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
 matcher: [
  "/client/:path*",
  "/Client/:path*",
  "/admin/:path*",
  "/Admin/:path*",
  "/client",
  "/Client",
  "/admin",
  "/Admin"
],
};
