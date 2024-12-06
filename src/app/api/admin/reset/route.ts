import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function GET() {
  try {
    // Procura o usuário
    const user = await prisma.user.findUnique({
      where: { email: 'admin@vanderoski.com' }
    });

    if (!user) {
      // Se não existe, cria o usuário admin
      const hashedPassword = await hash('admin123', 12);
      const newUser = await prisma.user.create({
        data: {
          email: 'admin@vanderoski.com',
          name: 'Admin',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      
      return NextResponse.json({ 
        message: 'Usuário admin criado com sucesso',
        email: newUser.email,
        role: newUser.role
      });
    }

    // Se existe, atualiza a senha
    const hashedPassword = await hash('admin123', 12);
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@vanderoski.com' },
      data: {
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ 
      message: 'Senha do usuário admin atualizada com sucesso',
      email: updatedUser.email,
      role: updatedUser.role
    });

  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
