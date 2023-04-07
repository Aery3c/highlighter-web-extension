import * as React from 'react';
import { useTheme } from 'styled-components';
import { CharacterRange } from 'highlighter';
import { findIndex } from 'lodash';
import { Button, ButtonGroup } from '../../../common/components/Button';
import { Tooltip } from '../../../common/components/Tooltip';
import { useTabId } from '../../../common/components/TabIdProvider';
import { useHighlighter } from '../../../common/components/HighlighterProvider';
import { HighlightFilled, GithubFilled, LabelAddFilled } from '../../../common/components/icons';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../../store/connect';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { Mark } from '../../../store/reducers/tabs';

const connector = connect((state: RootState) => ({ tabs: state.tabs }), mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  clickAfterCallback?: () => void
}

function isEqual (oldMark: Mark, characterRange: CharacterRange): boolean {
  return !!characterRange.isEqual(new CharacterRange(oldMark.start, oldMark.end, document.body));
}

const PopperInnerWithHighlighter: React.FC<Props> = ({ tabs, addMark, clickAfterCallback }) => {
  const tabId = useTabId();
  const marks: Mark[] = tabs?.[tabId]?.marks || [];
  const highlighter = useHighlighter();
  const theme = useTheme();
  const handleClickWidthHighlighter = () => {
    try {
      const range = window.getSelection().getRangeAt(0);
      const characterRange = CharacterRange.fromRange(range, document.body);
      const mark = { start: characterRange.start, end: characterRange.end, className: theme.className };
      if (findIndex( marks,m => isEqual(m, characterRange) && m.className === mark.className ) === -1 ) {
        /**
         * Add the union if it does not exist
         */
        addMark({ tabId, mark });
        highlighter._useCharacterRanges([characterRange]);
      }
      clickAfterCallback?.();
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
      <Button onClick={() => console.log('click LabelAddFilled!')}>
        <LabelAddFilled style={{ fontSize: 18 }} />
      </Button>
      <Button>
        <GithubFilled style={{ fontSize: 18 }} />
      </Button>
    </ButtonGroup>
  )
}

export default connector(PopperInnerWithHighlighter);