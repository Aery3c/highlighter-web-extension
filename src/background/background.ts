import * as browser from 'webextension-polyfill';

browser.action.onClicked.addListener(tab => {
  console.log(tab);
});
