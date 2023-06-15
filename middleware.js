import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && !pathname.includes('/login')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/'],
};
