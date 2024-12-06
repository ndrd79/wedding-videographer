const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    // Ler o arquivo JSON
    const plansData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'plans.json'), 'utf8')
    );

    // Limpar planos existentes
    await prisma.plan.deleteMany();
    
    // Adicionar novos planos
    for (const plan of plansData.plans) {
      await prisma.plan.create({
        data: plan
      });
      console.log(`Created plan: ${plan.name}`);
    }

    console.log('All plans created successfully!');
  } catch (error) {
    console.error('Error seeding plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
