import { NextResponse } from 'next/server';
import { getVideoDetails } from '@/lib/youtube';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Pega o ID do vídeo da URL
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json({ error: 'ID do vídeo não fornecido' }, { status: 400 });
    }

    // Busca os detalhes do vídeo
    const details = await getVideoDetails(videoId);
    if (!details?.snippet) {
      return NextResponse.json({ error: 'Não foi possível obter os detalhes do vídeo' }, { status: 404 });
    }

    // Retorna apenas os dados necessários
    return NextResponse.json({
      title: details.snippet.title,
      description: details.snippet.description,
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar detalhes do vídeo' },
      { status: 500 }
    );
  }
}
