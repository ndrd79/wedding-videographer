import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    
    if (!session) {
      console.log('Não autorizado - sem sessão');
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const plans = await prisma.plan.findMany({
      orderBy: { createdAt: 'asc' }
    });
    
    console.log('Planos encontrados:', plans);
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar planos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await request.json();
      console.log('Dados recebidos:', body);
    } catch (error) {
      console.error('Erro ao fazer parse do JSON:', error);
      return NextResponse.json(
        { error: 'Dados inválidos enviados' },
        { status: 400 }
      );
    }

    const { name, price, features, highlight, discount, description } = body;

    // Validação dos dados
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Nome do plano é obrigatório' },
        { status: 400 }
      );
    }

    if (!Array.isArray(features)) {
      return NextResponse.json(
        { error: 'Features deve ser um array' },
        { status: 400 }
      );
    }

    // Preparar os dados do plano
    const planData = {
      name: name.trim(),
      price: price === null ? null : Number(price),
      features: JSON.stringify(features),
      highlight: Boolean(highlight),
      discount: Number(discount || 0),
      description: description?.trim() || ''
    };

    console.log('Dados do plano para criar:', planData);

    try {
      // Criação do plano
      const plan = await prisma.plan.create({
        data: planData
      });

      console.log('Plano criado com sucesso:', plan);

      // Retorna o plano criado com as features já parseadas
      return NextResponse.json({
        ...plan,
        features: features
      }, { status: 201 });

    } catch (dbError) {
      console.error('Erro ao criar plano no banco:', dbError);
      return NextResponse.json(
        { error: 'Erro ao criar plano no banco de dados' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro geral:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, price, features, highlight, discount } = await request.json();

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        name,
        price: price === null ? null : Number(price),
        features: Array.isArray(features) ? JSON.stringify(features) : features,
        highlight: Boolean(highlight),
        discount: price === null ? 0 : Number(discount || 0)
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        ...plan,
        features: Array.isArray(features) ? features : JSON.parse(plan.features)
      }
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar plano' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = await request.json();

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
