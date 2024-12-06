import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Primeiro, limpa todos os vídeos existentes
    await prisma.video.deleteMany();

    // Cria alguns vídeos de teste
    const videos = await prisma.video.createMany({
      data: [
        {
          title: 'Casamento Marina & João',
          description: 'Um lindo casamento à beira-mar ao pôr do sol',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          category: 'wedding',
          featured: true,
        },
        {
          title: 'Casamento Ana & Pedro',
          description: 'Cerimônia elegante em um castelo histórico',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          category: 'wedding',
          featured: true,
        },
        {
          title: 'Formatura Turma 2023',
          description: 'Cobertura completa da formatura',
          youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          category: 'event',
          featured: false,
        },
      ],
    });

    return NextResponse.json({ message: 'Vídeos de teste criados com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar vídeos de teste:', error);
    return NextResponse.json(
      { error: 'Erro ao criar vídeos de teste' },
      { status: 500 }
    );
  }
}
