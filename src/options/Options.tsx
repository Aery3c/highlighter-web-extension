import * as React from 'react';
import styled from 'styled-components';
import Radio from '../common/components/Radio';

// @ts-ignore
const logo = new URL('../assets/images/extension_active_icon128.png', import.meta.url);

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  padding: 100px 20px;
  font-size: 16px;
`;

const Key = styled.div`
	font-weight: 500;
	flex: 1;
`;

const Value = styled.div`
  display: flex;
	flex: 2;
`

const Options: React.FC = () => {
	return (
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

			<div css={` display: flex; align-items: center; padding: 20px 0; `}>
				<Key>
					Theme
				</Key>

				<Value>
					<Radio name="theme" defaultChecked={true}>light</Radio>
					<Radio name="theme" defaultChecked={false}>dark</Radio>
					<Radio name="theme" defaultChecked={false}>auto</Radio>
				</Value>
			</div>

		</Container>
	)
}

export default Options;