// @flow
'use strict'

import browser from 'webextension-polyfill';
import { checkTabInjection, injectTab } from '../common/interface';
import { request_message, response_message } from '../common/constants';
browser.action.onClicked.addListener(tab => {
  checkTabInjection(tab, { type: request_message.checkTab })
    .then(response => {
      if (response === response_message.tabAvailable) {

      }
    })
    .catch(error => {
      console.log(error, error);
      injectTab(tab, ['./contentScript/app.js'])
        .catch(err => console.error(err))
    });
});


