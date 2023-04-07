import * as React from 'react';
import { usePopper } from 'react-popper';
// import { useHighlighter } from '../../common/components/HighlighterProvider';
import styled from 'styled-components';
import PopperInnerWithHighlighter from './components/PopperInnerWithHighlighter';
// import PopperInnerWidthRemove from './components/PopperInnerWidthRemove';
import PopperUIGlobalStyle from './components/PopperUIGlobalStyle';
// import type Highlight from 'highlighter/lib/utils/highlight';

const { useState, useEffect } = React;

const PopperContainer = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  &[popper-show] {
    visibility: visible;
    pointer-events: auto;
  }
`;

const virtualReference = {
  getBoundingClientRect() {
    return DOMRect.fromRect({ y: 0, x: 0 });
  },
};

const PopperUI: React.FC = () => {
  // const highlighter = useHighlighter();
  // const [isDelete, setIsDelete] = useState(false);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes, update } = usePopper(
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
      update().then(state => state.elements.popper.setAttribute('popper-show', ''));
    } else {
      hidePopper();
    }

  }

  const hidePopper = () => {
    virtualReference.getBoundingClientRect = () => DOMRect.fromRect({ x: 0, y: -200 });
    update().then(state => state.elements.popper.removeAttribute('popper-show'));
  }

  // const handleMarkClick = (highlight: Highlight) => {
  //   setIsDelete(true);
  //   const range = highlight.characterRange.toRange();
  //   virtualReference.getBoundingClientRect = () => range.getBoundingClientRect();
  //   update().then((state) => {
  //     state.elements.popper.setAttribute('popper-show', '')
  //   });
  // }

  useEffect(() => {
    document.addEventListener('mouseup', handleDocumentMouseUp);
    // highlighter.on('click', handleMarkClick);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      // highlighter.off('click', handleMarkClick);
    }
  }, [update]);

  return (
    <>
      <PopperUIGlobalStyle />
      <PopperContainer ref={setPopperElement} style={{ ...styles.popper }} {...attributes.popper}>
        {/* @see https://react.dev/learn/preserving-and-resetting-state#option-1-rendering-a-component-in-different-positions */}
        <PopperInnerWithHighlighter clickAfterCallback={hidePopper} />
      </PopperContainer>
    </>
  )
}
export default PopperUI;
