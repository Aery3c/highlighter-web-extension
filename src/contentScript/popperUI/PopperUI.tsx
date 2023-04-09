import * as React from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import PopperInnerWithOperate from './components/PopperInnerWithOperate';
import PopperUIGlobalStyle from './components/PopperUIGlobalStyle';

interface Props {
  onMount?: () => void;
}

const { useState, useEffect } = React;

const PopperContainer = styled.div`
  position: absolute;
  z-index: 1001;
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

const PopperUI: React.FC<Props> = ({ onMount }) => {
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
      showPopper(sel.getRangeAt(0));
    } else {
      hidePopper();
    }

  }

  const showPopper = (range: Range) => {
    virtualReference.getBoundingClientRect = () => range.getBoundingClientRect();
    update().then(state => state.elements.popper.setAttribute('popper-show', ''));
  }

  const hidePopper = () => {
    virtualReference.getBoundingClientRect = () => DOMRect.fromRect({ x: 0, y: -200 });
    update().then(state => state.elements.popper.removeAttribute('popper-show'));
  }

  const handleDocumentMouseDown = () => {
    window.getSelection().removeAllRanges();
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mousedown', handleDocumentMouseDown);
    }
  }, [update]);

  return (
    <div ref={onMount}>
      <PopperUIGlobalStyle />
      <PopperContainer ref={setPopperElement} style={{ ...styles.popper }} {...attributes.popper}>
        <PopperInnerWithOperate hidePopper={hidePopper} showPopper={showPopper} />
      </PopperContainer>
    </div>
  )
}
export default PopperUI;
