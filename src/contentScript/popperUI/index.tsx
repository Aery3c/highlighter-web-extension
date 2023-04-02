import * as React from 'react';
import * as browser from 'webextension-polyfill';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { PROXY_STORE_PORT_NAME } from '../../common/constants';
import PopperUI from './PopperUI';

window.onload = async function () {
  if (document.body) {
    const info: browser.Management.ExtensionInfo = await browser.runtime.sendMessage({ action: 'getExtensionInfo' });
    const proxyStore = new Store({
      portName: PROXY_STORE_PORT_NAME,
      extensionId: info.id
    });

    await proxyStore.ready();

    const el = document.createElement('div');
    const container = document.body.appendChild(el);
    const root = createRoot(container);

    root.render(
      <Provider store={proxyStore}>
        <PopperUI />
      </Provider>
    );

    console.log('[PopperUI]: loaded !!!')
  } else {
    console.error('[PopperUI error]: not found body element');
  }
}
