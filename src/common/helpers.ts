
import type { ThemeColor } from './theme';
export function getSysTheme (): ThemeColor {
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}