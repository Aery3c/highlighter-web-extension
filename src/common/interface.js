// @flow
'use strict'

import browser from 'webextension-polyfill';
import type { Tabs, Scripting } from 'webextension-polyfill';
export function checkTabInjection (tab: Tabs.Tab, message: Object): Promise<any> {
  return sendMessageToTab(tab.id, message);
}
export function sendMessageToTab (tabId: number, message: Object, options?: Tabs.SendMessageOptionsType): Promise<any> {
  return browser.tabs.sendMessage(tabId, message, options);
}
export function injectTab (tab: Tabs.Tab, files: string[]): Promise<Scripting.InjectionResult> {
  return browser.scripting.executeScript({
    target: { tabId: tab.id },
    files
  });
}
export function addMessageListener (handleMessage: Function): void {
  browser.runtime.onMessage.addListener(handleMessage)
}