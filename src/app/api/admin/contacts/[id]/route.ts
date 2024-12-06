import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PATCH /api/admin/contacts/[id] - Atualiza o status de um contato
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { status } = await req.json();

    // Valida o status
    if (!['PENDING', 'CONTACTED', 'CLOSED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar contato' },
      { status: 500 }
    );
  }
}
