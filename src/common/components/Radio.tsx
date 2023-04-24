import * as React from 'react';
import { useTheme } from 'styled-components';


interface RadioProps {
	name?: string;
	value?: any;
	defaultChecked?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}
const Radio: React.FC<React.PropsWithChildren<RadioProps>> = ({ children, name, onChange, defaultChecked, value }) => {

	const theme = useTheme();

	return (
		<label css={`
      display: inline-flex;
      align-items: center;
      cursor: pointer;
			&:hover {
				color: ${theme.colorPrimaryText};
			}
      &:hover > input[type='radio'] {
        border: 1px solid ${theme.colorPrimaryText};
      }
		`}>
			<input type="radio" name={name} value={value} onChange={onChange} defaultChecked={defaultChecked} css={`
        -webkit-appearance: none;
        appearance: none;
        display: grid;
        place-content: center;
        width: 1em;
        height: 1em;
        color: ${theme.colorPrimary};
        border: 1px solid ${theme.colorBorder};
        border-radius: 50%;
        margin: 0;
        font: inherit;
        cursor: pointer;
				&::before {
          content: "";
          width: 1em;
          height: 1em;
					background-color: #ffffff;
          border-radius: 50%;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em #ffffff;
				}
				&:checked {
          background-color: ${theme.colorPrimary};
          border: 1px solid ${theme.colorPrimaryText};
				}
				&:checked::before {
          transform: scale(.4);
				}
			`}/>
			<span css={`
        padding: 0 8px;
			`}>{children}</span>
		</label>
	)
}

export default Radio;