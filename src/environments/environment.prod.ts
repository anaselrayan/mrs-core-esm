export const environment = {
  production: true,
  apiUrl: 'https://api.hospital-system.com/api',
  appName: 'Hospital Information System',
  version: '1.0.0',
  features: {
    enableDarkMode: true,
    enableNotifications: true,
    enableI18n: true,
  },
  apiEndpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      profile: '/auth/profile',
    },
    patients: {
      list: '/patients',
      create: '/patients',
      update: '/patients',
      delete: '/patients',
      search: '/patients/search',
    },
    appointments: {
      list: '/appointments',
      create: '/appointments',
      update: '/appointments',
      delete: '/appointments',
      calendar: '/appointments/calendar',
    },
  },
};

