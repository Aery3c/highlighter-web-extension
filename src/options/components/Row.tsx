import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex; 
	padding: 20px 0;
`

const Key = styled.div`
	font-weight: 500;
	flex: 1;
`;

const Value = styled.div`
  display: flex;
	flex: 2;
`

export const Row: React.FC<React.PropsWithChildren> = ({ children }) => (
	<Container>
		{React.Children.map(children, (child, index) => {
			return index === 0 ? <Key>{child}</Key> : <Value>{child}</Value>
		})}
	</Container>
)