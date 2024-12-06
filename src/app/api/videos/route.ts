import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/videos - Lista todos os vídeos
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar vídeos' },
      { status: 500 }
    );
  }
}

// POST /api/videos - Cria um novo vídeo
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const data = await request.json();
    const lastVideo = await prisma.video.findFirst({
      orderBy: { order: 'desc' }
    });

    const video = await prisma.video.create({
      data: {
        ...data,
        order: lastVideo ? lastVideo.order + 1 : 0
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Erro ao criar vídeo:', error);
    return NextResponse.json(
      { error: 'Erro ao criar vídeo' },
      { status: 500 }
    );
  }
}

// PUT /api/videos/:id - Atualiza um vídeo existente
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const data = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID não fornecido' },
        { status: 400 }
      );
    }

    const video = await prisma.video.update({
      where: { id },
      data
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Erro ao atualizar vídeo:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar vídeo' },
      { status: 500 }
    );
  }
}

// DELETE /api/videos/:id - Remove um vídeo
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID não fornecido' },
        { status: 400 }
      );
    }

    await prisma.video.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir vídeo:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir vídeo' },
      { status: 500 }
    );
  }
}
