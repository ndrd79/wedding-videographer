import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isValid, parseISO } from 'date-fns';
import { checkAvailability } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/availability - Lista todas as datas
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Validar datas
    if (startDate && !isValid(parseISO(startDate))) {
      return new NextResponse('Data inicial inválida', { status: 400 });
    }
    if (endDate && !isValid(parseISO(endDate))) {
      return new NextResponse('Data final inválida', { status: 400 });
    }

    let query: any = {
      orderBy: {
        date: 'asc'
      }
    };

    if (startDate && endDate) {
      query.where = {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      };
    }

    const availability = await prisma.availability.findMany(query);
    
    // Se temos um usuário autenticado com token do Google, verificamos a disponibilidade no Google Calendar
    if (session?.user?.email === process.env.ADMIN_EMAIL) {
      const accounts = await prisma.account.findFirst({
        where: {
          userId: session.user.id,
          provider: 'google'
        }
      });

      if (accounts?.access_token) {
        // Atualizar a disponibilidade com base no Google Calendar
        const updatedAvailability = await Promise.all(
          availability.map(async (item) => {
            const isAvailableInCalendar = await checkAvailability(
              item.date,
              accounts.access_token!
            );

            // Atualizar no banco de dados se necessário
            if (item.isAvailable !== isAvailableInCalendar) {
              const updated = await prisma.availability.update({
                where: { id: item.id },
                data: { isAvailable: isAvailableInCalendar }
              });
              return {
                ...updated,
                date: updated.date.toISOString()
              };
            }

            return {
              ...item,
              date: item.date.toISOString()
            };
          })
        );

        return NextResponse.json(updatedAvailability);
      }
    }

    // Se não temos acesso ao Google Calendar, retornamos os dados do banco
    const formattedAvailability = availability.map(item => ({
      ...item,
      date: item.date.toISOString(),
    }));

    return NextResponse.json(formattedAvailability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return new NextResponse(message, { status: 500 });
  }
}

// POST /api/availability - Cria ou atualiza uma data
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { date, isAvailable, isBooked, notes } = body;

    // Validar data
    if (!date || !isValid(new Date(date))) {
      return new NextResponse('Data inválida', { status: 400 });
    }

    // Validar campos booleanos
    if (typeof isAvailable !== 'boolean' || typeof isBooked !== 'boolean') {
      return new NextResponse('Campos isAvailable e isBooked devem ser booleanos', { status: 400 });
    }

    // Verificar disponibilidade no Google Calendar
    const accounts = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: 'google'
      }
    });

    let finalIsAvailable = isAvailable;

    if (accounts?.access_token) {
      const isAvailableInCalendar = await checkAvailability(
        new Date(date),
        accounts.access_token
      );
      finalIsAvailable = isAvailableInCalendar;
    }

    // Verifica se a data já existe
    const existingDate = await prisma.availability.findUnique({
      where: {
        date: new Date(date)
      }
    });

    if (existingDate) {
      // Atualiza a data existente
      const updatedDate = await prisma.availability.update({
        where: {
          id: existingDate.id
        },
        data: {
          isAvailable: finalIsAvailable,
          isBooked,
          notes
        }
      });
      return NextResponse.json(updatedDate);
    }

    // Cria uma nova data
    const newDate = await prisma.availability.create({
      data: {
        date: new Date(date),
        isAvailable: finalIsAvailable,
        isBooked,
        notes
      }
    });

    return NextResponse.json(newDate);
  } catch (error) {
    console.error('Error creating/updating availability:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return new NextResponse(message, { status: 500 });
  }
}
