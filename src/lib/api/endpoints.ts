export const endpoints = {
  auth: {
    login: '/auth/login/',
    register: '/auth/register/',
    refresh: '/auth/token/refresh/',
    me: '/auth/me/'
  },
  user: {
    profile: '/users/me/'
  },
  services: {
    list: '/services/',
    detail: (id: string) => `/services/${id}/`,
    estimate: '/services/estimate/',
    cancel: (id: string) => `/services/${id}/cancel/`
  },
  payments: {
    methods: '/payments/methods/'
  },
  support: {
    tickets: '/support/tickets/'
  }
} as const;
