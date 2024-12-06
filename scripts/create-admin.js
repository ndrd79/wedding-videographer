const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Primeiro, vamos ver se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@vanderoski.com' }
    });

    console.log('Usuário existente:', existingUser);

    // Criar hash da senha
    const password = await hash('admin123', 12);
    console.log('Hash da senha criado');

    let user;
    if (existingUser) {
      // Atualizar usuário existente
      user = await prisma.user.update({
        where: { email: 'admin@vanderoski.com' },
        data: {
          password,
          role: 'ADMIN'
        }
      });
      console.log('Usuário atualizado:', user);
    } else {
      // Criar novo usuário
      user = await prisma.user.create({
        data: {
          email: 'admin@vanderoski.com',
          name: 'Admin',
          password,
          role: 'ADMIN'
        }
      });
      console.log('Novo usuário criado:', user);
    }
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
