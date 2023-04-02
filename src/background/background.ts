import * as browser from 'webextension-polyfill';
import { initializeStore } from  '../store/store';

initializeStore();
browser.runtime.onMessage.addListener(async function (request) {
  if (request.action === 'getExtensionInfo') {
    return await browser.management.getSelf();
  }
});


