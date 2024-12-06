export const ROUTES = {
  HOME: '/',
  ADMIN: {
    HOME: '/admin',
    LOGIN: '/admin/login',
    VIDEOS: '/admin/videos',
    PLANS: '/admin/plans',
    CONTACTS: '/admin/contacts',
  },
  SITE: {
    PORTFOLIO: '/portfolio',
    CONTACT: '/contato',
    PLANS: '/planos',
    ABOUT: '/sobre',
    PRIVACY: '/privacidade',
    TERMS: '/termos',
  },
} as const;

export const API_ROUTES = {
  ADMIN: {
    VIDEOS: '/api/admin/videos',
    PLANS: '/api/admin/plans',
    CONTACTS: '/api/admin/contacts',
  },
  PUBLIC: {
    CONTACT: '/api/contact',
    VIDEOS: '/api/videos/public',
    PLANS: '/api/plans',
  },
} as const;
