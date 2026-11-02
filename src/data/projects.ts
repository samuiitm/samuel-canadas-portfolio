import { defaultLocale, type Locale } from '../lib/i18n';

export type ProjectChapter = {
	title: string;
	copy: string;
	image: string;
	alt: string;
	modalAlt?: string;
	imageWidth: number;
	imageHeight: number;
};

export type PortfolioProject = {
	id: 'nfl' | 'nova-unio';
	slug: 'nova-fight-legacy' | 'nova-unio';
	index: string;
	name: string;
	descriptor: string;
	pulse: string;
	areas: string;
	year: string;
	cover: string;
	coverAlt: string;
	coverWidth: number;
	coverHeight: number;
	logo: string;
	logoWidth: number;
	logoHeight: number;
	pageTitle: string;
	metaDescription: string;
	officialUrl: string;
	officialLabel: string;
	ogImage: string;
	ogImageWidth: number;
	ogImageHeight: number;
	ogImageAlt: string;
	chapters: ProjectChapter[];
};

type ProjectId = PortfolioProject['id'];
type SharedProject = Omit<PortfolioProject, 'descriptor' | 'pulse' | 'areas' | 'coverAlt' | 'pageTitle' | 'metaDescription' | 'officialLabel' | 'ogImageAlt' | 'chapters'>;
type ProjectTranslation = Pick<PortfolioProject, 'descriptor' | 'pulse' | 'areas' | 'coverAlt' | 'pageTitle' | 'metaDescription' | 'officialLabel' | 'ogImageAlt' | 'chapters'>;

const sharedProjects: Record<ProjectId, SharedProject> = {
	nfl: {
		id: 'nfl', slug: 'nova-fight-legacy', index: '02', name: 'Nova Fight Legacy', year: '2026',
		cover: '/images/projects/nfl/cover.webp', coverWidth: 1400, coverHeight: 933,
		logo: '/images/projects/nfl/logo.svg', logoWidth: 1500, logoHeight: 1500,
		officialUrl: 'https://www.instagram.com/nflmma/',
		ogImage: '/images/projects/nfl/cover.webp', ogImageWidth: 1400, ogImageHeight: 933,
	},
	'nova-unio': {
		id: 'nova-unio', slug: 'nova-unio', index: '01', name: 'Nova Unió', year: '2026',
		cover: '/images/projects/nova-unio/cover.webp', coverWidth: 720, coverHeight: 960,
		logo: '/images/projects/nova-unio/logo.svg', logoWidth: 596, logoHeight: 842,
		officialUrl: 'https://novaunio.cat/',
		ogImage: '/images/projects/nova-unio/public-home.webp', ogImageWidth: 1425, ogImageHeight: 676,
	},
};

const translations: Record<Locale, Record<ProjectId, ProjectTranslation>> = {
	es: {
		nfl: {
			descriptor: 'Marketing digital, identidad y comunicación', pulse: 'Pulso creativo', areas: 'Marketing Digital · Identidad · Vídeo',
			coverAlt: 'Equipo y luchadores de Nova Fight Legacy durante un evento',
			pageTitle: 'Nova Fight Legacy — Marketing Digital y Contenido | Samuel Cañadas',
			metaDescription: 'Caso de estudio de Nova Fight Legacy: identidad visual, carteles, redes sociales, vídeo y comunicación digital para eventos de MMA y grappling.',
			officialLabel: 'Ver Nova Fight Legacy en Instagram', ogImageAlt: 'Equipo y luchadores de Nova Fight Legacy durante un evento',
			chapters: [
				{ title: 'Contexto', copy: 'Nova Fight Legacy nació en 2026 con la idea de crear un evento de MMA y grappling en Lloret de Mar, pero también con la intención de dar espacio al talento joven y amateur. Creemos que faltan promotoras que apuesten por peleadores que todavía están empezando y queremos que NFL también sirva para darles visibilidad y oportunidades.', image: '/images/projects/nfl/context-poster.webp', alt: 'Cartel principal de Nova Fight Legacy en Lloret de Mar', imageWidth: 689, imageHeight: 859 },
				{ title: 'Mi papel', copy: 'Me encargo de prácticamente toda la parte visual y digital de NFL: carteles, publicaciones, reels, grabación y edición de vídeo, redes sociales y la comunicación de cada evento. También preparo el contenido de luchadores, combates, resultados y todo lo que se publica antes, durante y después del evento.', image: '/images/projects/nfl/fighter-renato-junior.webp', alt: 'Anuncio de Renato Junior diseñado para Nova Fight Legacy', imageWidth: 900, imageHeight: 1125 },
				{ title: 'Proceso', copy: 'El punto de partida de cada evento es el cartel principal. Ahí se define la imagen de la edición: logo, lugar, fecha y toda la base visual que después utilizamos en el resto del contenido. A partir de ahí voy desarrollando los anuncios de peleadores y combates, publicaciones, reels, stories, entrevistas, fight week, pesaje y todo el contenido del propio evento. Gran parte del vídeo lo grabo con el iPhone y después lo edito y adapto para Instagram y TikTok.', image: '/images/projects/nfl/fight-card.webp', alt: 'Cartelera completa desarrollada a partir de la identidad principal de la edición', imageWidth: 900, imageHeight: 1125 },
				{ title: 'Resultado', copy: 'La cuenta empezó desde cero y en las primeras semanas llegó a más de 800 seguidores. Varios vídeos superaron las 20.000 visualizaciones y uno llegó a rondar las 31.000. Pero lo que más me gusta del proyecto es haber visto cómo algo que empezó siendo carteles y publicaciones acabó convirtiéndose en un evento real.', image: '/images/projects/nfl/result-social.webp', alt: 'Perfil social de Nova Fight Legacy mostrando el crecimiento y el contenido publicado', imageWidth: 900, imageHeight: 1125 },
			],
		},
		'nova-unio': {
			descriptor: 'Desarrollo web y producto digital', pulse: 'Pulso técnico', areas: 'Desarrollo Web · Producto Digital',
			coverAlt: 'Dos deportistas de Nova Unió junto a la jaula de entrenamiento',
			pageTitle: 'Nova Unió — Desarrollo Web | Samuel Cañadas',
			metaDescription: 'Caso de estudio de Nova Unió: web pública y aplicación interna para gestionar socios, clases, asistencias, cuotas y pagos.',
			officialLabel: 'Visitar novaunio.cat', ogImageAlt: 'Página de inicio pública de Nova Unió',
			chapters: [
				{ title: 'Contexto', copy: 'Nova Unió empezó como mi proyecto final de Desarrollo de Aplicaciones Web. La idea inicial era crear una nueva web para el club, pero poco a poco el proyecto fue creciendo hasta incluir también una aplicación interna para gestionar buena parte del día a día.', image: '/images/projects/nova-unio/public-home.webp', alt: 'Página de inicio pública de Nova Unió', imageWidth: 1425, imageHeight: 676 },
				{ title: 'Mi papel', copy: 'He llevado el proyecto prácticamente de principio a fin: diseño, desarrollo, base de datos, panel de gestión, dominio, hosting y despliegue. Además, al conocer el club desde dentro podía ir adaptando la web y la aplicación a problemas y necesidades reales.', image: '/images/projects/nova-unio/admin-dashboard-safe.webp', alt: 'Panel interno de gestión de Nova Unió', modalAlt: 'Dashboard del panel privado de gestión de Nova Unió', imageWidth: 1600, imageHeight: 907 },
				{ title: 'Proceso', copy: 'Primero desarrollé la parte pública con la información del club, horarios, planes, entrenadores y contacto. Después fui construyendo el panel privado con socios, clases, asistencias, cuotas, pagos y seguros. A partir de ahí he seguido mejorándolo a medida que aparecen nuevas necesidades y preparando una nueva versión con reservas y acceso mediante QR.', image: '/images/projects/nova-unio/public-story.webp', alt: 'Sección pública sobre la historia de Nova Unió', imageWidth: 1378, imageHeight: 709 },
				{ title: 'Resultado', copy: 'Lo que empezó como un proyecto de clase terminó convirtiéndose en una plataforma real para el club. La web está publicada en novaunio.cat y el proyecto ha seguido creciendo incluso después de terminar los estudios.', image: '/images/projects/nova-unio/public-disciplines.webp', alt: 'Sección pública de disciplinas de Nova Unió', imageWidth: 1407, imageHeight: 774 },
			],
		},
	},
	en: {
		nfl: {
			descriptor: 'Digital marketing, identity and communication', pulse: 'Creative pulse', areas: 'Digital Marketing · Identity · Video',
			coverAlt: 'Nova Fight Legacy team and fighters during an event',
			pageTitle: 'Nova Fight Legacy — Digital Marketing and Content | Samuel Cañadas',
			metaDescription: 'Nova Fight Legacy case study: visual identity, posters, social media, video and digital communication for MMA and grappling events.',
			officialLabel: 'View Nova Fight Legacy on Instagram', ogImageAlt: 'Nova Fight Legacy team and fighters during an event',
			chapters: [
				{ title: 'Context', copy: 'Nova Fight Legacy started in 2026 with the idea of creating an MMA and grappling event in Lloret de Mar, while also making room for young and amateur talent. We believe there are too few promoters willing to back fighters who are just starting out, and we want NFL to help give them visibility and opportunities.', image: '/images/projects/nfl/context-poster.webp', alt: 'Main Nova Fight Legacy poster for Lloret de Mar', imageWidth: 689, imageHeight: 859 },
				{ title: 'My role', copy: 'I handle almost all of NFL’s visual and digital work: posters, posts, reels, video shooting and editing, social media and communication for each event. I also prepare content about fighters, bouts and results, and everything published before, during and after each event.', image: '/images/projects/nfl/fighter-renato-junior.webp', alt: 'Renato Junior announcement designed for Nova Fight Legacy', imageWidth: 900, imageHeight: 1125 },
				{ title: 'Process', copy: 'Each event starts with the main poster. It sets the look of the edition: logo, venue, date and the visual base we then use across the rest of the content. From there, I develop fighter and bout announcements, posts, reels, stories, interviews, fight week, weigh-ins and the content from the event itself. I shoot much of the video on an iPhone, then edit and adapt it for Instagram and TikTok.', image: '/images/projects/nfl/fight-card.webp', alt: 'Full fight card developed from the edition’s main identity', imageWidth: 900, imageHeight: 1125 },
				{ title: 'Outcome', copy: 'The account started from zero and reached more than 800 followers in the first few weeks. Several videos passed 20,000 views, and one reached around 31,000. But what I value most about the project is seeing something that began as posters and posts turn into a real event.', image: '/images/projects/nfl/result-social.webp', alt: 'Nova Fight Legacy social profile showing its growth and published content', imageWidth: 900, imageHeight: 1125 },
			],
		},
		'nova-unio': {
			descriptor: 'Web development and digital product', pulse: 'Technical pulse', areas: 'Web Development · Digital Product',
			coverAlt: 'Two Nova Unió athletes beside the training cage',
			pageTitle: 'Nova Unió — Web Development | Samuel Cañadas',
			metaDescription: 'Nova Unió case study: a public website and internal application for managing members, classes, attendance, fees and payments.',
			officialLabel: 'Visit novaunio.cat', ogImageAlt: 'Nova Unió public home page',
			chapters: [
				{ title: 'Context', copy: 'Nova Unió began as my final Web Application Development project. The initial idea was to create a new website for the club, but the project gradually grew to include an internal application for managing much of its day-to-day work.', image: '/images/projects/nova-unio/public-home.webp', alt: 'Nova Unió public home page', imageWidth: 1425, imageHeight: 676 },
				{ title: 'My role', copy: 'I have handled the project almost from start to finish: design, development, database, management dashboard, domain, hosting and deployment. Knowing the club from the inside also meant I could adapt the website and application to real needs and problems.', image: '/images/projects/nova-unio/admin-dashboard-safe.webp', alt: 'Nova Unió internal management dashboard', imageWidth: 1600, imageHeight: 907 },
				{ title: 'Process', copy: 'I first developed the public website with information about the club, schedules, plans, coaches and contact details. Then I built the private dashboard for members, classes, attendance, fees, payments and insurance. Since then, I have kept improving it as new needs arise and have been preparing a new version with bookings and QR access.', image: '/images/projects/nova-unio/public-story.webp', alt: 'Public section about the history of Nova Unió', imageWidth: 1378, imageHeight: 709 },
				{ title: 'Outcome', copy: 'What started as a class project became a real platform for the club. The website is live at novaunio.cat, and the project has continued to grow even after I finished my studies.', image: '/images/projects/nova-unio/public-disciplines.webp', alt: 'Nova Unió public disciplines section', imageWidth: 1407, imageHeight: 774 },
			],
		},
	},
};

const projectOrder: ProjectId[] = ['nfl', 'nova-unio'];

export function getProjects(locale: Locale = defaultLocale): PortfolioProject[] {
	return projectOrder.map((id) => ({ ...sharedProjects[id], ...translations[locale][id] }));
}

export function getProject(id: ProjectId, locale: Locale = defaultLocale) {
	const project = getProjects(locale).find((item) => item.id === id);
	if (!project) throw new Error(`Unknown project: ${id}`);
	return project;
}
