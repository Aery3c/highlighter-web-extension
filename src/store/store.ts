import { configureStore } from '@reduxjs/toolkit';
import { wrapStore } from 'webext-redux';
import { devToolsEnhancer } from '@redux-devtools/remote';
import { configReducer } from './reducers/config';
import { tabsReducer } from './reducers/tabs';
import { PROXY_STORE_PORT_NAME } from '../common/constants';

let storeType;
export function initializeStore () {
  const store = configureStore({
    reducer: {
      config: configReducer,
      tabs: tabsReducer
    },
    devTools: false,
    enhancers: [devToolsEnhancer({
      name: PROXY_STORE_PORT_NAME ,
      realtime: true,
      port: 8000,
      suppressConnectErrors: false
    })]
  });

  wrapStore(store, { portName: PROXY_STORE_PORT_NAME });

  storeType = store;

  return store;
}

export type RootState = ReturnType<typeof storeType.getState>;
