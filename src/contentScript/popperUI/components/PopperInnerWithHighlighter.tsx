import * as React from 'react';
import styled from 'styled-components';
import { CharacterRange } from 'highlighter';
import { ButtonBase } from '../../../common/components/Button';
import { Tooltip } from '../../../common/components/Tooltip';
import { useTabId } from '../../../common/components/TabIdProvider';
import { HighlightFilled } from '../../../common/components/icons';
import { GithubFilled, TagFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../../store/connect';
import type { ConnectedProps } from 'react-redux';

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
  &:hover {
    color: ${props => props.theme.colorPrimaryTextHover};
    border-color: ${props => props.theme.colorPrimaryBorderHover};
  }
`

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PopperInnerWithHighlighter: React.FC<PropsFromRedux> = ({ addMark }) => {
  const tabId = useTabId();
  const handleClickWidthHighlighter = () => {
    try {
      const range = window.getSelection().getRangeAt(0);
      const characterRange = CharacterRange.fromRange(range, document.body);
      const mark = { start: characterRange.start, end: characterRange.end };
      addMark({ tabId, mark });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ButtonGroup>
      <>
        <Button data-tooltip-id="highlighter-tooltip" onClick={handleClickWidthHighlighter}>
          <HighlightFilled style={{ fontSize: 16 }} />
        </Button>
        <Tooltip id="highlighter-tooltip">
          Highlight the current selection!
        </Tooltip>
      </>
      <Button>
        <TagFilled style={{ fontSize: 16 }} />
      </Button>
      <Button>
        <GithubFilled style={{ fontSize: 16 }} />
      </Button>
    </ButtonGroup>
  )
}

export default connector(PopperInnerWithHighlighter);