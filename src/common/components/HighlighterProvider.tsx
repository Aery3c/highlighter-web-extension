import * as React from 'react';
import { useTheme } from 'styled-components';
import { createClassApplier } from '../helpers';
interface Props {
  highlighter: Highlighter
}
export const HighlighterContext = React.createContext<Highlighter>(null);

export const useHighlighter = () => {
  return React.useContext(HighlighterContext);
}
export const HighlighterProvider: React.FC<React.PropsWithChildren<Props>> = ({ children, highlighter}) => {
  /**
   * @see https://react.dev/reference/react/useRef#parameters
   */
  const ref = React.useRef(highlighter);

  const theme = useTheme();

  React.useEffect(() => {
    highlighter.addClassApplier(createClassApplier(theme.className));
  }, [theme]);

  return (
    <HighlighterContext.Provider value={ref.current}>
      {children}
    </HighlighterContext.Provider>
  )
}