import * as React from 'react';
import { SvgContainer } from './SvgContainer';
export const HighlightFilled: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <SvgContainer {...props}>
    <use xlinkHref="#icon-highlighter"></use>
  </SvgContainer>
)
