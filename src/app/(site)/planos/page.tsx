'use client';

import { useState } from 'react';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export default function PlanosPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const plans = [
    {
      id: '1',
      name: 'Bronze',
      description: 'Para uma cobertura essencial do seu grande dia',
      price: 2990,
      features: [
        'Cobertura de 6 horas',
        'Video highlight de 3-5 minutos',
        'Video completo da cerimônia'
      ]
    },
    {
      id: '2',
      name: 'Prata',
      description: 'Para uma cobertura completa do seu grande dia',
      price: 3990,
      features: [
        'Cobertura de 8 horas',
        'Video highlight de 5-7 minutos',
        'Video completo da cerimônia',
        'Making of dos noivos'
      ]
    },
    {
      id: '3',
      name: 'Ouro',
      description: 'Para uma cobertura premium do seu grande dia',
      price: 4990,
      popular: true,
      features: [
        'Cobertura de 12 horas',
        'Video highlight de 8-10 minutos',
        'Video completo da cerimônia',
        'Making of dos noivos',
        'Drone para tomadas aéreas'
      ]
    },
    {
      id: '4',
      name: 'Diamante',
      description: 'Para uma cobertura exclusiva e luxuosa do seu grande dia',
      price: 6990,
      features: [
        'Cobertura ilimitada',
        'Video highlight de 10-15 minutos',
        'Video completo da cerimônia',
        'Making of dos noivos',
        'Drone para tomadas aéreas',
        'Segundo cinegrafista',
        'Ensaio pré-wedding'
      ]
    }
  ];

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowCalendar(true);
  };

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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif">
                Nossos Planos
              </h1>
              <p className="text-xl text-gray-300">
                Escolha o plano perfeito para eternizar o seu grande dia
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 mb-20">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative bg-white/[0.02] backdrop-blur-[2px] border border-white/5 
                    rounded-xl overflow-hidden transition-all duration-500 group
                    hover:bg-white/[0.05] hover:backdrop-blur-[6px] hover:border-white/10
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                    ${plan.popular ? 'border-[#D4AF37]/20' : ''}`}
                >
                  {/* Efeito de brilho no hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                  </div>

                  {plan.popular && (
                    <>
                      {/* Brilho de fundo para destaque */}
                      <div className="absolute -top-3 left-0 right-0 h-12 bg-gradient-to-b from-amber-400/20 to-transparent"></div>
                      
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <span className="bg-amber-400 text-black text-sm font-bold px-6 py-1.5 rounded-full shadow-xl">
                          Mais Popular
                        </span>
                      </div>
                    </>
                  )}

                  <div className="relative p-6 pt-16 z-10">
                    {/* Cabeçalho do Card */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {plan.name}
                      </h3>
                      <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                        R$ {plan.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {plan.description}
                      </p>
                    </div>

                    {/* Lista de Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <Check className="h-5 w-5 text-[#D4AF37] mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Botão */}
                    <button
                      onClick={() => handlePlanSelect(plan)}
                      className="w-full py-3 px-4 bg-[#D4AF37] text-black font-semibold rounded-lg 
                        hover:bg-[#B59020] transition-all duration-300 transform hover:scale-105 
                        hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                    >
                      Escolher Plano
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {showCalendar && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 mt-20 max-w-4xl mx-auto"
              >
                <h2 className="text-3xl font-bold text-amber-400 font-serif mb-6 text-center">
                  Verifique nossa disponibilidade
                </h2>
                {selectedPlan && (
                  <div className="text-center mb-8">
                    <p className="text-gray-300">
                      Plano selecionado: <span className="text-amber-400">{selectedPlan.name}</span>
                    </p>
                  </div>
                )}
                <AvailabilityCalendar />
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
