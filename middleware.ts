import { NextRequest, NextResponse } from 'next/server';
import redirects from './redirects.json';
import {
  isCrawler,
  findRedirectConfig,
  generateRedirectHTML,
  type RedirectConfig,
} from './lib/redirect-helpers';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const slug = pathname === '/' ? '@' : pathname.slice(1);

  const redirectConfig = findRedirectConfig(
    slug,
    redirects as RedirectConfig[]
  );

  if (!redirectConfig?.redirect_to) {
    return NextResponse.next();
  }

  if (!redirectConfig.title) {
    return NextResponse.redirect(redirectConfig.redirect_to, 301);
  }

  const userAgent = request.headers.get('user-agent') || '';
  if (isCrawler(userAgent)) {
    const html = generateRedirectHTML(redirectConfig, request.url);

    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return NextResponse.redirect(redirectConfig.redirect_to, 301);
}

export const config = {
  matcher: '/:path*',
};
