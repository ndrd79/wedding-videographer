'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Users, Camera } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Coleta de Dados",
      content: `Coletamos apenas as informações necessárias para a prestação dos nossos serviços, incluindo:
        • Nome completo
        • Endereço de e-mail
        • Número de telefone
        • Data do evento
        • Informações sobre o evento
        
        Estas informações são coletadas quando você:
        • Preenche nosso formulário de contato
        • Solicita um orçamento
        • Contrata nossos serviços`
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Uso das Informações",
      content: `Utilizamos suas informações para:
        • Responder suas solicitações
        • Enviar orçamentos
        • Prestar nossos serviços
        • Melhorar nossa comunicação
        • Personalizar sua experiência
        
        Não compartilhamos suas informações com terceiros sem seu consentimento.`
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Uso de Imagens",
      content: `Sobre o uso de imagens e vídeos:
        • Solicitamos autorização prévia para uso promocional
        • Respeitamos sua privacidade e preferências
        • Mantemos backups seguros do material
        • Oferecemos opção de restrição de uso
        
        Você pode solicitar a remoção de qualquer conteúdo a qualquer momento.`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Segurança",
      content: `Protegemos suas informações através de:
        • Criptografia de dados
        • Acesso restrito
        • Backups regulares
        • Monitoramento constante
        
        Mantemos suas informações apenas pelo tempo necessário.`
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Seus Direitos",
      content: `Você tem direito a:
        • Acessar seus dados
        • Solicitar correções
        • Pedir exclusão
        • Revogar autorizações
        • Solicitar portabilidade
        
        Entre em contato conosco para exercer estes direitos.`
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Cookies",
      content: `Utilizamos cookies para:
        • Melhorar a navegação
        • Personalizar conteúdo
        • Analisar tráfego
        • Otimizar performance
        
        Você pode desabilitar cookies nas configurações do seu navegador.`
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
                Política de Privacidade
              </h1>
              <p className="text-xl text-gray-300">
                Seu direito à privacidade é uma prioridade para nós. Saiba como protegemos e utilizamos suas informações.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Privacy Content */}
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

            {/* Last Update */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 text-center text-gray-400"
            >
              <p>Última atualização: {new Date().toLocaleDateString()}</p>
              <p className="mt-2">
                Para mais informações, entre em contato conosco através da nossa{' '}
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
