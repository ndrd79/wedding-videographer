import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkAvailability } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/plans - Lista todos os planos
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const plans = await prisma.plan.findMany({
      orderBy: {
        price: 'asc'
      }
    });

    // Se temos um usuário autenticado com token do Google, verificamos a disponibilidade
    if (session?.user?.email === process.env.ADMIN_EMAIL) {
      const accounts = await prisma.account.findFirst({
        where: {
          userId: session.user.id,
          provider: 'google'
        }
      });

      if (accounts?.access_token) {
        // Aqui poderíamos adicionar lógica adicional para verificar disponibilidade
        // para datas específicas relacionadas aos planos
      }
    }

    const updatedPlans = plans.map((plan) => {
      const baseFeatures = plan.features || [];
      switch (plan.name) {
        case 'Plano 1':
          return {
            ...plan,
            name: 'Bronze',
            price: 2990,
            description: 'Para uma cobertura essencial do seu grande dia',
            features: [
              'Cobertura de 6 horas',
              'Video highlight de 3-5 minutos',
              'Video completo da cerimônia',
              ...baseFeatures
            ],
            popular: false,
          };
        case 'Plano 2':
          return {
            ...plan,
            name: 'Prata',
            price: 3990,
            description: 'Para uma cobertura completa do seu grande dia',
            features: [
              'Cobertura de 8 horas',
              'Video highlight de 5-7 minutos',
              'Video completo da cerimônia',
              'Making of dos noivos',
              ...baseFeatures
            ],
            popular: false,
          };
        case 'Plano 3':
          return {
            ...plan,
            name: 'Ouro',
            price: 4990,
            description: 'Para uma cobertura premium do seu grande dia',
            features: [
              'Cobertura de 12 horas',
              'Video highlight de 8-10 minutos',
              'Video completo da cerimônia',
              'Making of dos noivos',
              'Drone para tomadas aéreas',
              ...baseFeatures
            ],
            popular: true,
          };
        case 'Plano 4':
          return {
            ...plan,
            name: 'Diamante',
            price: 6990,
            description: 'Para uma cobertura exclusiva e luxuosa do seu grande dia',
            features: [
              'Cobertura ilimitada',
              'Video highlight de 10-15 minutos',
              'Video completo da cerimônia',
              'Making of dos noivos',
              'Drone para tomadas aéreas',
              'Segundo cinegrafista',
              'Ensaio pré-wedding',
              ...baseFeatures
            ],
            popular: false,
          };
        default:
          return {
            ...plan,
            features: baseFeatures
          };
      }
    });

    return NextResponse.json(updatedPlans);
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json({ error: 'Erro ao buscar planos' }, { status: 500 });
  }
}

// POST /api/plans - Cria um novo plano
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, features } = body;

    // Pega o maior order atual
    const lastPlan = await prisma.plan.findFirst({
      orderBy: {
        order: 'desc'
      }
    });

    const plan = await prisma.plan.create({
      data: {
        name,
        description,
        price,
        features,
        order: lastPlan ? lastPlan.order + 1 : 0
      }
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error creating plan:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { id, name, description, price, features } = body;

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

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Missing plan ID', { status: 400 });
    }

    await prisma.plan.delete({
      where: { id }
    });

    return new NextResponse('Plan deleted successfully');
  } catch (error) {
    console.error('Error deleting plan:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
