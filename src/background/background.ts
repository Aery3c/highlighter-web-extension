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
    case 'updateToolBarIcon': {
      updateToolbarIcon(sender.tab.id, request.active);
    }
  }

});


function updateToolbarIcon (tabId: number, active: boolean): void {
  active
    ? setToolbarIcon(tabId, 'extension_toolbar_active_icon')
    : setToolbarIcon(tabId, 'extension_toolbar_icon')
}

function setToolbarIcon(tabId: number, iconName: string): void {
  const smallIconPath = `./images/${iconName}16.png`
  const bigIconPath = `./images/${iconName}32.png`
  browser.action.setIcon({
    tabId: tabId,
    path: {
      '19': smallIconPath,
      '38': bigIconPath
    }
  })
}