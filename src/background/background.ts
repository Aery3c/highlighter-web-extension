import * as browser from 'webextension-polyfill';
import { initializeStore } from  '../store/store';
import { addTab, removeTab, setPopperMount, updateTab } from '../store/actions';

const store = initializeStore();

// browser.storage.sync.get().then(data => {
//   console.log(systemTheme);
// });

browser.runtime.onMessage.addListener(async function (request, sender) {
  switch (request.action) {
    case 'getExtensionInfo': {
      return await browser.management.getSelf();
    }
    case 'getTabId': {
      return sender.tab.id;
    }
    case 'popperMount': {
      const tabId = sender.tab.id;
      updateToolbarIcon(tabId, true);
      store.dispatch(setPopperMount({ tabId, isPopperMount: true }));
    }
  }

});

browser.tabs.onRemoved.addListener(function (tabId) {
  store.dispatch(removeTab(tabId));
});

browser.tabs.onCreated.addListener(function (tab) {
  store.dispatch(addTab(tab));
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
browser.tabs.onUpdated.addListener(function (_, _, tab) {
  store.dispatch(updateTab(tab));
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