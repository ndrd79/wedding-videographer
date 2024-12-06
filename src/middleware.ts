import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Não aplicar middleware para rotas de API
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Apenas aplicar middleware para rotas administrativas
  if (!req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Não verificar autenticação na página de login
  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production'
    });

    // Se não estiver autenticado, redirecionar para o login
    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Em caso de erro na verificação do token, redirecionar para o login
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('error', 'auth_error');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};
