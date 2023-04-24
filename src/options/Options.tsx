import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ThemeRadioGroup from './components/ThemeRadioGroup';
import { mapDispatchToProps } from '../store/connect';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../store/store';
// @ts-ignore
const logo = new URL('../assets/images/extension_active_icon128.png', import.meta.url);

const Row = styled.div`
  display: flex; 
	align-items: center; 
	padding: 20px 0;
	div:first-child {
    flex: 1;
		font-weight: 500;
	}
	div:last-child {
		flex: 2;
	}
`

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  padding: 100px 20px;
  font-size: 16px;
`;

const connector = connect((state: RootState) => ({ config: state.config }), mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Options: React.FC<PropsFromRedux> = ({ config, toggleTheme }) => {
	return (
		<div css={`
			background-color: ${props => props.theme.colorBgContainer};
			color: ${props => props.theme.colorText};
			min-height: 100vh;
		`}>
			<Container>
				<header css={`
        border-bottom: 1px solid #ededed;
        margin-bottom: 20px;
			`}>
					<h1>
						{/* @ts-ignore */}
						<img src={logo} alt="highlighter" css={`
						width: 24px;
						height: 24px;
						margin-right: 4px;
					`}/>
						Highlighter
					</h1>
				</header>

				<Row>
					<div>Theme</div>
					<ThemeRadioGroup
						themeColor={config.themeColor}
						onChange={toggleTheme}
					/>
				</Row>

			</Container>
		</div>
	)
}

export default connector(Options);