import * as React from 'react';
import { SvgContainer } from './SvgContainer';
export const DeleteFilled: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <SvgContainer {...props}>
    <use xlinkHref="#icon-delete-fill"></use>
  </SvgContainer>
)
