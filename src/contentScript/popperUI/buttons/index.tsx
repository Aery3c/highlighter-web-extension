import * as React from 'react';
import { useTheme } from 'styled-components'
import { ButtonBase } from '../../../common/components/Button';
import styled from 'styled-components';
import ToolTip from 'rc-tooltip';
import { HighlightFilled } from '@ant-design/icons';
import 'rc-tooltip/assets/bootstrap.css';

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

// const Span = styled.span`
//   background-color: ${props => props.theme.colorBgSpotlight};
//   color: ${props => props.theme.colorText};
// `

export const HighlightButton: React.FC<React.PropsWithChildren> = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <ToolTip placement="top" overlay={<span>highlight</span>} trigger={['click']}>
      <Button>
        <HighlightFilled style={{ fontSize: 16 }} />
      </Button>
    </ToolTip>
  )
}
