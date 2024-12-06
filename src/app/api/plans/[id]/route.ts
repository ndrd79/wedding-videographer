import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT /api/plans/[id] - Atualiza um plano
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, description, price, features } = body;

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        name,
        description,
        price,
        features
      }
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error updating plan:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE /api/plans/[id] - Exclui um plano
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = params;

    await prisma.plan.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
