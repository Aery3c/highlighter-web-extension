import * as browser from 'webextension-polyfill';
import { initializeStore } from '../store/store';

initializeStore();

browser.action.onClicked.addListener(tab => {
  console.log(tab);
});
