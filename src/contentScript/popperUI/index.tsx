import * as React from 'react';
import * as browser from 'webextension-polyfill';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { PROXY_STORE_PORT_NAME } from '../../common/constants';
import TabIdProvider from '../../common/components/TabIdProvider';
import { HighlighterProvider } from '../../common/components/HighlighterProvider';
import ThemeProvider from '../../common/components/ThemeProvider';
import PopperUI from './PopperUI';
import type {} from '../../styled';

interface Message {
  action: string;
  [key: string]: any;
}

function sendMessageToBackground<T> (message: Message): Promise<T> {
  return new Promise(resolve => {
    browser.runtime.sendMessage(message).then((response: T) => {
      resolve(response);
    });
  });
}

window.onload = async function () {
  if (document.body) {
    const info = await sendMessageToBackground<browser.Management.ExtensionInfo>({ action: 'getExtensionInfo' });
    const tabId = await sendMessageToBackground<number>({ action: 'getTabId' });

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
          <ThemeProvider>
            <HighlighterProvider>
              <PopperUI onMount={() => {
                console.log('%c [PopperUI]: Mounted !!!', `color: pink; font-weight: bold;`);
                sendMessageToBackground<void>({ action: 'updateToolBarIcon', active: true })
              }}/>
            </HighlighterProvider>
          </ThemeProvider>
        </TabIdProvider>
      </Provider>
    );
  } else {
    console.error('[PopperUI error]: not found body element');
  }
}
