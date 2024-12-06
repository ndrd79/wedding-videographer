import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('admin123', 12);
  
  try {
    const user = await prisma.user.upsert({
      where: { email: 'admin@vanderoski.com' },
      update: {
        password,
        role: 'ADMIN'
      },
      create: {
        email: 'admin@vanderoski.com',
        name: 'Admin',
        password,
        role: 'ADMIN'
      }
    });
    
    console.log('Usuário admin criado/atualizado:', user);
  } catch (error) {
    console.error('Erro:', error);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
