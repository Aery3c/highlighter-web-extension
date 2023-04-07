import * as React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider as Provider } from 'styled-components';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../store/store';
import { theme } from '../theme';

const connector = connect((state: RootState) => ({ config: state.config }));

type PropsFromRedux = ConnectedProps<typeof connector>;

const ThemeProvider: React.FC<React.PropsWithChildren<PropsFromRedux>> = ({ children, config }) => {

	const { themeType, primaryColor } = config;
	return (
		<Provider theme={theme?.[themeType]?.[primaryColor]}>
			{children}
		</Provider>
	)
}

export default connector(ThemeProvider);