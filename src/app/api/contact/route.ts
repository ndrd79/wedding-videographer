import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, plano, date, subject } = await req.json();

    // Validações básicas
    if (!name || !email || !phone || !message || !subject) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor, insira um email válido' },
        { status: 400 }
      );
    }

    // Validação de telefone (formato brasileiro)
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Por favor, insira um telefone válido' },
        { status: 400 }
      );
    }

    // Salva o contato no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
        planId: plano || null,
        eventDate: date ? new Date(date) : null,
        subject,
        status: 'PENDING',
        createdAt: new Date(),
      },
    });

    // TODO: Implementar envio de email de notificação
    // Você pode usar serviços como SendGrid, Amazon SES, etc.

    return NextResponse.json(
      { 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        contact 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao processar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
