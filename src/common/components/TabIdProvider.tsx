import * as React from 'react';

const TabIdContext = React.createContext<number>(null);

export function useTabId () {
  return React.useContext(TabIdContext);
}

const TabIdProvider: React.FC<React.PropsWithChildren<{ tabId: number }>> = ({ tabId, children }) => {
  return <TabIdContext.Provider value={tabId}>{children}</TabIdContext.Provider>
}

export default TabIdProvider;