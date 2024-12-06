'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

const services = [
  {
    title: "Cobertura Completa",
    description: "Documentação cinematográfica completa do seu casamento, desde os preparativos até o grand finale da festa.",
    features: [
      "Filmagem em 4K Ultra HD",
      "Captação aérea com drone",
      "Equipe profissional experiente",
      "Edição cinematográfica premium",
      "Áudio profissional",
      "Entrega em alta resolução",
      "Backup em nuvem",
      "Suporte dedicado"
    ]
  },
  {
    title: "Same Day Edit",
    description: "Uma prévia emocionante do seu grande dia, editada e exibida durante a própria festa de casamento.",
    features: [
      "Edição em tempo real",
      "Exibição durante a festa",
      "Momentos mais marcantes",
      "Trilha sonora personalizada",
      "Equipamento de projeção",
      "Técnico dedicado",
      "Formato otimizado",
      "Cópia digital"
    ]
  },
  {
    title: "Filme do Casamento",
    description: "Sua história de amor transformada em uma obra cinematográfica digna das telonas.",
    features: [
      "Edição artística exclusiva",
      "Color grading profissional",
      "Trilha sonora licenciada",
      "Entrega em alta resolução",
      "Versões para redes sociais",
      "Cenas extras",
      "Menu interativo",
      "Cópias físicas e digitais"
    ]
  },
  {
    title: "Pré-Wedding",
    description: "Sessão cinematográfica antes do casamento para contar sua história de amor de forma única.",
    features: [
      "Roteiro personalizado",
      "Locações especiais",
      "Edição cinematográfica",
      "Trilha sonora exclusiva",
      "Drone incluso",
      "Making of",
      "Versão curta e longa",
      "Entrega expressa"
    ]
  }
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: 'url("/images/pattern.png")',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Content container */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/elegant-wedding.webp")'
            }}
          />
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif">
                Nossos Serviços
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Cada momento do seu casamento merece ser eternizado com a mais alta qualidade e sensibilidade.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-[2px] bg-white/[0.05] rounded-2xl p-8 border border-white/[0.1]"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-[2px] bg-white/[0.05] rounded-2xl p-8 border border-white/[0.1]"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vamos Criar Algo Especial Juntos?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Cada casamento é único, e estamos aqui para capturar a essência do seu amor de maneira cinematográfica.
              </p>
              <a
                href="/contato"
                className="inline-block bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors"
              >
                Entre em Contato
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
