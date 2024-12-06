import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/contacts - Lista todos os contatos
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// POST /api/contacts - Cria um novo contato
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, eventDate } = body;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
        eventDate: new Date(eventDate),
      }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
