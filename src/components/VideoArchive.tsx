import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import { videos, type VideoCategory, type VideoItem } from '../data/videos';

type ArchiveCategory = 'Destacados' | VideoCategory;

const categories: ArchiveCategory[] = ['Destacados', 'NFL', 'Personal', 'Otros'];
const dateFormatter = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

function formatDate(date: string) {
	return dateFormatter.format(new Date(`${date}T12:00:00`)).replace('.', '');
}

function thumbnailUrl(video: VideoItem) {
	return video.thumbnail ?? `https://image.mux.com/${video.playbackId}/thumbnail.webp?width=560&time=${video.thumbnailTime ?? 0}`;
}

function playerUrl(video: VideoItem) {
	const title = encodeURIComponent(video.title);
	return `https://player.mux.com/${video.playbackId}?metadata-video-title=${title}&accent-color=%23b79adb&volume=0.5&no-volume-pref=true`;
}

export default function VideoArchive() {
	const [activeCategory, setActiveCategory] = useState<ArchiveCategory>('Destacados');
	const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
	const [playerMounted, setPlayerMounted] = useState(false);
	const [playerReady, setPlayerReady] = useState(false);
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const isOpen = activeVideo !== null;

	const counts = useMemo(() => ({
		Destacados: videos.filter((video) => video.featured).length,
		NFL: videos.filter((video) => video.category === 'NFL').length,
		Personal: videos.filter((video) => video.category === 'Personal').length,
		Otros: videos.filter((video) => video.category === 'Otros').length,
	}), []);

	const filteredVideos = useMemo(
		() => activeCategory === 'Destacados'
			? videos.filter((video) => video.featured)
			: videos.filter((video) => video.category === activeCategory),
		[activeCategory],
	);

	const activeIndex = activeVideo ? filteredVideos.findIndex((video) => video.id === activeVideo.id) : -1;

	function selectCategory(category: ArchiveCategory) {
		setActiveCategory(category);
		closeVideo();
	}

	function handleCategoryKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
		if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
		event.preventDefault();
		const lastIndex = categories.length - 1;
		const nextIndex = event.key === 'Home'
			? 0
			: event.key === 'End'
				? lastIndex
				: ['ArrowDown', 'ArrowRight'].includes(event.key)
					? (index + 1) % categories.length
					: (index - 1 + categories.length) % categories.length;
		selectCategory(categories[nextIndex]);
		tabRefs.current[nextIndex]?.focus();
	}

	function activateVideo(video: VideoItem) {
		setPlayerMounted(false);
		setPlayerReady(false);
		setActiveVideo(video);
	}

	function openVideo(video: VideoItem, trigger: HTMLButtonElement) {
		triggerRef.current = trigger;
		activateVideo(video);
	}

	function closeVideo() {
		setPlayerMounted(false);
		setPlayerReady(false);
		setActiveVideo(null);
	}

	function showRelativeVideo(direction: -1 | 1) {
		if (activeIndex < 0 || filteredVideos.length < 2) return;
		const nextIndex = (activeIndex + direction + filteredVideos.length) % filteredVideos.length;
		activateVideo(filteredVideos[nextIndex]);
	}

	useEffect(() => {
		if (!activeVideo) return;
		let secondFrame = 0;
		const firstFrame = requestAnimationFrame(() => {
			secondFrame = requestAnimationFrame(() => setPlayerMounted(true));
		});
		return () => {
			cancelAnimationFrame(firstFrame);
			cancelAnimationFrame(secondFrame);
		};
	}, [activeVideo]);

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		document.dispatchEvent(new CustomEvent('portfolio:scroll-stop'));
		requestAnimationFrame(() => closeButtonRef.current?.focus());

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				closeVideo();
				return;
			}
			if (event.key !== 'Tab' || !dialogRef.current) return;
			const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])'));
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.dispatchEvent(new CustomEvent('portfolio:scroll-start'));
			document.removeEventListener('keydown', handleKeyDown);
			requestAnimationFrame(() => triggerRef.current?.focus());
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		function handleVideoNavigation(event: KeyboardEvent) {
			if (event.key === 'ArrowLeft') showRelativeVideo(-1);
			if (event.key === 'ArrowRight') showRelativeVideo(1);
		}
		document.addEventListener('keydown', handleVideoNavigation);
		return () => document.removeEventListener('keydown', handleVideoNavigation);
	}, [isOpen, activeIndex, filteredVideos]);

	return (
		<section className="archive depth-level-c" id="archivo" aria-labelledby="archive-title">
			<div className="archive__inner container-wide">
				<header className="archive__heading">
					<div>
						<p className="eyebrow">Archivo audiovisual</p>
						<h2 id="archive-title">Archivo.</h2>
					</div>
					<p>Una selección de piezas grabadas, editadas y publicadas entre proyectos, eventos y experiencias personales.</p>
				</header>

				<div className="archive-app">
					<div className="archive-app__workspace">
						<aside className="archive-app__sidebar" aria-label="Categorías del archivo">
							<p>Colecciones</p>
							<div className="archive-app__tabs" role="tablist" aria-label="Filtrar vídeos">
								{categories.map((category, index) => (
									<button
										key={category}
										ref={(element) => { tabRefs.current[index] = element; }}
										type="button"
										role="tab"
										id={`archive-tab-${category.toLowerCase()}`}
										aria-controls="archive-panel"
										aria-selected={activeCategory === category}
										tabIndex={activeCategory === category ? 0 : -1}
										className={activeCategory === category ? 'is-active' : ''}
										onClick={() => selectCategory(category)}
										onKeyDown={(event) => handleCategoryKeyDown(event, index)}
									>
										<span className="archive-app__folder" aria-hidden="true"></span>
										<span>{category}</span>
										<small>{counts[category]}</small>
									</button>
								))}
							</div>
							<p className="archive-app__total">{videos.length} vídeos en el archivo</p>
						</aside>

						<div className="archive-app__panel" id="archive-panel" role="tabpanel" aria-labelledby={`archive-tab-${activeCategory.toLowerCase()}`}>
							<header className="archive-app__panel-heading">
								<div><span>Biblioteca</span><h3>{activeCategory}</h3></div>
								<p>{filteredVideos.length} {filteredVideos.length === 1 ? 'elemento' : 'elementos'}</p>
							</header>

							<div className="archive-grid">
								{filteredVideos.map((video) => (
									<article className="archive-card" key={video.id}>
										<button type="button" onClick={(event: ReactMouseEvent<HTMLButtonElement>) => openVideo(video, event.currentTarget)} aria-label={`Reproducir ${video.title}`}>
											<span className="archive-card__poster">
												<img src={thumbnailUrl(video)} alt="" width="560" height="996" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.hidden = true; }} />
												<span className="archive-card__play" aria-hidden="true">
													<span className="archive-card__play-button">
														<span className="archive-card__play-icon"></span>
													</span>
												</span>
												{video.featured && <span className="archive-card__featured">Destacado</span>}
												<span className="archive-card__duration">{video.duration ?? 'Vídeo'}</span>
											</span>
											<span className="archive-card__content">
												<strong>{video.title}</strong>
												<span><time dateTime={video.date}>{formatDate(video.date)}</time><i aria-hidden="true"></i>{video.category}</span>
											</span>
										</button>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{activeVideo && (
				<div className="archive-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeVideo()}>
					<div className="archive-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="archive-modal-title">
						<button className="archive-modal__close" ref={closeButtonRef} type="button" onClick={closeVideo} aria-label={`Cerrar ${activeVideo.title}`}>×</button>
						<div className="archive-modal__content">
							<div className={`archive-modal__player${playerReady ? ' is-ready' : ''}`}>
								<img className="archive-modal__poster" src={thumbnailUrl(activeVideo)} alt="" width="560" height="996" />
								<span className="archive-modal__loading" aria-live="polite">Preparando vídeo…</span>
								{playerMounted && <iframe key={activeVideo.id} src={playerUrl(activeVideo)} title={`Reproductor de ${activeVideo.title}`} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="eager" onLoad={() => setPlayerReady(true)}></iframe>}
							</div>
							<div className="archive-modal__details">
								<p className="eyebrow">{activeVideo.category}</p>
								<h3 id="archive-modal-title">{activeVideo.title}</h3>
								<div className="archive-modal__metadata"><time dateTime={activeVideo.date}>{formatDate(activeVideo.date)}</time><span>{activeVideo.duration ?? 'Vídeo vertical'}</span></div>
								{activeVideo.originalUrl && <a href={activeVideo.originalUrl} target="_blank" rel="noopener noreferrer">Ver publicación original <span aria-hidden="true">↗</span></a>}
								{filteredVideos.length > 1 && (
									<nav className="archive-modal__navigation" aria-label="Navegación entre vídeos">
										<button type="button" onClick={() => showRelativeVideo(-1)} aria-label="Vídeo anterior">← <span>Anterior</span></button>
										<span>{activeIndex + 1} / {filteredVideos.length}</span>
										<button type="button" onClick={() => showRelativeVideo(1)} aria-label="Vídeo siguiente"><span>Siguiente</span> →</button>
									</nav>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
