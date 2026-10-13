export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const ui = {
	es: {
		header: {
			navigationLabel: 'Navegación principal',
			languageLabel: 'Idioma actual: español',
			work: 'Proyectos',
			about: 'Sobre mí',
			archive: 'Archivo',
			contact: 'Contacto',
		},
	},
	en: {
		header: {
			navigationLabel: 'Main navigation',
			languageLabel: 'Current language: English',
			work: 'Work',
			about: 'About',
			archive: 'Archive',
			contact: 'Contact',
		},
	},
} as const;
