import * as React from 'react';
import * as browser from 'webextension-polyfill';
import * as localforage from 'localforage';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { Highlighter } from 'highlighter';
import { PROXY_STORE_PORT_NAME } from '../../common/constants';
import TabIdProvider from '../../common/components/TabIdProvider';
import { HighlighterProvider } from '../../common/components/HighlighterProvider';
import { LocalforageProvider } from '../../common/components/LocalforageProvider';
import ThemeProvider from '../../common/components/ThemeProvider';
import { updateMark } from '../../store/actions';
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

    const highlighter = new Highlighter({ normalize: false });

    const el = document.createElement('div');
    const container = document.body.appendChild(el);
    const root = createRoot(container);

    localforage.config({
      name: 'highlighter-web-extension-marks',
      storeName: `highlighter-web-extension-marks${new URL(window.location.href).pathname}`
    })

    await localforage.ready();

    const len = await localforage.length(), data = [];
    if (len) {
      const marks = await localforage.iterate((value, key, iterationNumber) => {
        data.push(value);
        if (iterationNumber === len) {
          return data;
        }
      });

      proxyStore.dispatch(updateMark({ tabId, marks }));
      highlighter.deserialize(marks);
    }

    root.render(
      <Provider store={proxyStore}>
        <TabIdProvider tabId={tabId}>
          <ThemeProvider>
            <LocalforageProvider localforage={localforage}>
              <HighlighterProvider highlighter={highlighter}>
                <PopperUI onMount={() => {
                  console.log('%c [PopperUI]: Mounted !!!', `color: pink; font-weight: bold;`);
                  sendMessageToBackground<void>({ action: 'popperMount' });
                }}/>
              </HighlighterProvider>
            </LocalforageProvider>
          </ThemeProvider>
        </TabIdProvider>
      </Provider>
    );
  } else {
    console.error('[PopperUI error]: not found body element');
  }
}
