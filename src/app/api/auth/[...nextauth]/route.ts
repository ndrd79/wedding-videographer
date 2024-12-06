import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

console.log('Carregando configuração do NextAuth...');

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Tentando autenticar usuário:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          console.log('Usuário encontrado:', user ? 'Sim' : 'Não');

          if (!user) {
            throw new Error('Email ou senha inválidos');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log('Senha válida:', isValid);

          if (!isValid) {
            throw new Error('Email ou senha inválidos');
          }

          console.log('Autenticação bem-sucedida para:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login', // Página para onde redirecionar em caso de erro
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback - Token:', token);
      console.log('JWT Callback - User:', user);
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Session:', session);
      console.log('Session Callback - Token:', token);
      
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
