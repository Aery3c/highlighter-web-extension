import * as React from 'react';
export const HighlighterContext = React.createContext(null);
const HighlighterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  if (process.env.NODE_ENV === 'development') {
    console.warn('[HighlighterProvider]: re-renders!');
  }

  const ref = React.useRef();

  return (
    <HighlighterContext.Provider value={ref.current}>
      {children}
    </HighlighterContext.Provider>
  )
}