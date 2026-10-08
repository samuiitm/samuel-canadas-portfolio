export const themes = ['light', 'dark'] as const;

export type Theme = (typeof themes)[number];

const storageKey = 'portfolio-theme';

export function saveTheme(theme: Theme) {
	localStorage.setItem(storageKey, theme);
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme;
}

export function clearSavedTheme() {
	localStorage.removeItem(storageKey);
}
