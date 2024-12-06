import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { addDays, format, startOfDay } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  try {
    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@vanderoski.com' },
      update: {},
      create: {
        email: 'admin@vanderoski.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created:', admin);

    // Limpar dados de disponibilidade existentes
    await prisma.availability.deleteMany();
    console.log('Cleaned up old availability data');

    // Criar disponibilidade para os próximos 30 dias
    const today = startOfDay(new Date());
    const availabilityData = Array.from({ length: 30 }, (_, i) => {
      const date = addDays(today, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      return {
        date,
        isAvailable: isWeekend, // Apenas fins de semana disponíveis
        isBooked: false,
        notes: isWeekend ? 'Disponível para reserva' : 'Indisponível - Dia útil'
      };
    });

    // Inserir dados de disponibilidade
    const createdDates = await Promise.all(
      availabilityData.map(data =>
        prisma.availability.create({
          data: {
            date: data.date,
            isAvailable: data.isAvailable,
            isBooked: data.isBooked,
            notes: data.notes
          }
        })
      )
    );

    console.log(`Created ${createdDates.length} availability records`);
  } catch (error) {
    console.error('Error in seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
