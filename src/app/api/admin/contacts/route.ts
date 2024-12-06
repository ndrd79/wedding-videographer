import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/admin/contacts - Lista todos os contatos
async function checkAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return new NextResponse(JSON.stringify({ error: 'Não autenticado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (session.user.role !== 'ADMIN') {
    return new NextResponse(JSON.stringify({ error: 'Não autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return null;
}

export async function GET() {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar contatos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
