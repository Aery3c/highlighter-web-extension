// @flow
'use strict'
import { addMessageListener } from './interface';
import { request_message, response_message } from '../common/constants';
import type { Runtime } from 'webextension-polyfill';

type Message = {| type: string |};

(function () {
  function handleBackedMsg (message: Message, sender: Runtime.MessageSender, sendResponse: () => void): void {
    if (message.type === request_message.checkTab) {
      sendResponse(response_message.tabAvailable);
    }
  }

  addMessageListener(handleBackedMsg);
})();