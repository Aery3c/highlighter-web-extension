
import type { ThemeColor } from './theme';
import * as rangy from 'rangy';
import { theme } from './theme';

/**
 *
 * @param className
 * @example createClassApplier('highlighter-gold-dark')
 */
export function createClassApplier (className: string): RangyClassApplier {
	const [_, primaryColor, themeColor] = className.split('-');
	console.log(theme[themeColor][primaryColor].colorPrimary);
	return rangy.createClassApplier(className, {
		normalize: false,
		elementProperties: {
			// @ts-ignore
			style: {
				backgroundColor: theme[themeColor][primaryColor].colorPrimary,
				color: theme[themeColor][primaryColor].colorText,
				cursor: 'pointer'
			}
		}
	});
}

export function getSysTheme (): ThemeColor {
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}