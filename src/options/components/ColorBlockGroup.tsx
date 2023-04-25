import * as React from 'react';
import { theme } from '../../common/theme';
import { getSysTheme } from '../../common/helpers';
import { useTheme } from 'styled-components';
import type { ThemeColor, PrimaryColor } from '../../common/theme';

const ColorBlockGroup: React.FC<{ themeColor: ThemeColor; onChange?: (primaryColor: PrimaryColor) => void; }> = ({ themeColor, onChange }) => {

	const sysTheme = React.useMemo(getSysTheme, []);
	const primaryColorMap = theme[themeColor || sysTheme];

	const t = useTheme();

	return (
		<div css={`
			display: flex;
			align-items: center;
			& > div {
				margin: 8px 16px 8px 0;
			}
		`}>
			{Object.keys(primaryColorMap).map((primaryColor: PrimaryColor) => (
				<div
					key={primaryColor}
					css={`
	          background: ${primaryColorMap[primaryColor].colorPrimary};
	          height: 22px;
	          width: 22px;
	          cursor: pointer;
	          outline: none;
	          border-radius: 4px;
						${
							t.colorPrimary === primaryColorMap[primaryColor].colorPrimary 
							&& `box-shadow: ${t.colorPrimary} 0 0 8px`
						}
					`}
					onClick={() => onChange?.(primaryColor)}
				/>
			))}
		</div>
	)
}

export default ColorBlockGroup;