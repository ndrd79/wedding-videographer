import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('PUT request received:', { params });
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id } = params;
    const data = await request.json();
    
    console.log('Processing PUT request:', { id, data });

    // Validar dados obrigatórios
    if (!data.youtubeUrl || !data.title || !data.description || !data.category) {
      return new NextResponse(JSON.stringify({ 
        error: 'Todos os campos são obrigatórios' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar se o vídeo existe
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    if (!existingVideo) {
      return new NextResponse(JSON.stringify({ 
        error: 'Vídeo não encontrado' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const video = await prisma.video.update({
      where: { id },
      data: {
        youtubeUrl: data.youtubeUrl,
        title: data.title,
        description: data.description,
        category: data.category,
        featured: data.featured || false,
        thumbnail: data.thumbnail,
        order: data.order || existingVideo.order,
      },
    });

    console.log('Video updated successfully:', video);

    return new NextResponse(JSON.stringify(video), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating video:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Erro ao atualizar vídeo',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('DELETE request received:', { params });
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id } = params;
    console.log('Processing DELETE request for id:', id);

    // Verificar se o vídeo existe
    const existingVideo = await prisma.video.findUnique({
      where: { id }
    });

    if (!existingVideo) {
      console.log('Video not found:', id);
      return new NextResponse(JSON.stringify({ 
        error: 'Vídeo não encontrado' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.video.delete({
      where: { id },
    });

    console.log('Video deleted successfully:', id);

    return new NextResponse(JSON.stringify({ 
      success: true,
      message: 'Vídeo excluído com sucesso' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Erro ao excluir vídeo',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('GET request received:', { params });
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id } = params;
    console.log('Processing GET request for id:', id);

    const video = await prisma.video.findUnique({
      where: { id }
    });

    if (!video) {
      console.log('Video not found:', id);
      return new NextResponse(JSON.stringify({ 
        error: 'Vídeo não encontrado' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Video found:', video);

    return new NextResponse(JSON.stringify(video), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Erro ao buscar vídeo',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
