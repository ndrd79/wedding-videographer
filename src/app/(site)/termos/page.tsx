'use client';

import { motion } from 'framer-motion';
import { Scale, FileCheck, Clock, Wallet, Camera, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Termos Gerais",
      content: `1. Ao contratar nossos serviços, você concorda com todos os termos aqui estabelecidos.
        2. Reservamo-nos o direito de modificar estes termos a qualquer momento.
        3. Notificaremos sobre alterações significativas.
        4. O uso continuado dos serviços implica na aceitação dos novos termos.
        5. Em caso de dúvidas, entre em contato conosco.`
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Serviços",
      content: `Nossos serviços incluem:
        • Filmagem do evento conforme pacote contratado
        • Edição profissional do material
        • Entrega no formato acordado
        • Backup do material por 6 meses
        
        Garantimos:
        • Qualidade profissional
        • Cumprimento de prazos
        • Equipamentos de backup
        • Equipe qualificada`
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Pagamentos",
      content: `Política de pagamentos:
        • Sinal de 30% na contratação
        • 40% uma semana antes do evento
        • 30% na entrega do material
        
        Formas de pagamento:
        • Transferência bancária
        • PIX
        • Cartão de crédito (até 12x)
        • Dinheiro`
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Prazos",
      content: `Nossos prazos de entrega:
        • Teaser: 7 dias úteis
        • Vídeo completo: 30-45 dias úteis
        • Material bruto: sob consulta
        
        Observações:
        • Prazos começam após aprovação do roteiro
        • Alterações podem estender os prazos
        • Entregas urgentes têm taxa adicional`
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Cancelamento",
      content: `Política de cancelamento:
        • Até 90 dias: devolução de 70% do sinal
        • Até 60 dias: devolução de 50% do sinal
        • Até 30 dias: sem devolução
        
        Em caso de força maior:
        • Reagendamento sem custo
        • Análise caso a caso
        • Prioridade na nova data`
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Direitos e Licenças",
      content: `Sobre os direitos:
        • Mantemos direitos autorais
        • Cliente tem licença de uso pessoal
        • Uso comercial requer autorização
        • Podemos usar para portfolio
        
        Material entregue:
        • Formato digital HD/4K
        • Backup por 6 meses
        • Cópias extras sob consulta`
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
                Termos de Uso
              </h1>
              <p className="text-xl text-gray-300">
                Entenda nossos termos e condições para garantir uma parceria transparente e profissional.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-amber-400/10 p-3 rounded-lg">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-amber-400 font-serif">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-gray-300 whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Agreement Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 text-center text-gray-400"
            >
              <p>Última atualização: {new Date().toLocaleDateString()}</p>
              <p className="mt-2">
                Ao contratar nossos serviços, você concorda com todos os termos acima.
                Para mais informações, entre em contato através da nossa{' '}
                <a href="/contato" className="text-amber-400 hover:text-amber-300 transition-colors">
                  página de contato
                </a>
                .
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
