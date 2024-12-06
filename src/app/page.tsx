'use client';

import { PLANS } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MainNav from './components/MainNav';

export default function Home() {
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
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/elegant-wedding.webp")',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
              Eternizando Momentos Especiais
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Transformando seu dia especial em memórias cinematográficas inesquecíveis, com a elegância que seu momento merece
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link 
                href="/contato"
                className="inline-block px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#B59020] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                Agende uma Consulta
              </Link>
              <Link 
                href="/portfolio"
                className="inline-block px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 transform hover:scale-105"
              >
                Ver Portfólio
              </Link>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-bold text-center text-white mb-16 font-serif">
                Nossos Serviços
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Oferecemos uma experiência cinematográfica única para eternizar seus momentos mais especiais
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Casamentos",
                  description: "Capturamos cada momento especial do seu grande dia, desde os preparativos até a festa, com um olhar cinematográfico único",
                  icon: (
                    <svg 
                      className="w-16 h-16 text-[#D4AF37]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-label="Ícone de coração representando casamentos"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )
                },
                {
                  title: "Eventos Corporativos",
                  description: "Cobertura profissional para conferências e eventos empresariais, com foco na qualidade e elegância",
                  icon: (
                    <svg 
                      className="w-16 h-16 text-[#D4AF37]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-label="Ícone de maleta representando eventos corporativos"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  title: "Ensaios",
                  description: "Sessões pré-wedding e ensaios especiais com direção artística para criar momentos únicos e memoráveis",
                  icon: (
                    <svg 
                      className="w-16 h-16 text-[#D4AF37]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-label="Ícone de câmera representando ensaios fotográficos"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group backdrop-blur-sm bg-white/10 rounded-xl p-6 transition-all duration-300
                    hover:bg-white/20 hover:transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="text-amber-400 mb-4 text-4xl">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 text-white font-serif">Nossos Planos</h2>
              <p className="text-xl text-gray-400">
                Escolha o plano perfeito para o seu casamento
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
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
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">{plan.name}</h3>
                      <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                        {plan.price}
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{plan.description}</p>
                    </div>

                    {/* Lista de Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg
                            className="w-4 h-4 text-[#D4AF37] mt-0.5 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Botão */}
                    <div className="text-center">
                      <Link
                        href={`/planos`}
                        className={`inline-block w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 
                          ${plan.popular
                            ? 'bg-[#D4AF37] text-black hover:bg-[#B39030] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                            : 'bg-white/5 text-white hover:bg-white/10 hover:shadow-lg'
                          }`}
                      >
                        Ver Mais Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato CTA Section */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Pronto para <span className="text-[#D4AF37]">Eternizar</span> seus Momentos?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Entre em contato conosco e vamos criar juntos uma história cinematográfica única
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="inline-block bg-[#D4AF37] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#B4941F] transition-all duration-300 transform hover:scale-105"
                >
                  Agendar Consulta
                </Link>
                <a
                  href="tel:+5544984058208"
                  className="inline-block bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  (44) 98405-8208
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
