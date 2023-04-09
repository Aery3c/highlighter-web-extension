import * as React from 'react';
import { useTheme } from 'styled-components';
import { CharacterRange } from 'highlighter';
import { findIndex } from 'lodash';
import { Button, ButtonGroup } from '../../../common/components/Button';
import { Tooltip } from '../../../common/components/Tooltip';
import { useTabId } from '../../../common/components/TabIdProvider';
import { useHighlighter } from '../../../common/components/HighlighterProvider';
import { useLocalforage } from '../../../common/components/LocalforageProvider';
import { HighlightFilled, GithubFilled, LabelAddFilled, DeleteFilled } from '../../../common/components/icons';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../../store/connect';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { Mark } from '../../../store/reducers/tabs';
import type Highlight from 'highlighter/lib/utils/highlight';

const connector = connect((state: RootState) => ({ tabs: state.tabs }), mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  hidePopper: () => void;
  showPopper: (range: Range) => void;
}

function isEqual (oldMark: Mark, characterRange: CharacterRange): boolean {
  return !!characterRange.isEqual(new CharacterRange(oldMark.start, oldMark.end, document.body));
}

let promise;
async function awaitUserClickDelete () {
  return new Promise(resolve => {
    promise = { resolve };
  });
}

const OutsideAlerter: React.FC<React.PropsWithChildren<{ outsideClick: () => void }>> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        props.outsideClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return <div ref={ref}>{props.children}</div>;
}

const PopperInnerWithOperate: React.FC<Props> = ({ tabs, addMark, removeMark, hidePopper, showPopper }) => {
  const tabId = useTabId();
  const marks: Mark[] = tabs?.[tabId]?.marks || [];
  const highlighter = useHighlighter();
  const localforage = useLocalforage();
  const theme = useTheme();
  const [isDelete, setIsDelete] = React.useState<boolean>(false);

  const handleClickMarkElement = async (highlight: Highlight) => {
    if (highlight === null) return;
    setIsDelete(true);
    const { characterRange } = highlight;
    showPopper(characterRange.toRange());

    await awaitUserClickDelete();
    removeMark({ tabId, markId: highlight.highlightId });
    const len = await localforage.length();
    const keys = await localforage.keys();
    const key = highlight.highlightId.toString();

    if (len > 1) {
      if (keys.indexOf(key) !== -1) {
        await localforage.removeItem(highlight.highlightId.toString())
      }
    } else {
      await localforage.clear();
    }
    highlighter.removeHighlight(highlight);
    hidePopper();
    setIsDelete(false);

  }

  React.useEffect(() => {
    highlighter.on('click', handleClickMarkElement);

    return () => {
      highlighter.off('click', handleClickMarkElement);
    }
  }, [highlighter, showPopper, hidePopper, removeMark, tabId, theme]);

  const handleClickHighlighter = () => {
    try {
      const sel = window.getSelection(), range = sel.getRangeAt(0);

      const characterRange = CharacterRange.fromRange(range, document.body);
      if (findIndex( marks,m => isEqual(m, characterRange) && (m.className === theme.className) ) === -1 ) {
        /**
         * Add the union if it does not exist
         */
        const [highlight] = highlighter.useSelection({ selection: sel });
        const mark = {
          start: characterRange.start,
          end: characterRange.end,
          className: theme.className,
          text: highlight.getText(),
          markId: highlight.highlightId
        }
        addMark({ tabId, mark });
        localforage.setItem<Mark>(mark.markId.toString(), mark);
      }
      hidePopper();
    } catch (error) {
      console.log(error);
      hidePopper();
    }
  }

  const handleClickDelete = () => {
    promise.resolve();
  }

  /**
   * Prevents events from bubbling to document.onMouseup
   * @param event
   */
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.nativeEvent.stopPropagation();
  }

  return (
    <ButtonGroup onMouseUp={stopPropagation} onMouseDown={stopPropagation}>
      {
        !isDelete
          ?
            // general
            <React.Fragment>
              <>
                <Button data-tooltip-id="highlighter-tooltip" onClick={handleClickHighlighter}>
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
            </React.Fragment>
          :
            // delete
            <OutsideAlerter outsideClick={() => {
              hidePopper();
              setIsDelete(false);
            }}>
              <Button data-tooltip-id="remove-highlighter-tooltip" onClick={handleClickDelete}>
                <DeleteFilled style={{ fontSize: 18 }} />
              </Button>
              <Tooltip id="remove-highlighter-tooltip">
                Remove the highlight!
              </Tooltip>
            </OutsideAlerter>
      }
    </ButtonGroup>
  )
}

export default connector(PopperInnerWithOperate);