import * as React from 'react';
import * as browser from 'webextension-polyfill';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { PROXY_STORE_PORT_NAME } from '../../common/constants';
import TabIdProvider from '../../common/components/TabIdProvider';
import PopperUI from './PopperUI';

window.onload = async function () {
  if (document.body) {
    const info: browser.Management.ExtensionInfo = await browser.runtime.sendMessage({ action: 'getExtensionInfo' });
    const tabId: number = await browser.runtime.sendMessage({ action: 'getTabId' });

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
        <TabIdProvider tabId={tabId}>
          <PopperUI />
        </TabIdProvider>
      </Provider>
    );

    console.log('%c [PopperUI]: loaded !!!', `color: pink; font-weight: bold;`)
  } else {
    console.error('[PopperUI error]: not found body element');
  }
}
