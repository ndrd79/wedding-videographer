import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const videos = await request.json();

    // Atualizar a ordem de cada vídeo em uma única transação
    await prisma.$transaction(
      videos.map((video: { id: string; order: number }) =>
        prisma.video.update({
          where: { id: video.id },
          data: { order: video.order }
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao reordenar vídeos:', error);
    return NextResponse.json(
      { error: 'Erro ao reordenar vídeos' },
      { status: 500 }
    );
  }
}
