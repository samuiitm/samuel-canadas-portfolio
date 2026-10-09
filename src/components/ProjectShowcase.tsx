import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

type Chapter = { title: string; copy: string; image?: string; alt?: string; imageWidth?: number; imageHeight?: number };

type Project = {
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
	chapters: Chapter[];
};

const projects: Project[] = [
	{
		id: 'nfl', slug: 'nova-fight-legacy', index: '02', name: 'Nova Fight Legacy',
		descriptor: 'Marketing digital, identidad y comunicación', pulse: 'Pulso creativo',
		areas: 'Marketing Digital · Identidad · Vídeo', year: '2026',
		cover: '/images/projects/nfl/cover.webp', coverAlt: 'Equipo y luchadores de Nova Fight Legacy durante un evento', coverWidth: 1400, coverHeight: 933, logo: '/images/projects/nfl/logo.svg', logoWidth: 1500, logoHeight: 1500,
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
		cover: '/images/projects/nova-unio/cover.webp', coverAlt: 'Dos deportistas de Nova Unió junto a la jaula de entrenamiento', coverWidth: 720, coverHeight: 960, logo: '/images/projects/nova-unio/logo.svg', logoWidth: 596, logoHeight: 842,
		chapters: [
			{ title: 'Contexto', copy: 'Nova Unió empezó como mi proyecto final de Desarrollo de Aplicaciones Web. La idea inicial era crear una nueva web para el club, pero poco a poco el proyecto fue creciendo hasta incluir también una aplicación interna para gestionar buena parte del día a día.', image: '/images/projects/nova-unio/public-home.webp', alt: 'Página de inicio pública de Nova Unió', imageWidth: 1425, imageHeight: 676 },
			{ title: 'Mi papel', copy: 'He llevado el proyecto prácticamente de principio a fin: diseño, desarrollo, base de datos, panel de gestión, dominio, hosting y despliegue. Además, al conocer el club desde dentro podía ir adaptando la web y la aplicación a problemas y necesidades reales.', image: '/images/projects/nova-unio/admin-dashboard-safe.webp', alt: 'Dashboard del panel privado de gestión de Nova Unió', imageWidth: 1600, imageHeight: 907 },
			{ title: 'Proceso', copy: 'Primero desarrollé la parte pública con la información del club, horarios, planes, entrenadores y contacto. Después fui construyendo el panel privado con socios, clases, asistencias, cuotas, pagos y seguros. A partir de ahí he seguido mejorándolo a medida que aparecen nuevas necesidades y preparando una nueva versión con reservas y acceso mediante QR.', image: '/images/projects/nova-unio/public-story.webp', alt: 'Sección pública sobre la historia de Nova Unió', imageWidth: 1378, imageHeight: 709 },
			{ title: 'Resultado', copy: 'Lo que empezó como un proyecto de clase terminó convirtiéndose en una plataforma real para el club. La web está publicada en novaunio.cat y el proyecto ha seguido creciendo incluso después de terminar los estudios.', image: '/images/projects/nova-unio/public-disciplines.webp', alt: 'Sección pública de disciplinas de Nova Unió', imageWidth: 1407, imageHeight: 774 },
		],
	},
];

export default function ProjectShowcase() {
	const [activeProject, setActiveProject] = useState<Project | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const modalScrollRef = useRef<HTMLDivElement>(null);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLAnchorElement | null>(null);

	function openProject(project: Project, trigger: HTMLAnchorElement) {
		triggerRef.current = trigger;
		setActiveProject(project);
	}

	function handleProjectClick(event: React.MouseEvent<HTMLAnchorElement>, project: Project) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		event.currentTarget.style.setProperty('--pointer-x', '0');
		event.currentTarget.style.setProperty('--pointer-y', '0');
		openProject(project, event.currentTarget);
	}

	function closeProject() {
		setActiveProject(null);
	}

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		const items = Array.from(section.querySelectorAll<HTMLElement>('[data-project]'));
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) {
			items.forEach((item) => item.classList.add('is-visible'));
			return;
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				(entry.target as HTMLElement).classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		}, { threshold: 0.18 });

		items.forEach((item) => observer.observe(item));
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		const mediaItems = Array.from(section.querySelectorAll<HTMLElement>('[data-project-media]'));
		const cleanups = mediaItems.map((media) => {
			let frame = 0;
			let x = 0;
			let y = 0;
			const paint = () => {
				frame = 0;
				media.style.setProperty('--pointer-x', x.toFixed(3));
				media.style.setProperty('--pointer-y', y.toFixed(3));
			};
			const move = (event: PointerEvent) => {
				if (!finePointer.matches) return;
				const rect = media.getBoundingClientRect();
				x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
				y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
				if (!frame) frame = requestAnimationFrame(paint);
			};
			const reset = () => {
				x = 0;
				y = 0;
				if (!frame) frame = requestAnimationFrame(paint);
			};
			const handlePointerCapability = () => {
				if (!finePointer.matches) reset();
			};
			media.style.setProperty('--pointer-x', '0');
			media.style.setProperty('--pointer-y', '0');
			media.addEventListener('pointermove', move, { passive: true });
			media.addEventListener('pointerleave', reset);
			media.addEventListener('pointercancel', reset);
			finePointer.addEventListener('change', handlePointerCapability);
			return () => {
				media.removeEventListener('pointermove', move);
				media.removeEventListener('pointerleave', reset);
				media.removeEventListener('pointercancel', reset);
				finePointer.removeEventListener('change', handlePointerCapability);
				cancelAnimationFrame(frame);
				media.style.setProperty('--pointer-x', '0');
				media.style.setProperty('--pointer-y', '0');
			};
		});
		return () => {
			cleanups.forEach((cleanup) => cleanup());
		};
	}, []);

	useEffect(() => {
		if (!activeProject) return;
		const previousOverflow = document.body.style.overflow;
		document.dispatchEvent(new CustomEvent('portfolio:scroll-stop'));
		document.body.style.overflow = 'hidden';
		closeButtonRef.current?.focus();

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				closeProject();
				return;
			}
			if (event.key !== 'Tab' || !dialogRef.current) return;
			const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault(); last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault(); first.focus();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.dispatchEvent(new CustomEvent('portfolio:scroll-start'));
			document.removeEventListener('keydown', handleKeyDown);
			requestAnimationFrame(() => triggerRef.current?.focus());
		};
	}, [activeProject]);

	useEffect(() => {
		if (!activeProject || !modalScrollRef.current || !modalContentRef.current) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (!window.matchMedia('(pointer: fine)').matches) return;

		const modalLenis = new Lenis({
			wrapper: modalScrollRef.current,
			content: modalContentRef.current,
			autoRaf: true,
			lerp: 0.14,
			wheelMultiplier: 0.9,
			smoothWheel: true,
			syncTouch: false,
			overscroll: false,
			respectReducedMotion: true,
		});

		return () => modalLenis.destroy();
	}, [activeProject]);

	return (
		<section className="work section-shell" id="work" aria-labelledby="work-title" ref={sectionRef}>
			<header className="work__heading section-heading section-heading--split">
				<div><p className="eyebrow">02 — Selected Work</p><h2 id="work-title">Dos proyectos.<br />Un mismo perfil.</h2></div>
				<p>Nova Unió y NFL son probablemente los dos proyectos que mejor representan lo que sé hacer ahora mismo.</p>
			</header>

			<div className="work__projects">
				{[...projects].sort((a, b) => a.index.localeCompare(b.index)).map((project) => (
					<article className={`project project--${project.id}`} key={project.id} data-project>
						<a className="project__media" data-project-media href={`/proyectos/${project.slug}/`} onClick={(event) => handleProjectClick(event, project)} aria-label={`Ver proyecto ${project.name}`}>
							<img className="project__cover" src={project.cover} alt="" width={project.coverWidth} height={project.coverHeight} loading="lazy" decoding="async" />
							<span className="project__veil" aria-hidden="true"></span>
							<img className="project__logo" src={project.logo} alt="" width={project.logoWidth} height={project.logoHeight} loading="lazy" decoding="async" />
							<span className="project__pulse">{project.pulse}</span>
							<span className="project__media-index" aria-hidden="true">{project.index}</span>
						</a>
						<div className="project__meta">
							<div><h3>{project.name}</h3><p>{project.descriptor}</p></div>
							<a className="project__link" href={`/proyectos/${project.slug}/`} onClick={(event) => handleProjectClick(event, project)}>Ver proyecto <span aria-hidden="true">↗</span></a>
						</div>
					</article>
				))}
			</div>

			{activeProject && (
				<div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeProject()}>
					<div className={`project-modal project-modal--${activeProject.id}`} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
						<header className="project-modal__header">
							<div><span>{activeProject.areas}</span><strong>{activeProject.year}</strong></div>
							<button ref={closeButtonRef} type="button" onClick={closeProject} aria-label={`Cerrar ${activeProject.name}`}><span aria-hidden="true">×</span></button>
						</header>
						<div className="project-modal__body" ref={modalScrollRef}>
							<div className="project-modal__scroll-content" ref={modalContentRef}>
							<div className="project-modal__intro"><p className="eyebrow">{activeProject.pulse}</p><h2 id="project-modal-title">{activeProject.name}</h2><p>{activeProject.descriptor}</p></div>
							<div className="project-modal__hero">
								<img src={activeProject.cover} alt={activeProject.coverAlt} width={activeProject.coverWidth} height={activeProject.coverHeight} loading="eager" decoding="async" />
								<img className="project-modal__logo" src={activeProject.logo} alt={`Logo de ${activeProject.name}`} width={activeProject.logoWidth} height={activeProject.logoHeight} />
							</div>
							<div className="project-modal__chapters" aria-label={`Case study de ${activeProject.name}`}>
								{[activeProject.chapters.slice(0, 2), activeProject.chapters.slice(2, 4)].map((row, rowIndex) => (
									<div className="project-modal__chapter-row" key={`row-${rowIndex}`}>
										{row.map((chapter, columnIndex) => {
											const index = rowIndex * 2 + columnIndex;
											return (
												<section key={chapter.title}>
													<span>0{index + 1}</span>
													<h3>{chapter.title}</h3>
													<div className="project-modal__chapter-text">
														<p>{chapter.copy}</p>
														{activeProject.id === 'nova-unio' && index === 3 && <a href="https://novaunio.cat" target="_blank" rel="noopener noreferrer">Visitar novaunio.cat <i aria-hidden="true">↗</i></a>}
													</div>
											{chapter.image && <div className="project-modal__chapter-image"><img src={chapter.image} alt={chapter.alt} width={chapter.imageWidth} height={chapter.imageHeight} loading="lazy" decoding="async" /></div>}
												</section>
											);
										})}
									</div>
								))}
							</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
