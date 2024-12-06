export const routes = {
  home: '/',
  portfolio: '/portfolio',
  planos: '/planos',
  sobre: '/sobre',
  contato: '/contato',
  termos: '/termos',
  privacidade: '/privacidade'
} as const;

export type RouteKey = keyof typeof routes;
