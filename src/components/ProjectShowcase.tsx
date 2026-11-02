import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { homeContent } from '../data/content';
import { getProjects, type PortfolioProject } from '../data/projects';
import { getProjectPath, type Locale } from '../lib/i18n';

export default function ProjectShowcase({ locale = 'es' }: { locale?: Locale }) {
	const copy = homeContent[locale].work;
	const projects = useMemo(() => getProjects(locale), [locale]);
	const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const modalScrollRef = useRef<HTMLDivElement>(null);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLAnchorElement | null>(null);

	function openProject(project: PortfolioProject, trigger: HTMLAnchorElement) {
		triggerRef.current = trigger;
		setActiveProject(project);
	}

	function handleProjectClick(event: React.MouseEvent<HTMLAnchorElement>, project: PortfolioProject) {
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
		return () => cleanups.forEach((cleanup) => cleanup());
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
		<section className="work section-shell" id="work" aria-labelledby="work-title" ref={sectionRef} data-language-section="work">
			<header className="work__heading section-heading section-heading--split">
				<div><p className="eyebrow">{copy.eyebrow}</p><h2 id="work-title">{copy.title[0]}<br />{copy.title[1]}</h2></div>
				<p>{copy.intro}</p>
			</header>

			<div className="work__projects">
				{[...projects].sort((a, b) => a.index.localeCompare(b.index)).map((project) => {
					const projectHref = getProjectPath(project.slug, locale);
					return (
						<article className={`project project--${project.id}`} key={project.id} data-project>
							<a className="project__media" data-project-media href={projectHref} onClick={(event) => handleProjectClick(event, project)} aria-label={`${copy.viewProject} ${project.name}`}>
								<img className="project__cover" src={project.cover} alt="" width={project.coverWidth} height={project.coverHeight} loading="lazy" decoding="async" />
								<span className="project__veil" aria-hidden="true"></span>
								<img className="project__logo" src={project.logo} alt="" width={project.logoWidth} height={project.logoHeight} loading="lazy" decoding="async" />
								<span className="project__pulse">{project.pulse}</span>
								<span className="project__media-index" aria-hidden="true">{project.index}</span>
							</a>
							<div className="project__meta">
								<div><h3>{project.name}</h3><p>{project.descriptor}</p></div>
								<a className="project__link" href={projectHref} onClick={(event) => handleProjectClick(event, project)}>{copy.viewProject} <span aria-hidden="true">↗</span></a>
							</div>
						</article>
					);
				})}
			</div>

			{activeProject && (
				<div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeProject()}>
					<div className={`project-modal project-modal--${activeProject.id}`} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
						<header className="project-modal__header">
							<div><span>{activeProject.areas}</span><strong>{activeProject.year}</strong></div>
							<button ref={closeButtonRef} type="button" onClick={closeProject} aria-label={`${copy.close} ${activeProject.name}`}><span aria-hidden="true">×</span></button>
						</header>
						<div className="project-modal__body" ref={modalScrollRef}>
							<div className="project-modal__scroll-content" ref={modalContentRef}>
								<div className="project-modal__intro"><p className="eyebrow">{activeProject.pulse}</p><h2 id="project-modal-title">{activeProject.name}</h2><p>{activeProject.descriptor}</p></div>
								<div className="project-modal__hero">
									<img src={activeProject.cover} alt={activeProject.coverAlt} width={activeProject.coverWidth} height={activeProject.coverHeight} loading="eager" decoding="async" />
									<img className="project-modal__logo" src={activeProject.logo} alt={`${copy.logo} ${activeProject.name}`} width={activeProject.logoWidth} height={activeProject.logoHeight} />
								</div>
								<div className="project-modal__chapters" aria-label={`${copy.caseStudyOf} ${activeProject.name}`}>
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
															{activeProject.id === 'nova-unio' && index === 3 && <a href="https://novaunio.cat" target="_blank" rel="noopener noreferrer">{activeProject.officialLabel} <i aria-hidden="true">↗</i></a>}
														</div>
														{chapter.image && <div className="project-modal__chapter-image"><img src={chapter.image} alt={chapter.modalAlt ?? chapter.alt} width={chapter.imageWidth} height={chapter.imageHeight} loading="lazy" decoding="async" /></div>}
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
