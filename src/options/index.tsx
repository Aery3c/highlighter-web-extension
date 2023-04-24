import * as React from 'react';
import { createRoot } from 'react-dom/client';
import * as browser from 'webextension-polyfill';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { PROXY_STORE_PORT_NAME } from '../common/constants';
import ThemeProvider from '../common/components/ThemeProvider';
import 'normalize.css';

import Options from './Options';

document.addEventListener('DOMContentLoaded', async function () {

	// const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	//
	// const storage = await browser.storage.sync.get({
	// 	themeType: systemTheme,
	// 	primaryColor: APP_DEFAULT.primaryColor
	// });
	// window.matchMedia('(prefers-color-scheme: light)').matches

	const info: browser.Management.ExtensionInfo = await browser.runtime.sendMessage({ action: 'getExtensionInfo' });

	const proxyStore= new Store({
		portName: PROXY_STORE_PORT_NAME,
		extensionId: info.id
	});

	await proxyStore.ready();

	const root = createRoot(document.getElementById('highlighter-web-extension-anchor'));
	root.render(
		<Provider store={proxyStore}>
			<ThemeProvider>
				<Options />
			</ThemeProvider>
		</Provider>
	);
});
