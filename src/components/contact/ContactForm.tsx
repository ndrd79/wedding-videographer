'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

const ContactForm = () => {
  const searchParams = useSearchParams();
  const planoSelecionado = searchParams.get('plano');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plano: planoSelecionado || '',
    date: '',
    subject: '',
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      setStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        plano: '',
        date: '',
        subject: '',
      });

    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro ao enviar mensagem',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl">
      {status.type && (
        <div
          className={`p-4 rounded-md ${
            status.type === 'success'
              ? 'bg-green-500/10 border border-green-500 text-green-500'
              : 'bg-red-500/10 border border-red-500 text-red-500'
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300"
            placeholder="Seu nome completo"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300"
            placeholder="seu@email.com"
          />
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300"
            placeholder="(00) 00000-0000"
          />
        </div>

        {/* Data do Evento */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
            Data do Evento
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300"
          />
        </div>

        {/* Assunto */}
        <div className="md:col-span-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Assunto *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300"
          >
            <option value="">Selecione um assunto</option>
            <option value="casamento">Casamento</option>
            <option value="evento">Evento Corporativo</option>
            <option value="ensaio">Ensaio</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        {/* Plano */}
        <div className="md:col-span-2">
          <label htmlFor="plano" className="block text-sm font-medium text-gray-300 mb-2">
            Plano de Interesse
          </label>
          <select
            id="plano"
            name="plano"
            value={formData.plano}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300"
          >
            <option value="">Selecione um plano</option>
            <option value="basico">Plano Básico</option>
            <option value="premium">Plano Premium</option>
            <option value="platinum">Plano Platinum</option>
          </select>
        </div>

        {/* Mensagem */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400 transition-colors duration-300 resize-none"
            placeholder="Descreva seu evento e como podemos ajudar..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 px-6 rounded-lg bg-[#D4AF37] text-black font-semibold hover:bg-[#B4941F] transition-colors duration-300 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
};

export default ContactForm;
