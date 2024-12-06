const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Limpa planos existentes
    await prisma.plan.deleteMany();
    
    const plans = [
      {
        name: "Bronze",
        price: 3500,
        features: JSON.stringify([
          "Cobertura de 6 horas",
          "Filme do casamento (10-15 min)",
          "Teaser para redes sociais",
          "Entrega em até 60 dias",
          "1 Fotógrafo"
        ]),
        highlight: false,
        discount: 0
      },
      {
        name: "Prata",
        price: 4500,
        features: JSON.stringify([
          "Cobertura de 8 horas",
          "Filme do casamento (15-20 min)",
          "Teaser para redes sociais",
          "Drone (quando permitido)",
          "Entrega em até 45 dias",
          "1 Fotógrafo",
          "Making of dos noivos"
        ]),
        highlight: true,
        discount: 0
      },
      {
        name: "Ouro",
        price: 5500,
        features: JSON.stringify([
          "Cobertura de 10 horas",
          "Filme do casamento (20-25 min)",
          "Teaser para redes sociais",
          "Drone (quando permitido)",
          "Entrega em até 30 dias",
          "2 Fotógrafos",
          "Making of dos noivos",
          "Ensaio pré-wedding",
          "Álbum digital"
        ]),
        highlight: true,
        discount: 0
      },
      {
        name: "Diamante",
        price: 7500,
        features: JSON.stringify([
          "Cobertura de 12 horas",
          "Filme do casamento (25-30 min)",
          "Teaser para redes sociais",
          "Drone (quando permitido)",
          "Entrega em até 20 dias",
          "2 Fotógrafos",
          "Making of dos noivos",
          "Ensaio pré-wedding",
          "Álbum digital e impresso",
          "Cobertura do ensaio",
          "Vídeo completo da cerimônia"
        ]),
        highlight: true,
        discount: 0
      }
    ];

    for (const plan of plans) {
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