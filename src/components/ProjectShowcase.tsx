import { useEffect, useRef, useState } from 'react';

type Project = {
	id: 'nfl' | 'nova-unio';
	index: string;
	name: string;
	descriptor: string;
	pulse: string;
	areas: string;
	year: string;
	assetLabel: string;
};

const projects: Project[] = [
	{
		id: 'nfl', index: '01', name: 'Nova Fight Legacy',
		descriptor: 'Marketing digital, identidad y comunicación', pulse: 'Pulso creativo',
		areas: 'Marketing Digital · Identidad · Vídeo', year: '2026',
		assetLabel: 'Visual principal real de NFL pendiente',
	},
	{
		id: 'nova-unio', index: '02', name: 'Nova Unió',
		descriptor: 'Desarrollo web y producto digital', pulse: 'Pulso técnico',
		areas: 'Desarrollo Web · Producto Digital', year: '2026',
		assetLabel: 'Captura real de Nova Unió pendiente',
	},
];

export default function ProjectShowcase() {
	const [activeProject, setActiveProject] = useState<Project | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	function openProject(project: Project, trigger: HTMLButtonElement) {
		triggerRef.current = trigger;
		setActiveProject(project);
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

	return (
		<section className="work section-shell" id="work" aria-labelledby="work-title" ref={sectionRef}>
			<header className="work__heading section-heading section-heading--split">
				<div><p className="eyebrow">02 — Selected Work</p><h2 id="work-title">Dos proyectos.<br />Un mismo perfil.</h2></div>
				<p>Dos formas de trabajar que comparten criterio, atención al detalle y una misma manera de construir.</p>
			</header>

			<div className="work__projects">
				{projects.map((project) => (
					<article className={`project project--${project.id}`} key={project.id} data-project>
						<button className="project__media" type="button" onClick={(event) => openProject(project, event.currentTarget)} aria-label={`Ver proyecto ${project.name}`}>
							<span className="project__pulse">{project.pulse}</span>
							<span className="project__asset-status"><small>Asset requerido</small>{project.assetLabel}</span>
							<span className="project__media-index" aria-hidden="true">{project.index}</span>
						</button>
						<div className="project__meta">
							<div><h3>{project.name}</h3><p>{project.descriptor}</p></div>
							<button type="button" onClick={(event) => openProject(project, event.currentTarget)}>Ver proyecto <span aria-hidden="true">↗</span></button>
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
						<div className="project-modal__body" data-lenis-prevent>
							<div className="project-modal__intro"><p className="eyebrow">{activeProject.pulse}</p><h2 id="project-modal-title">{activeProject.name}</h2><p>{activeProject.descriptor}</p></div>
							<div className="project-modal__hero"><span><small>Asset real requerido</small>{activeProject.assetLabel}</span></div>
							<div className="project-modal__chapters" aria-label="Estructura provisional del case study">
								{['Contexto', 'Mi papel', 'Proceso', 'Resultado'].map((chapter, index) => <section key={chapter}><span>0{index + 1}</span><h3>{chapter}</h3><p>Contenido pendiente.</p></section>)}
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
