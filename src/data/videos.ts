import type { Locale } from '../lib/i18n';

export type VideoCategory = 'NFL' | 'Personal' | 'Otros';

export type VideoItem = {
	id: string;
	title: Record<Locale, string>;
	category: VideoCategory;
	featured: boolean;
	date: string;
	duration?: string;
	playbackId: string;
	originalUrl?: string;
	thumbnail?: string;
	thumbnailTime?: number;
};

export const videos: VideoItem[] = [
	{
		id: 'nfl-01',
		title: { es: 'NFL 1 — Resumen del evento', en: 'NFL 1 — Event recap' },
		category: 'NFL',
		featured: false,
		date: '2026-07-27',
		duration: '0:21',
		playbackId: '59HZi4nNsTkW02oo8S01T1Rf6EUyauHGc01yd00WGIYjT8Y',
		originalUrl: 'https://www.instagram.com/reel/Dan2Ip4o9c0/',
		thumbnailTime: 2,
	},
	{
		id: 'nfl-02',
		title: { es: 'NFL 1 — Venta de entradas', en: 'NFL 1 — Ticket sales' },
		category: 'NFL',
		featured: false,
		date: '2026-05-27',
		duration: '0:21',
		playbackId: 'FCOEAgl01EF1S00hLlZMRSoCFah67SGjOFPYQ7WugXh1E',
		originalUrl: 'https://www.instagram.com/reel/DY1gcNUoeXS/',
		thumbnailTime: 15.6,
	},
	{
		id: 'nfl-03',
		title: { es: 'Entrevista — Renato Junior', en: 'Interview — Renato Junior' },
		category: 'NFL',
		featured: false,
		date: '2026-05-31',
		duration: '0:56',
		playbackId: 'u02NGviPwbq801ZKpyxek7lPJORfn65cmHWi1kVWngoOk',
		originalUrl: 'https://www.instagram.com/reel/DZAzskeoPFV/',
		thumbnailTime: 21,
	},
	{
		id: 'nfl-05',
		title: { es: 'NFL 1 — Promo', en: 'NFL 1 — Promo' },
		category: 'NFL',
		featured: false,
		date: '2026-06-27',
		duration: '0:23',
		playbackId: 'XGd6bZySiA5WU01mrkeAGuYZq9c2SHjDBUZO4dShwgD00',
		originalUrl: 'https://www.instagram.com/reel/DZpbV08oxsM/',
		thumbnailTime: 13,
	},
	{
		id: 'nfl-06',
		title: { es: 'Cara a cara — Combate estelar', en: 'Face-off — Main event' },
		category: 'NFL',
		featured: false,
		date: '2026-06-26',
		duration: '0:19',
		playbackId: 'SRQxMqLJKhbMPZemq02KRottOxC02GF01HTtmTkdMsjeo00',
		originalUrl: 'https://www.instagram.com/reel/DaDzBlbIGpC/',
	},
	{
		id: 'nfl-07',
		title: { es: 'Ayoub Regrag vs. Alan Luna — KO', en: 'Ayoub Regrag vs. Alan Luna — KO' },
		category: 'NFL',
		featured: true,
		date: '2026-06-30',
		duration: '0:11',
		playbackId: 'd0200UdzbNOJCX1Q9zrlpExZByRsc8J02rA00utwdi2Ly0200',
		originalUrl: 'https://www.instagram.com/reel/DaNq5CIKvhw/',
	},
	{
		id: 'nfl-10',
		title: { es: 'Miguel Pineda vs. Pablo Pérez — La remontada', en: 'Miguel Pineda vs. Pablo Pérez — The comeback' },
		category: 'NFL',
		featured: false,
		date: '2026-06-29',
		duration: '0:30',
		playbackId: 'trLoC9sSYI02PGMU1gVTL02cwiaJkPZ01DsKzMZodFncMI',
		originalUrl: 'https://www.instagram.com/reel/DaLng8aIOJL/',
	},
	{
		id: 'personal-01',
		title: { es: 'Erasmus Malta 2026 — Resumen', en: 'Erasmus Malta 2026 — Recap' },
		category: 'Personal',
		featured: true,
		date: '2026-05-23',
		duration: '3:30',
		playbackId: 'CE1ttqgz00Rl02QlKqWAdXi6opRxxwl21rhe2vq3OdpE4',
		originalUrl: 'https://www.youtube.com/watch?v=JBrn5m_dAtY',
	},
	{
		id: 'otros-01',
		title: { es: 'Alejo Luna — AFL 41', en: 'Alejo Luna — AFL 41' },
		category: 'Otros',
		featured: true,
		date: '2026-02-13',
		duration: '1:59',
		playbackId: '7LaYbOg3E00PapcSK1xZ6nzYY9mSc02IGqnpG7Ed00WEss',
		originalUrl: 'https://www.instagram.com/p/DUs2OxGCIeO/',
	},
	{
		id: 'otros-02',
		title: { es: 'Campeonato de Cataluña de Combat Sambo — Mejores momentos', en: 'Catalan Combat Sambo Championship — Highlights' },
		category: 'Otros',
		featured: false,
		date: '2026-02-14',
		duration: '0:56',
		playbackId: 'BJta6vCepE00uHJlT00mXIhvjnnju3MLzC3S34dj82x14',
		originalUrl: 'https://www.instagram.com/p/DUwI62ejP44/',
	},
];
