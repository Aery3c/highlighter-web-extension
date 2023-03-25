// @flow

import * as React from 'react';
import PopperElement from './PopperElement';

type Props = {
  callback?: () => void;
}
function PopperUI ({ callback }: Props): React.Node {
  return (
    <div ref={callback}>
      <PopperElement />
    </div>
  )
}
export default PopperUI;