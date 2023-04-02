import * as browser from 'webextension-polyfill';

export function getExtensionInfo (): Promise<browser.Management.ExtensionInfo> {
  return browser.management.getSelf();
}