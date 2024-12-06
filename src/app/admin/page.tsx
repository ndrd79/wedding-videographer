'use client'

import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  
  const estatisticas = [
    {
      titulo: 'Total de Vídeos',
      valor: '48',
      tendencia: 'up',
      percentual: '12%'
    },
    {
      titulo: 'Eventos Agendados',
      valor: '8',
      tendencia: 'up',
      percentual: '25%'
    },
    {
      titulo: 'Novas Mensagens',
      valor: '16',
      tendencia: 'down',
      percentual: '8%'
    },
    {
      titulo: 'Clientes Ativos',
      valor: '124',
      tendencia: 'up',
      percentual: '4%'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
        <p className="text-gray-400">Aqui está um resumo do seu negócio</p>
      </div>

      {/* Grade de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estatisticas.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1C1F2C] p-6 rounded-xl border border-gray-800"
          >
            <h3 className="text-gray-400 text-sm font-medium">{stat.titulo}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{stat.valor}</p>
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.tendencia === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.tendencia === 'up' ? '↑' : '↓'} {stat.percentual}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Eventos Recentes */}
      <div className="bg-[#1C1F2C] rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Eventos Recentes</h2>
          <button 
            onClick={() => router.push('/admin/agenda')}
            className="text-[#D4AF37] hover:text-[#B59020] text-sm"
          >
            Ver todos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3">Evento</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Valor</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-3">Casamento Silva</td>
                <td>10/12/2023</td>
                <td>
                  <span className="px-2 py-1 text-sm rounded-full bg-green-500/10 text-green-500">
                    Concluído
                  </span>
                </td>
                <td>R$ 3.500</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3">Aniversário 15 Anos</td>
                <td>15/12/2023</td>
                <td>
                  <span className="px-2 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-500">
                    Em Progresso
                  </span>
                </td>
                <td>R$ 2.800</td>
              </tr>
              <tr>
                <td className="py-3">Formatura Medicina</td>
                <td>20/12/2023</td>
                <td>
                  <span className="px-2 py-1 text-sm rounded-full bg-blue-500/10 text-blue-500">
                    Agendado
                  </span>
                </td>
                <td>R$ 4.200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
