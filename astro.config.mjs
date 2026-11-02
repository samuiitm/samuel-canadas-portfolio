// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://samuelcanadas.com',
	trailingSlash: 'always',
	integrations: [
		react(),
		sitemap({
			filter: (page) => !page.endsWith('/404/'),
			serialize(item) {
				const path = new URL(item.url).pathname;
				const projectMatch = path.match(/\/(?:en\/projects|proyectos)\/([^/]+)\/?$/);
				if (projectMatch) {
					const slug = projectMatch[1];
					item.links = [
						{ lang: 'es-ES', url: `https://samuelcanadas.com/proyectos/${slug}/` },
						{ lang: 'en', url: `https://samuelcanadas.com/en/projects/${slug}/` },
						{ lang: 'x-default', url: `https://samuelcanadas.com/proyectos/${slug}/` },
					];
				} else if (path === '/' || path === '/en/') {
					item.links = [
						{ lang: 'es-ES', url: 'https://samuelcanadas.com/' },
						{ lang: 'en', url: 'https://samuelcanadas.com/en/' },
						{ lang: 'x-default', url: 'https://samuelcanadas.com/' },
					];
				}
				return item;
			},
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es-ES', en: 'en' },
			},
			namespaces: { news: false, xhtml: true, video: false },
		}),
	],
	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
