import * as React from 'react';
import { Highlighter } from 'highlighter';
import { useTheme } from 'styled-components';
export const HighlighterContext = React.createContext<Highlighter | null>(null);

export const useHighlighter = () => {
  return React.useContext(HighlighterContext);
}
export const HighlighterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const theme = useTheme();
  /**
   * @see https://react.dev/reference/react/useRef#parameters
   */
  const ref = React.useRef(new Highlighter({ className: theme.className }));

  React.useEffect(() => {
    ref.current.setOptions({ ...ref.current.options, className: theme.className });
  }, [theme]);

  return (
    <HighlighterContext.Provider value={ref.current}>
      {children}
    </HighlighterContext.Provider>
  )
}