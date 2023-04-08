import * as React from 'react';
import { SvgContainer } from './SvgContainer';
export const GithubFilled: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = (props) => (
  <SvgContainer {...props}>
    <use xlinkHref="#icon-github"></use>
  </SvgContainer>
)
