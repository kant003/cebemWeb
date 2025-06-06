// src/lib/i18n.ts
export const languages = {
  es: 'Español',
  gl: 'Galego'
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.news': 'Noticias',
    'nav.courses': 'Cursos',
    'nav.language': 'Idioma',
    'hero.title': 'Centro de Formación Profesional',
    'hero.subtitle': 'Formación de calidad para tu futuro profesional',
    'courses.title': 'Nuestros Cursos',
    'courses.viewAll': 'Ver todos los cursos',
    'news.title': 'Últimas Noticias',
    'news.viewAll': 'Ver todas las noticias',
    'news.readMore': 'Leer más',
    'footer.contact': 'Contacto',
    'footer.phone': 'Teléfono',
    'footer.email': 'Email',
    'footer.address': 'Dirección',
    'footer.followUs': 'Síguenos',
    'footer.rights': 'Todos los derechos reservados'
  },
  gl: {
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.courses': 'Courses',
    'nav.language': 'Language',
    'hero.title': 'Vocational Training Center',
    'hero.subtitle': 'Quality training for your professional future',
    'courses.title': 'Our Courses',
    'courses.viewAll': 'View all courses',
    'news.title': 'Latest News',
    'news.viewAll': 'View all news',
    'news.readMore': 'Read more',
    'footer.contact': 'Contact',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.address': 'Address',
    'footer.followUs': 'Follow us',
    'footer.rights': 'All rights reserved'
  }
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getContentfulLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    'es': 'es-ES',
    'gl': 'en-GL'
  };
  return localeMap[lang] || 'es-ES';
}