import { NextResponse } from 'next/server';
import { listEvents, createEvent, checkAvailability } from '@/lib/googleCalendar';

export async function GET() {
  try {
    const events = await listEvents();
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, name, email, phone } = body;

    // Verificar disponibilidade
    const isAvailable = await checkAvailability(new Date(date));
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Data não disponível' },
        { status: 400 }
      );
    }

    // Criar evento de pré-reserva
    const eventDetails = {
      summary: `Pré-reserva: ${name}`,
      description: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nStatus: Pré-reserva`,
      start: new Date(date),
      end: new Date(date),
    };

    const event = await createEvent(eventDetails);

    return NextResponse.json({ event });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create pre-reservation' },
      { status: 500 }
    );
  }
}
