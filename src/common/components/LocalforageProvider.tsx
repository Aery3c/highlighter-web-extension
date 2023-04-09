import * as React from 'react';

const LocalforageContext = React.createContext(null);

export function useLocalforage (): LocalForage {
	return React.useContext(LocalforageContext);
}

interface Props {
	localforage: LocalForage;
}

export const LocalforageProvider: React.FC<React.PropsWithChildren<Props>> = ({ children, localforage }) => {
	const ref = React.useRef<LocalForage>(localforage);

	return <LocalforageContext.Provider value={ref.current}>{children}</LocalforageContext.Provider>
}