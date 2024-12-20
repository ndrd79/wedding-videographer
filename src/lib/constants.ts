export const COLORS = {
  primary: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    gold: '#D4AF37',
  },
} as const;

export const PLANS = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 'R$ 2.990',
    description: 'Perfeito para casamentos íntimos',
    features: [
      'Cobertura de 6 horas',
      'Vídeo highlight de 3-5 minutos',
      'Entrega digital em HD',
      'Trilha sonora licenciada',
    ],
  },
  {
    id: 'prata',
    name: 'Prata',
    price: 'R$ 3.990',
    description: 'Ideal para capturar todos os momentos especiais',
    features: [
      'Cobertura de 8 horas',
      'Vídeo highlight de 5-7 minutos',
      'Vídeo completo da cerimônia',
      'Entrega digital em 4K',
      'Trilha sonora personalizada',
    ],
  },
  {
    id: 'ouro',
    name: 'Ouro',
    price: 'R$ 4.990',
    description: 'Para uma cobertura premium do seu grande dia',
    popular: true,
    features: [
      'Cobertura de 12 horas',
      'Vídeo highlight de 8-10 minutos',
      'Vídeo completo da cerimônia',
      'Making of dos preparativos',
      'Entrega digital em 4K',
      'Trilha sonora personalizada',
      'Drone (mediante autorização)',
      'Entrega em pendrive personalizado',
    ],
  },
  {
    id: 'diamante',
    name: 'Diamante',
    price: 'R$ 6.990',
    description: 'A experiência mais luxuosa e completa',
    features: [
      'Cobertura ilimitada (até 16 horas)',
      'Vídeo highlight de 10-15 minutos',
      'Vídeo completo da cerimônia',
      'Making of completo (noiva e noivo)',
      'Entrega digital em 4K HDR',
      'Trilha sonora totalmente personalizada',
      'Cobertura com drone premium',
      'Entrega em SSD personalizado',
      'Álbum digital interativo',
      'Teaser para redes sociais',
      'Equipe com 3 cinegrafistas',
    ],
  },
] as const;
