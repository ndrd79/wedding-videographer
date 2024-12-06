'use client';

import { motion } from 'framer-motion';
import { Camera, Heart, Award, Users, Star, Clock } from 'lucide-react';

export default function SobrePage() {
  const stats = [
    {
      icon: <Camera className="w-6 h-6" />,
      value: "150+",
      label: "Casamentos Filmados"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: "300+",
      label: "Casais Felizes"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "10+",
      label: "Anos de Experiência"
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: "50+",
      label: "Prêmios Recebidos"
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Paixão",
      description: "Amamos o que fazemos e isso se reflete em cada filme que produzimos."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Qualidade",
      description: "Utilizamos equipamentos de última geração e técnicas cinematográficas avançadas."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personalização",
      description: "Cada casal é único, e cada filme é feito sob medida para contar sua história."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Pontualidade",
      description: "Respeitamos prazos e compromissos, garantindo tranquilidade aos nossos clientes."
    }
  ];

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
        <section className="relative py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif">
                Nossa História
              </h1>
              <p className="text-xl text-gray-300">
                Há mais de uma década eternizando momentos especiais e transformando memórias em arte cinematográfica.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold mb-6 text-amber-400 font-serif">
                    Quem Somos
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Somos uma equipe apaixonada por contar histórias através das lentes de nossas câmeras. 
                      Nossa jornada começou com um sonho: transformar momentos especiais em memórias eternas 
                      através da arte cinematográfica.
                    </p>
                    <p>
                      Com anos de experiência no mercado audiovisual, desenvolvemos um estilo único que 
                      combina técnica, criatividade e sensibilidade para capturar a essência de cada momento.
                    </p>
                    <p>
                      Nossa missão é criar filmes que não apenas documentem eventos, mas que contem 
                      histórias capazes de emocionar e transportar as pessoas de volta àquele momento 
                      especial, mesmo anos depois.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="/images/elegant-wedding.webp"
                    alt="Nossa equipe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-400/10">
                    <div className="text-amber-400">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-white font-serif">
                Nossos Valores
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Princípios que guiam nosso trabalho e nos ajudam a entregar sempre o melhor para nossos clientes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-white/10 p-6 rounded-xl text-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-amber-400/10 text-amber-400 
                    group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-white font-serif">
                Nossa Equipe
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Profissionais apaixonados e dedicados a transformar seus momentos especiais em obras de arte cinematográficas.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-sm bg-white/10 rounded-xl overflow-hidden group hover:bg-white/20 transition-all duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <Users className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">João Silva</h3>
                  <p className="text-amber-400 mb-4">Diretor de Fotografia</p>
                  <p className="text-gray-300 text-sm">
                    Especialista em capturar momentos únicos com um olhar artístico e sensível.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="backdrop-blur-sm bg-white/10 rounded-xl overflow-hidden group hover:bg-white/20 transition-all duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Maria Santos</h3>
                  <p className="text-amber-400 mb-4">Cinegrafista Principal</p>
                  <p className="text-gray-300 text-sm">
                    Profissional com vasta experiência em filmagens de casamento e eventos especiais.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="backdrop-blur-sm bg-white/10 rounded-xl overflow-hidden group hover:bg-white/20 transition-all duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-400/10 flex items-center justify-center">
                    <Heart className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Pedro Oliveira</h3>
                  <p className="text-amber-400 mb-4">Editor Chefe</p>
                  <p className="text-gray-300 text-sm">
                    Responsável por transformar as filmagens em histórias emocionantes e memoráveis.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
