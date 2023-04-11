/**
 * @see https://styled-components.com/docs/api#create-a-declarations-file
 */

// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme {
		colorBgContainer: string;
		colorText: string;
		colorBorder: string;
		colorBgSpotlight: string;
		tooltipBg: string;
		tooltipColor: string;
		colorPrimaryBg: string;
		colorPrimaryBgHover: string;
		colorPrimaryBorder: string;
		colorPrimaryBorderHover: string;
		colorPrimaryHover: string;
		colorPrimary: string;
		colorPrimaryActive: string;
		colorPrimaryTextHover: string;
		colorPrimaryText: string;
		colorPrimaryTextActive: string;
		className: string;
	}
}