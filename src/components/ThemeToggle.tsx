import { useEffect, useState } from 'react';
import { saveTheme, type Theme } from '../lib/theme';
import type { Locale } from '../lib/i18n';

export default function ThemeToggle({ locale = 'es' }: { locale?: Locale }) {
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
		<button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={locale === 'en' ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : `Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}>
			<span aria-hidden="true">{theme === 'light' ? 'Light' : 'Dark'}</span>
			<span className="theme-toggle__mark" aria-hidden="true" />
		</button>
	);
}
