import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { mockVideos } from '../mock';

// Array mutável para armazenar os vídeos
let videos = [...mockVideos];

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

export async function PUT(request: Request) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { videos: newOrder } = await request.json();

    // Atualizar a ordem dos vídeos no array mockado
    videos = videos.map(video => {
      const newVideoOrder = newOrder.find((v: { id: string }) => v.id === video.id);
      if (newVideoOrder) {
        return {
          ...video,
          order: newVideoOrder.order,
          updatedAt: new Date()
        };
      }
      return video;
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering videos:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro ao reordenar vídeos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
