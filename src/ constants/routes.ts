/**
 * Application Routes
 * Central location for all application routes
 */

export const ROUTES = {
  HOME: '/',
  WORK_EXPERIENCES: '/work-experiences',
  NOT_FOUND: '/404',
} as const;

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  {
    label: 'Início',
    href: ROUTES.HOME,
    icon: '',
  },
  {
    label: 'Work Experiences',
    href: ROUTES.WORK_EXPERIENCES,
    icon: '',
  },
] as const;
