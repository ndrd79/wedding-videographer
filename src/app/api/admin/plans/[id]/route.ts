import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('PUT request received for id:', params.id);
    
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('Unauthorized request');
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    console.log('Request body:', body);

    const { name, price, features, highlight, discount } = body;

    console.log('Updating plan with data:', {
      id,
      name,
      price,
      features,
      highlight,
      discount
    });

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        name,
        price: price === null ? null : Number(price),
        features: typeof features === 'string' ? features : JSON.stringify(features),
        highlight,
        discount: price === null ? 0 : Number(discount || 0)
      }
    });

    console.log('Plan updated successfully:', plan);

    const response = {
      ...plan,
      features: typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features
    };

    console.log('Sending response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao atualizar plano' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;
    await prisma.plan.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir plano' },
      { status: 500 }
    );
  }
}
