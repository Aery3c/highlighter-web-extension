import * as browser from 'webextension-polyfill';
import { initializeStore } from  '../store/store';

initializeStore();
browser.runtime.onMessage.addListener(async function (request, sender) {
  switch (request.action) {
    case 'getExtensionInfo': {
      return await browser.management.getSelf();
    }
    case 'getTabId': {
      return sender.tab.id;
    }
  }

});


