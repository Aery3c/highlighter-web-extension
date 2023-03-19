// @flow
'use strict'
import browser from "webextension-polyfill";
import { request_message, response_message } from '../common/constants';
import type { Runtime } from 'webextension-polyfill';

type Message = {| type: string |};

(function () {
  function handleBackedMsg (message: Message, sender: Runtime.MessageSender, sendResponse: (message: string) => void): void {
    if (message.type === request_message.checkTab) {
      sendResponse(response_message.tabAvailable);
    }
  }

  browser.runtime.onMessage.addListener(handleBackedMsg);
})();