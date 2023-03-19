// @flow

'use strict'
import browser from 'webextension-polyfill';

export function addMessageListener (handleMessage): void {
  console.log('注册时间');
  browser.runtime.onMessage.addListener(handleMessage)
}