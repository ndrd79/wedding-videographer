import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Buscando vídeos do banco de dados...');
    
    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('Vídeos encontrados:', videos.length);
    
    return NextResponse.json({ 
      success: true,
      videos,
      message: `${videos.length} vídeos encontrados`
    });
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao buscar vídeos',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
