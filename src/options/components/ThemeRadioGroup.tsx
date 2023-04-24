import * as React from 'react';
import Radio from '../../common/components/Radio';
import type { ThemeColor } from '../../common/theme';
const ThemeRadioGroup: React.FC<{ themeColor?: ThemeColor; onChange?: (theme: string | undefined) => void; }> = ({ themeColor, onChange }) => {
	const handleOnChange = (e) => {
		onChange?.(e.target.value === 'auto' ? undefined : e.target.value);
	}

	return (
		<div css={`
			label {
				margin-right: 8px;
			}
		`}>
			<Radio name="select-theme" value="light" defaultChecked={themeColor === 'light'} onChange={handleOnChange}>light</Radio>
			<Radio name="select-theme" value="dark" defaultChecked={themeColor === 'dark'} onChange={handleOnChange}>dark</Radio>
			<Radio name="select-theme" value="auto" defaultChecked={!themeColor} onChange={handleOnChange}>auto</Radio>
		</div>
	)
}

export default ThemeRadioGroup;