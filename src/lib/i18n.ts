export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const localeLabels: Record<Locale, string> = {
	es: 'Español',
	en: 'English',
};

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

export function getHomePath(locale: Locale) {
	return locale === 'en' ? '/en/' : '/';
}

export function getProjectPath(slug: string, locale: Locale) {
	return locale === 'en' ? `/en/projects/${slug}/` : `/proyectos/${slug}/`;
}

export function getLocalizedPath(pathname: string, locale: Locale) {
	if (/\/(?:en\/)?404\/?$/.test(pathname)) return locale === 'en' ? '/en/404/' : '/404/';
	const projectMatch = pathname.match(/\/(?:en\/projects|proyectos)\/([^/]+)\/?$/);
	return projectMatch ? getProjectPath(projectMatch[1], locale) : getHomePath(locale);
}
