import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Verifica se já existe algum usuário
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return new NextResponse(
        'Registro não permitido. Já existe um usuário cadastrado.',
        { status: 403 }
      );
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 12);

    // Cria o primeiro usuário como ADMIN
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in register:', error);
    return new NextResponse(
      'Erro ao criar usuário',
      { status: 500 }
    );
  }
}
