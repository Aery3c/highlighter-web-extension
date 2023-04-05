import * as React from 'react';
import { connect } from 'react-redux';
import { usePopper } from 'react-popper';
import { ButtonBase } from '../../common/components/Button';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../common/theme';
import { GithubFilled, TagFilled } from '@ant-design/icons';
import { HighlightButton } from './components/Buttons';
import type { RootState } from '../../store/store';
import type { ConnectedProps } from 'react-redux';

const { useState, useEffect } = React;

const PopperContainer = styled.div`
  position: absolute;
`;
const ButtonGroup = styled.div`
  display: inline-flex;
  button {
    :not(:last-child) {
      margin-inline-end: -1px;
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }
    :not(:first-child) {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }
  }
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: -1;
  &[data-popper-placement^='top'] {
    bottom: -4px;
  }

  &[data-popper-placement^='bottom'] {
    top: -4px;
  }
  
  &::after {
    box-sizing: border-box;
    position: inherit;
    display: inline-block;
    visibility: visible;
    content: '';
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.colorBgContainer};
    border: 1px solid ${props => props.theme.colorBorder};
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    transform: rotate(45deg);
  }
`;

const Button = styled(ButtonBase)`
  width: 32px;
  padding-inline-start: 0;
  padding-inline-end: 0;
  font-size: 14px;
  height: 32px;
  background-color: ${props => props.theme.colorBgContainer};
  border-color: ${props => props.theme.colorBorder};
  color: ${props => props.theme.colorText};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
`

const mapState = (state: RootState) => ({
  themeType: state.config.themeType,
  primaryColor: state.config.primaryColor
});
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

const virtualReference = {
  getBoundingClientRect() {
    return DOMRect.fromRect({ y: -200, x: 0 });
  },
};

const PopperUI: React.FC<PropsFromRedux> = ({ themeType, primaryColor }) => {

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
    } else {
      virtualReference.getBoundingClientRect = () => DOMRect.fromRect({ x: 0, y: -200 });
    }
    update();
  }

  const handleDocumentMouseDown = () => {
    window.getSelection().removeAllRanges();
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mousedown', handleDocumentMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.addEventListener('mousedown', handleDocumentMouseDown);
    }
  }, [update, popperState]);


  return (
    <ThemeProvider theme={theme?.[themeType]?.[primaryColor]}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <PopperContainer ref={setPopperElement} style={{ ...styles.popper }} {...attributes.popper}>
        <ButtonGroup>
          <HighlightButton />
          <Button>
            <TagFilled style={{ fontSize: 16 }} />
          </Button>
          <Button>
            <GithubFilled style={{ fontSize: 16 }} />
          </Button>
        </ButtonGroup>
        <Arrow data-popper-arrow style={styles.arrow} {...attributes.popper}/>
      </PopperContainer>
    </ThemeProvider>
  )
}
export default connector(PopperUI);
