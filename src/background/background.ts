import * as browser from 'webextension-polyfill';
import { initializeStore } from  '../store/store';
import { toggleTheme } from '../store/actions';

const store = initializeStore();
browser.action.onClicked.addListener(function () {
  store.dispatch(toggleTheme());
});
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


