import * as React from 'react';
import { Highlighter } from 'highlighter';
import { useTheme } from 'styled-components';

interface Props {
  highlighter: Highlighter
}
export const HighlighterContext = React.createContext<Highlighter>(null);

export const useHighlighter = () => {
  return React.useContext(HighlighterContext);
}
export const HighlighterProvider: React.FC<React.PropsWithChildren<Props>> = ({ children, highlighter}) => {

  const theme = useTheme();
  /**
   * @see https://react.dev/reference/react/useRef#parameters
   */
  const ref = React.useRef(highlighter);

  React.useEffect(() => {
    ref.current.setOptions({ ...ref.current.options, className: theme.className });
  }, [theme]);

  return (
    <HighlighterContext.Provider value={ref.current}>
      {children}
    </HighlighterContext.Provider>
  )
}