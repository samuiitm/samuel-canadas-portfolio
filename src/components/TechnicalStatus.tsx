import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function TechnicalStatus() {
	const prefersReducedMotion = useReducedMotion();
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
	}, []);

	return (
		<motion.ul
			aria-label="Estado técnico"
			initial={prefersReducedMotion ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<li>Astro: activo</li>
			<li>React: activo</li>
			<li>Motion: activo</li>
			<li>Tema: {theme ?? 'detectando'}</li>
		</motion.ul>
	);
}
