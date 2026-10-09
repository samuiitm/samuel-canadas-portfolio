export type ProjectChapter = {
	title: string;
	copy: string;
	image: string;
	alt: string;
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

export const projects: PortfolioProject[] = [
	{
		id: 'nfl', slug: 'nova-fight-legacy', index: '02', name: 'Nova Fight Legacy',
		descriptor: 'Marketing digital, identidad y comunicación', pulse: 'Pulso creativo',
		areas: 'Marketing Digital · Identidad · Vídeo', year: '2026',
		cover: '/images/projects/nfl/cover.webp', coverAlt: 'Equipo y luchadores de Nova Fight Legacy durante un evento', coverWidth: 1400, coverHeight: 933,
		logo: '/images/projects/nfl/logo.svg', logoWidth: 1500, logoHeight: 1500,
		pageTitle: 'Nova Fight Legacy — Marketing Digital y Contenido | Samuel Cañadas',
		metaDescription: 'Caso de estudio de Nova Fight Legacy: identidad visual, carteles, redes sociales, vídeo y comunicación digital para eventos de MMA y grappling.',
		officialUrl: 'https://www.instagram.com/nflmma/', officialLabel: 'Ver Nova Fight Legacy en Instagram',
		ogImage: '/images/projects/nfl/cover.webp', ogImageWidth: 1400, ogImageHeight: 933, ogImageAlt: 'Equipo y luchadores de Nova Fight Legacy durante un evento',
		chapters: [
			{ title: 'Contexto', copy: 'Nova Fight Legacy nació en 2026 con la idea de crear un evento de MMA y grappling en Lloret de Mar, pero también con la intención de dar espacio al talento joven y amateur. Creemos que faltan promotoras que apuesten por peleadores que todavía están empezando y queremos que NFL también sirva para darles visibilidad y oportunidades.', image: '/images/projects/nfl/context-poster.webp', alt: 'Cartel principal de Nova Fight Legacy en Lloret de Mar', imageWidth: 689, imageHeight: 859 },
			{ title: 'Mi papel', copy: 'Me encargo de prácticamente toda la parte visual y digital de NFL: carteles, publicaciones, reels, grabación y edición de vídeo, redes sociales y la comunicación de cada evento. También preparo el contenido de luchadores, combates, resultados y todo lo que se publica antes, durante y después del evento.', image: '/images/projects/nfl/fighter-renato-junior.webp', alt: 'Anuncio de Renato Junior diseñado para Nova Fight Legacy', imageWidth: 900, imageHeight: 1125 },
			{ title: 'Proceso', copy: 'El punto de partida de cada evento es el cartel principal. Ahí se define la imagen de la edición: logo, lugar, fecha y toda la base visual que después utilizamos en el resto del contenido. A partir de ahí voy desarrollando los anuncios de peleadores y combates, publicaciones, reels, stories, entrevistas, fight week, pesaje y todo el contenido del propio evento. Gran parte del vídeo lo grabo con el iPhone y después lo edito y adapto para Instagram y TikTok.', image: '/images/projects/nfl/fight-card.webp', alt: 'Cartelera completa desarrollada a partir de la identidad principal de la edición', imageWidth: 900, imageHeight: 1125 },
			{ title: 'Resultado', copy: 'La cuenta empezó desde cero y en las primeras semanas llegó a más de 800 seguidores. Varios vídeos superaron las 20.000 visualizaciones y uno llegó a rondar las 31.000. Pero lo que más me gusta del proyecto es haber visto cómo algo que empezó siendo carteles y publicaciones acabó convirtiéndose en un evento real.', image: '/images/projects/nfl/result-social.webp', alt: 'Perfil social de Nova Fight Legacy mostrando el crecimiento y el contenido publicado', imageWidth: 900, imageHeight: 1125 },
		],
	},
	{
		id: 'nova-unio', slug: 'nova-unio', index: '01', name: 'Nova Unió',
		descriptor: 'Desarrollo web y producto digital', pulse: 'Pulso técnico',
		areas: 'Desarrollo Web · Producto Digital', year: '2026',
		cover: '/images/projects/nova-unio/cover.webp', coverAlt: 'Dos deportistas de Nova Unió junto a la jaula de entrenamiento', coverWidth: 720, coverHeight: 960,
		logo: '/images/projects/nova-unio/logo.svg', logoWidth: 596, logoHeight: 842,
		pageTitle: 'Nova Unió — Desarrollo Web | Samuel Cañadas',
		metaDescription: 'Caso de estudio de Nova Unió: web pública y aplicación interna para gestionar socios, clases, asistencias, cuotas y pagos.',
		officialUrl: 'https://novaunio.cat/', officialLabel: 'Visitar novaunio.cat',
		ogImage: '/images/projects/nova-unio/public-home.webp', ogImageWidth: 1425, ogImageHeight: 676, ogImageAlt: 'Página de inicio pública de Nova Unió',
		chapters: [
			{ title: 'Contexto', copy: 'Nova Unió empezó como mi proyecto final de Desarrollo de Aplicaciones Web. La idea inicial era crear una nueva web para el club, pero poco a poco el proyecto fue creciendo hasta incluir también una aplicación interna para gestionar buena parte del día a día.', image: '/images/projects/nova-unio/public-home.webp', alt: 'Página de inicio pública de Nova Unió', imageWidth: 1425, imageHeight: 676 },
			{ title: 'Mi papel', copy: 'He llevado el proyecto prácticamente de principio a fin: diseño, desarrollo, base de datos, panel de gestión, dominio, hosting y despliegue. Además, al conocer el club desde dentro podía ir adaptando la web y la aplicación a problemas y necesidades reales.', image: '/images/projects/nova-unio/admin-dashboard-safe.webp', alt: 'Panel interno de gestión de Nova Unió', imageWidth: 1600, imageHeight: 907 },
			{ title: 'Proceso', copy: 'Primero desarrollé la parte pública con la información del club, horarios, planes, entrenadores y contacto. Después fui construyendo el panel privado con socios, clases, asistencias, cuotas, pagos y seguros. A partir de ahí he seguido mejorándolo a medida que aparecen nuevas necesidades y preparando una nueva versión con reservas y acceso mediante QR.', image: '/images/projects/nova-unio/public-story.webp', alt: 'Sección pública sobre la historia de Nova Unió', imageWidth: 1378, imageHeight: 709 },
			{ title: 'Resultado', copy: 'Lo que empezó como un proyecto de clase terminó convirtiéndose en una plataforma real para el club. La web está publicada en novaunio.cat y el proyecto ha seguido creciendo incluso después de terminar los estudios.', image: '/images/projects/nova-unio/public-disciplines.webp', alt: 'Sección pública de disciplinas de Nova Unió', imageWidth: 1407, imageHeight: 774 },
		],
	},
];

export const getProject = (id: PortfolioProject['id']) => {
	const project = projects.find((item) => item.id === id);
	if (!project) throw new Error(`Unknown project: ${id}`);
	return project;
};
