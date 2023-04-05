import * as React from 'react';
import { Highlighter } from 'highlighter';

export const HighlighterContext = React.createContext<Highlighter | null>(null);

export const useHighlighter = () => {
  return React.useContext(HighlighterContext);
}
export const HighlighterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  if (process.env.NODE_ENV === 'development') {
    console.warn('[HighlighterProvider]: re-renders!');
  }
  /**
   * @see https://react.dev/reference/react/useRef#parameters
   */
  const ref = React.useRef(new Highlighter());

  return (
    <HighlighterContext.Provider value={ref.current}>
      {children}
    </HighlighterContext.Provider>
  )
}