

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Lejo rruget publike pa autentifikim
  const publicPaths = [
    "/",
    "/home",
    "/contact",
    "/login",
    "/register",
    "/api/auth"
  ];

  const isPublic = publicPaths.some((path) =>
    pathname === path || pathname.startsWith(path)
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Nëse nuk ka token dhe tenton të hyjë në faqe të mbrojtur
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Nëse është faqe admini dhe useri nuk është admin
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
