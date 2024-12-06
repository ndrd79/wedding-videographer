import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl">
      <h3 className="text-2xl font-bold mb-6 text-white">Informações de Contato</h3>
      
      <div className="space-y-6">
        {/* Telefone */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
            <FaPhone className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Telefone</h4>
            <a 
              href="tel:+5544984058208" 
              className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
            >
              (44) 98405-8208
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
            <FaEnvelope className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Email</h4>
            <a 
              href="mailto:contato@vanderoski.com" 
              className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
            >
              contato@vanderoski.com
            </a>
          </div>
        </div>

        {/* Endereço */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Localização</h4>
            <p className="text-gray-400">
              Maringá - PR
            </p>
          </div>
        </div>

        {/* Horário */}
        <div className="flex items-start space-x-4">
          <div className="bg-[#D4AF37]/10 p-3 rounded-lg">
            <FaClock className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Horário de Atendimento</h4>
            <div className="text-gray-400">
              <p>Segunda - Sexta: 9h às 18h</p>
              <p>Sábado: 9h às 15h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="pt-6 border-t border-gray-800">
          <h4 className="font-medium text-white mb-4">Redes Sociais</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.youtube.com/@a.vanderoscki"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37]/10 p-3 rounded-lg hover:bg-[#D4AF37]/20 transition-colors duration-300"
            >
              <span className="sr-only">YouTube</span>
              <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/15Xhh9vPsB/?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37]/10 p-3 rounded-lg hover:bg-[#D4AF37]/20 transition-colors duration-300"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/a.vanderoscki?igsh=NWh3bTR0ZTJ6MWM3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37]/10 p-3 rounded-lg hover:bg-[#D4AF37]/20 transition-colors duration-300"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
