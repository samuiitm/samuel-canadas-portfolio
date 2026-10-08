import { useEffect, useState } from 'react';
import { saveTheme, type Theme } from '../lib/theme';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
	}, []);

	function toggleTheme() {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		saveTheme(nextTheme);
		setTheme(nextTheme);
	}

	return (
		<button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}>
			<span aria-hidden="true">{theme === 'light' ? 'Light' : 'Dark'}</span>
			<span className="theme-toggle__mark" aria-hidden="true" />
		</button>
	);
}
