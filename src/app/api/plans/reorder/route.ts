import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/plans/reorder - Reordena os planos
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const updates = body as { id: string; order: number }[];

    // Atualiza a ordem de cada plano
    await Promise.all(
      updates.map(({ id, order }) =>
        prisma.plan.update({
          where: { id },
          data: { order }
        })
      )
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error reordering plans:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
