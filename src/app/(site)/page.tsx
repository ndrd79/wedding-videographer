'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
import { PLANS } from '@/lib/constants';
import VideoThumbnail from './VideoThumbnail';
import CountUp from 'react-countup';

function Home() {
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
        <section className="relative min-h-[90vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/elegant-wedding.webp"
              alt="Elegant Wedding"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Eternizando Momentos Especiais
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-200 mb-8"
            >
              Transformamos seu casamento em uma história cinematográfica única e emocionante
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/contato"
                className="inline-block bg-[#D4AF37] text-black px-8 py-4 rounded-full font-medium hover:bg-[#D4AF37]/90 transition-colors"
              >
                Agende uma conversa
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="relative -mt-20 mb-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/portfolio?category=Casamento">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#0f1420]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#0f1420]/90 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 19h8a4 4 0 004-4 5 5 0 00-5-5 5 5 0 00-5 5H8a4 4 0 004 4z"/>
                      <path d="M12 12V8"/>
                      <path d="M12 3v3"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Casamentos</h3>
                  <p className="text-gray-400">Histórias de amor eternas</p>
                </motion.div>
              </Link>

              <Link href="/portfolio?category=Pré-Wedding">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-[#0f1420]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#0f1420]/90 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Pré-Wedding</h3>
                  <p className="text-gray-400">Momentos de romance</p>
                </motion.div>
              </Link>

              <Link href="/portfolio?category=Ensaio Fotográfico">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#0f1420]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#0f1420]/90 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                      <circle cx="12" cy="12" r="4"/>
                      <line x1="19" y1="5" x2="19" y2="5"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Ensaios</h3>
                  <p className="text-gray-400">Arte em movimento</p>
                </motion.div>
              </Link>

              <Link href="/portfolio">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-[#0f1420]/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#0f1420]/90 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Portfólio</h3>
                  <p className="text-gray-400">Conheça nosso trabalho</p>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* Black Section */}
        <section className="relative -mt-20 pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              href="/sobre"
              className="group inline-block relative"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/90 hover:text-white transition-colors duration-500">
                
              </h2>
              <div className="h-px w-0 group-hover:w-full bg-[#D4AF37] mt-3 transition-all duration-700 ease-out" />
            </Link>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 mt-20">
            <div className="backdrop-blur-[2px] bg-white/[0.02] rounded-2xl p-10 border border-white/[0.05]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-yellow-500"
                  >
                    <CountUp end={200} prefix="+" duration={2} enableScrollSpy />
                  </motion.h3>
                  <p className="text-gray-300 mt-2">Casamentos Filmados</p>
                </div>

                <div className="text-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl font-bold text-yellow-500"
                  >
                    <CountUp end={7} duration={2} enableScrollSpy />
                  </motion.h3>
                  <p className="text-gray-300 mt-2">Anos de Experiência</p>
                </div>

                <div className="text-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-4xl font-bold text-yellow-500"
                  >
                    <CountUp end={100} suffix="%" duration={2} enableScrollSpy />
                  </motion.h3>
                  <p className="text-gray-300 mt-2">Clientes Satisfeitos</p>
                </div>

                <div className="text-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-4xl font-bold text-yellow-500"
                  >
                    <CountUp end={50} prefix="+" duration={2} enableScrollSpy />
                  </motion.h3>
                  <p className="text-gray-300 mt-2">Destinos Filmados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <Link 
                href="/portfolio"
                className="group inline-block relative"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/90 hover:text-white transition-colors duration-500">
                  
                </h2>
                <div className="h-px w-0 group-hover:w-full bg-[#D4AF37] mt-3 transition-all duration-700 ease-out" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-8 relative overflow-hidden">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'url("/images/pattern-overlay.png")',
              opacity: 0.05,
              backgroundSize: '200px 200px'
            }}
          />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
                Escolha seu Plano
              </h2>
              <p className="text-gray-400/90 text-lg max-w-2xl mx-auto leading-relaxed">
                Pacotes personalizados para atender às suas necessidades e tornar seu dia ainda mais especial
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
              {PLANS.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`
                    group relative bg-black/30 backdrop-blur-sm p-5 rounded-lg
                    ${plan.popular ? 'border border-[#D4AF37]/30' : 'border border-gray-800/30'}
                    hover:border-[#D4AF37]/20 transition-all duration-500
                  `}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#D4AF37]/90 text-black px-3 py-0.5 rounded-full text-xs font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-medium text-white/90 mb-2 group-hover:text-[#D4AF37]/90 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400/90 mb-3 leading-relaxed min-h-[40px]">{plan.description}</p>
                  <div className="text-2xl font-medium text-white/90 mb-4 group-hover:text-[#D4AF37]/90 transition-colors duration-300">
                    {plan.price}
                  </div>
                  <ul className="space-y-2 mb-4 min-h-[200px] text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#D4AF37]/70 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contato"
                    className={`
                      block text-center py-2 px-4 rounded-lg font-medium transition-all duration-300 text-sm
                      ${plan.popular 
                        ? 'bg-[#D4AF37]/90 text-black hover:bg-[#D4AF37]' 
                        : 'bg-white/5 text-white/90 hover:bg-white/10'
                      }
                    `}
                  >
                    Escolher Plano
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'url("/images/pattern.png")',
              backgroundSize: '100px 100px'
            }}
          />
          
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-900 to-black p-16 rounded-2xl border border-gray-800 text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif">
                  Pronto para Eternizar seu Momento Especial?
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Entre em contato conosco para uma consulta gratuita e descubra como podemos transformar 
                  seu casamento em uma história cinematográfica única e emocionante.
                </p>
                <Link
                  href="/contato"
                  className="group relative inline-block px-12 py-5 bg-[#D4AF37] text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <span className="relative z-10">Agende uma Consulta</span>
                  <div className="absolute inset-0 bg-[#B59020] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
