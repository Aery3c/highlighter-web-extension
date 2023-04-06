import * as React from 'react';
import { connect } from 'react-redux';
import { usePopper } from 'react-popper';
import { HighlighterProvider } from '../../common/components/HighlighterProvider';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../common/theme';
import PopperInnerWithHighlighter from './components/PopperInnerWithHighlighter';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../store/store';
import { createGlobalStyle } from 'styled-components';

const { useState, useEffect } = React;

const PopperContainer = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  &[data-show] {
    visibility: visible;
    pointer-events: auto;
  }
`;

const GlobalStyle = createGlobalStyle`
  .${theme.light.orange.className} {
    background-color: ${theme.light.orange.colorPrimary};
    color: ${theme.light.orange.colorPrimaryText};
  }
`;

const connector = connect((state: RootState) => ({ config: state.config }));

type PropsFromRedux = ConnectedProps<typeof connector>;

const virtualReference = {
  getBoundingClientRect() {
    return DOMRect.fromRect({ y: 0, x: 0 });
  },
};

const PopperUI: React.FC<PropsFromRedux> = ({ config }) => {
  const { themeType, primaryColor } = config;

  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes, update, state: popperState } = usePopper(
    virtualReference,
    popperElement,
    {
      placement: 'top',
      modifiers: [
        { name: 'eventListeners', options: { scroll: false } },
        { name: 'offset', options: { offset: [0, 8] } },
      ]
    }
  );

  const handleDocumentMouseUp = () => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString() !== '' && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      virtualReference.getBoundingClientRect = () => range.getBoundingClientRect();
      update().then(state => state.elements.popper.setAttribute('data-show', ''))
    } else {
      // virtualReference.getBoundingClientRect = () => DOMRect.fromRect({ x: 0, y: -200 });
      hidePopper();
    }

  }

  const hidePopper = () => {
    popperState.elements.popper.removeAttribute('data-show');
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    }
  }, [update, popperState]);

  return (
    <ThemeProvider theme={theme?.[themeType]?.[primaryColor]}>
      <GlobalStyle />
      <HighlighterProvider>
        <PopperContainer ref={setPopperElement} style={{ ...styles.popper }} {...attributes.popper}>
          <PopperInnerWithHighlighter clickAfterCallback={hidePopper}/>
        </PopperContainer>
      </HighlighterProvider>
    </ThemeProvider>
  )
}
export default connector(PopperUI);
