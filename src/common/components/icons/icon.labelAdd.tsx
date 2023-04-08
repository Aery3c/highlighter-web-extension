import * as React from 'react';
import { SvgContainer } from './SvgContainer';
export const LabelAddFilled: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <SvgContainer {...props}>
    <use xlinkHref="#icon-folder_labeled"></use>
  </SvgContainer>
)
