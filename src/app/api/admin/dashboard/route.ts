import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Fetching dashboard data...');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session) {
      console.log('No session found');
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'ADMIN') {
      console.log('User is not admin:', session.user);
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      );
    }

    console.log('User is authorized, fetching data...');

    // Buscar contatos dos últimos 7 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    try {
      const [recentContacts, totalVideos, recentContactsList] = await Promise.all([
        // Total de contatos nos últimos 7 dias
        prisma.contact.count({
          where: {
            createdAt: {
              gte: sevenDaysAgo,
            },
          },
        }),
        // Total de vídeos
        prisma.video.count(),
        // Lista dos contatos mais recentes
        prisma.contact.findMany({
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        }),
      ]);

      console.log('Data fetched successfully:', {
        recentContacts,
        totalVideos,
        recentContactsCount: recentContactsList.length,
      });

      return NextResponse.json({
        stats: {
          recentContacts,
          totalVideos,
          popularPlan: 'Ouro', // Placeholder - implementar lógica real depois
          views: 1200, // Placeholder - implementar analytics depois
        },
        recentContacts: recentContactsList,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Erro ao acessar o banco de dados');
    }
  } catch (error) {
    console.error('Error in dashboard route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao buscar dados do dashboard' },
      { status: 500 }
    );
  }
}
