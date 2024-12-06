import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { mockVideos } from './mock';

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

export async function GET(request: Request) {
  try {
    const authError = await checkAuth();
    if (authError) return authError;

    // Verificar se é uma busca por ID
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const video = videos.find(v => v.id === id);

      if (!video) {
        return new NextResponse(JSON.stringify({ error: 'Vídeo não encontrado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return NextResponse.json(video);
    }

    // Caso contrário, retornar todos os vídeos ordenados
    return NextResponse.json(videos.sort((a, b) => a.order - b.order));
  } catch (error) {
    console.error('Error in GET /api/admin/videos:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const authError = await checkAuth();
    if (authError) return authError;

    const data = await request.json();

    // Criar novo vídeo
    const newVideo = {
      id: String(videos.length + 1),
      ...data,
      order: videos.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    videos.push(newVideo);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/videos:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: Request) {
  try {
    const authError = await checkAuth();
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();

    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'ID não fornecido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
      return new NextResponse(JSON.stringify({ error: 'Vídeo não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Atualizar vídeo
    const updatedVideo = {
      ...videos[videoIndex],
      ...data,
      updatedAt: new Date()
    };

    videos[videoIndex] = updatedVideo;

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error('Error in PUT /api/admin/videos:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const authError = await checkAuth();
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'ID não fornecido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex === -1) {
      return new NextResponse(JSON.stringify({ error: 'Vídeo não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Remover vídeo
    videos = videos.filter(v => v.id !== id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/admin/videos:', error);
    return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
