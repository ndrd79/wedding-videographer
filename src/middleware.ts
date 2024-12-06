import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Permitir acesso livre às rotas de autenticação e assets
  if (
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname === '/admin/login';

  // Se for a página de login e o usuário estiver autenticado como admin
  if (isAuthPage && token?.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Se não for a página de login e o usuário não estiver autenticado
  if (!isAuthPage && !token && request.nextUrl.pathname.startsWith('/admin')) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Se o usuário não for admin e tentar acessar rotas administrativas
  if (!isAuthPage && token?.role !== 'ADMIN' && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
