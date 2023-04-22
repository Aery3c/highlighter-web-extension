import * as React from 'react';
import { useTheme } from 'styled-components';
import { findIndex } from 'lodash';
import { Button, ButtonGroup } from '../../../common/components/Button';
import { Tooltip } from '../../../common/components/Tooltip';
import { useTabId } from '../../../common/components/TabIdProvider';
import { useHighlighter } from '../../../common/components/HighlighterProvider';
import { useLocalforage } from '../../../common/components/LocalforageProvider';
import { HighlightFilled, GithubFilled, LabelAddFilled, DeleteFilled } from '../../../common/components/icons';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../../store/connect';
import * as rangy from 'rangy';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../../store/store';

const connector = connect((state: RootState) => ({ tabs: state.tabs }), mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  hidePopper: () => void;
  showPopper: (range: Range) => void;
}

function isSameCharRange (charRangeA: CharacterRange, charRangeB: CharacterRange): boolean {
  return (charRangeA.start == charRangeB.start) && (charRangeA.end == charRangeB.end);
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

const PopperInnerWithOperate: React.FC<Props> = ({ tabs, replaceHighlights, removeHighlight, hidePopper, showPopper }) => {
  const tabId = useTabId();
  const storeHighlights: RangyHighlight[] = tabs?.[tabId]?.highlights || [];
  const highlighter = useHighlighter();
  const localforage = useLocalforage();
  const theme = useTheme();
  const [isDelete, setIsDelete] = React.useState<boolean>(false);

  const handleClickHighlightElement = async (event: MouseEvent) => {
    const highlight: RangyHighlight | null = highlighter.getHighlightForElement(event.target as HTMLElement);
    if (highlight === null) return;

    setIsDelete(true);
    showPopper(highlight.getRange().nativeRange);

    await awaitUserClickDelete();
    highlighter.removeHighlights([highlight]);
    removeHighlight({ tabId, highlightId: highlight.id });

    localforage.removeItem(highlight.id.toString())

    hidePopper();
    setIsDelete(false);

  }

  React.useEffect(() => {
    const highlightEl = document.querySelectorAll('span[class^=highlighter]');
    highlightEl.forEach(el => {
      el.addEventListener('click', handleClickHighlightElement);
    });

    return () => {
      highlightEl.forEach(el => {
        el.removeEventListener('click', handleClickHighlightElement);
      });
    }
  });

  const handleClickHighlighter = async () => {
    try {
      const [range] = rangy.getSelection().getAllRanges();
      const characterRange = highlighter.converter.rangeToCharacterRange(range, document.body);

      if (findIndex(storeHighlights, item => isSameCharRange(item.characterRange, characterRange)) == -1) {
        highlighter.highlightSelection(theme.className, { exclusive: true });
        replaceHighlights({ tabId, highlights: [...highlighter.highlights] });

        const serializedHighlights = highlighter.serialize().split('|');
        await localforage.clear();
        for (let i = 1, serializedHighlight; (serializedHighlight = serializedHighlights[i++]);) {
          localforage.setItem<string>(serializedHighlight.split('$')[2], serializedHighlight);
        }
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