// @flow
'use strict'

import browser from 'webextension-polyfill';
import { checkTabInjection, injectTab } from './utils';
import { request_message } from '../common/constants';

browser.action.onClicked.addListener(tab => {
  checkTabInjection(tab, { type: request_message.checkTab })
    .then(response => {
      console.log(response)
    })
    // eslint-disable-next-line no-unused-vars
    .catch(_ => {
      injectTab(tab, ['../contentScript/main.js'])
        .then(response => {
          console.log(response, 'injectTab success')
        })
        .catch(err => {
          console.log(err, 'injectTab')
        })
    });
});



